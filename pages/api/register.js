import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Méthode non autorisée" });

  const { email, usage, volume } = req.body;

  if (!email)
    return res.status(400).json({ error: "Email requis" });

  try {
    const client = await MongoClient.connect(process.env.MONGODB);
    const db = client.db("carhunter");

    await db.collection("leads").insertOne({
      email,
      usage,
      volume,
      date: new Date()
    });

    client.close();

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
