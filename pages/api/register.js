import { MongoClient } from "mongodb";

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB; // ta variable d'environnement sur Vercel
  if (!uri) {
    throw new Error("MONGODB env var not set");
  }

  const client = await MongoClient.connect(uri);
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { email, usage, volume } = req.body || {};

  if (!email || !usage) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(); // la DB indiquée dans ton URI (carhunter)
    const collection = db.collection("leads");

    await collection.insertOne({
      email,
      usage,
      volume: volume || null,
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Mongo error", err);
    return res.status(500).json({ ok: false, error: "Database error" });
  }
}
