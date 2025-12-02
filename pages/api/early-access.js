// pages/api/early-access.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB; // ta variable d'env déjà mise sur Vercel
let client;
let clientPromise;

// Petit cache global pour éviter de recréer un client à chaque requête
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { email, useCase, volume } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email obligatoire" });
    }

    const client = await clientPromise;
    const db = client.db("carhunter");      // nom de ta database
    const leads = db.collection("leads");   // collection (table)

    await leads.insertOne({
      email,
      useCase: useCase || null,
      volume: volume || null,
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur API early-access:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
