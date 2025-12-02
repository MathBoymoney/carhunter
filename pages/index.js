import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Test CarHunter : premier SMS automatique !");
  const [status, setStatus] = useState(null); // {type: "ok" | "error", text: string}
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: phone, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "ok", text: "SMS envoyé (ou accepté par Twilio) ✅" });
      } else {
        setStatus({ type: "error", text: data.error || "Erreur côté serveur" });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Impossible d'appeler l'API." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <div className="card">
        <div className="badge-row">
          <div className="logo">
            <div className="logo-circle">CH</div>
            <div>
              <div className="logo-text">CarHunter</div>
              <div className="logo-sub">SaaS de prospection auto par SMS</div>
            </div>
          </div>
          <div className="badge">Nouveau · Automatisation IA</div>
        </div>

        <h1 className="title">
          Tu ne cherches plus les voitures,
          <br />
          <span className="red">tu les chasses.</span>
        </h1>

        <p className="subtitle">
          CarHunter repère pour toi les meilleures annonces de voitures et
          contacte automatiquement les vendeurs par SMS. Tu reçois seulement
          les bons plans dans ton tableau de bord.
        </p>

        <div className="main-row">
          <div className="left">
            <button className="btn-primary">
              Demander un accès anticipé
            </button>
            <button className="btn-secondary">
              Voir comment ça marche →
            </button>

            <ul className="bullets">
              <li>Scan auto des annonces (24h/24)</li>
              <li>SMS pré-écrits qui donnent envie de répondre</li>
              <li>Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </div>

          <div className="right">
            <div className="right-card">
              <div className="right-title">SIMULATION CARHUNTER</div>
              <div className="right-sub">
                32 vendeurs contactés aujourd&apos;hui
                <br />
                Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux
              </div>

              <div className="stat-row">
                <span className="stat-label">Taux de réponse</span>
                <span className="stat-value">54%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Deals trouvés</span>
                <span className="stat-value">5</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Gain moyen / deal</span>
                <span className="stat-value">&gt; 650 €</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Temps gagné</span>
                <span className="stat-value">&gt; 4 h / jour</span>
              </div>

              <div className="form-block">
                <div className="form-title">Tester l&apos;envoi de SMS (debug)</div>
                <form onSubmit={handleSend}>
                  <div className="form-row">
                    <input
                      className="input"
                      placeholder="+33 ton numéro vérifié Twilio"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <input
                      className="input"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button className="btn-primary" type="submit" disabled={loading}>
                    {loading ? "Envoi..." : "Envoyer un SMS de test"}
                  </button>
                </form>
                <p className="form-help">
                  ⚠️ En mode compte d&apos;essai Twilio, tu ne peux envoyer des SMS
                  qu&apos;à des numéros vérifiés.
                </p>

                {status && (
                  <div className={`status ${status.type === "ok" ? "ok" : "error"}`}>
                    {status.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="footer-note">
          Interface en cours de développement. Cette page est une pré-version de la
          future app CarHunter.
        </p>
      </div>
    </main>
  );
}
