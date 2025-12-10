// pages/api/waitlist.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Méthode non autorisée" });
  }

  const { email, usage, volume } = req.body;

  if (!email || !email.includes("@")) {
    return res
      .status(400)
      .json({ ok: false, message: "Email invalide ou manquant" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("carhunter"); // nom de ta DB
    const collection = db.collection("leads"); // nom de la collection

    await collection.insertOne({
      email,
      usage: usage || "",
      volume: volume || "",
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur MongoDB", err);
    return res
      .status(500)
      .json({ ok: false, message: "Erreur serveur, réessaie plus tard." });
  }
}
