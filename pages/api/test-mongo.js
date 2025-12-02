import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("carhunter");
    const leads = await db.collection("leads").find({}).toArray();

    res.status(200).json({
      ok: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}
