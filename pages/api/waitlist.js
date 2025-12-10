// pages/api/waitlist.js
import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(process.env.MONGODB);
  const db = client.db("carhunter"); // nom de ta base

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Méthode non autorisée" });
  }

  const { email, usage, volume } = req.body;

  if (!email) {
    return res.status(400).json({ ok: false, error: "Email requis" });
  }

  try {
    const { db } = await connectToDatabase();

    await db.collection("leads").insertOne({
      email,
      usage: usage || "",
      volume: volume || "",
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur waitlist:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Erreur serveur lors de l'enregistrement" });
  }
}
