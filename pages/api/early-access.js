import { MongoClient } from "mongodb";

const uri = process.env.MONGODB;

if (!uri) {
  throw new Error("MONGODB environment variable is not set");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {});
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, usage, volume } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email requis" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("carhunter");
    const collection = db.collection("leads");

    await collection.insertOne({
      email,
      usage: usage || "",
      volume: volume || "",
      createdAt: new Date(),
    });

    return res.status(200).json({ message: "ok" });
  } catch (err) {
    console.error("Mongo error:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
