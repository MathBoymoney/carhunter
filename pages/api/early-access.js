import { MongoClient } from "mongodb";

const uri = process.env.MONGODB;

if (!uri) {
  throw new Error("MONGODB env variable not set");
}

// on garde un client global pour ne pas recréer la connexion à chaque requête
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email invalide" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("carhunter");        // nom de la base (carhunter)
    const collection = db.collection("leads"); // collection leads (carhunter.leads)

    await collection.insertOne({
      email,
      createdAt: new Date()
    });

    return res.status(200).json({ message: "OK" });
  } catch (err) {
    console.error("Erreur MongoDB", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
