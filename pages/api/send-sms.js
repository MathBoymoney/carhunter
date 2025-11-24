import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: to,
    });

    return res.status(200).json({ success: true, id: sms.sid });

  } catch (error) {
    console.error("SMS ERROR:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
