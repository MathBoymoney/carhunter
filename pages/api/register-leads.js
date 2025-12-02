import { MongoClient } from "mongodb";

const uri = process.env.MONGODB;

// Gestion du client MongoDB partagé (pattern standard sur Vercel)
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Méthode non autorisée" });
    return;
  }

  const { email, name, note } = req.body || {};

  if (!email) {
    res.status(400).json({ message: "Email obligatoire" });
    return;
  }

  try {
    const client = await clientPromise;

    // nom de ta base = "carhunter" (celle que tu as créée dans Mongo Atlas)
    const db = client.db("carhunter");
    const collection = db.collection("leads");

    await collection.insertOne({
      email,
      name: name || null,
      note: note || null,
      createdAt: new Date(),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur Mongo :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
