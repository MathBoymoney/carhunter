// pages/api/early-access.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB;

if (!uri) {
  throw new Error("La variable d'environnement MONGODB n'est pas définie.");
}

// Connexion réutilisée (évite de recréer un client à chaque requête)
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {});
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { email, usage, volume } = req.body;

  if (!email || !usage || !volume) {
    return res.status(400).json({ message: "Merci de remplir tous les champs." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("carhunter");        // nom de la base
    const collection = db.collection("leads"); // nom de la collection

    await collection.insertOne({
      email,
      usage,
      volume,
      createdAt: new Date(),
    });

    return res.status(200).json({ message: "OK" });
  } catch (err) {
    console.error("Erreur API early-access:", err);
    return res.status(500).json({ message: "Erreur serveur, réessaie plus tard." });
  }
}
