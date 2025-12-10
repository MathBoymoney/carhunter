import { MongoClient } from "mongodb";

const uri = process.env.MONGODB;
if (!uri) {
  throw new Error("La variable d’environnement MONGODB n’est pas définie.");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Méthode non autorisée" });
  }

  const { email, usage, volume } = req.body || {};

  if (!email) {
    return res.status(400).json({ ok: false, error: "Email requis" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("carhunter");
    const collection = db.collection("leads");

    await collection.insertOne({
      email,
      usage: usage || null,
      volume: volume || null,
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur MongoDB", err);
    return res.status(500).json({ ok: false, error: "Erreur serveur" });
  }
}
