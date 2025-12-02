import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [usage, setUsage] = useState("");
  const [volume, setVolume] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, usage, volume }),
      });

      if (!res.ok) {
        throw new Error("Erreur serveur");
      }

      setMessage("Merci ! Tu es sur la liste d'attente CarHunter 🚗");
      setEmail("");
      setUsage("");
      setVolume("");
    } catch (err) {
      console.error(err);
      setError("Impossible d'enregistrer pour le moment. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="card-header">
          <div className="logo-circle">CH</div>
          <div>
            <div className="logo-text-main">CarHunter</div>
            <div className="logo-text-sub">SaaS de prospection auto par SMS</div>
          </div>
        </div>

        <div className="badges">
          <span className="badge">Nouveau · Automatisation IA</span>
          <span className="badge badge-danger">Accès bêta limité</span>
        </div>

        <div className="grid">
          {/* Colonne gauche */}
          <div>
            <h1 className="title">
              Tu ne cherches plus les voitures,
              <br />
              <span className="red">tu les chasses.</span>
            </h1>
            <p className="subtitle">
              CarHunter repère pour toi les meilleures annonces de voitures et contacte
              automatiquement les vendeurs par SMS. Tu reçois seulement les bons plans
              dans ton tableau de bord.
            </p>

            <button className="primary-btn" onClick={() => {
              const form = document.getElementById("beta-form");
              if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              Demander un accès anticipé
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                const form = document.getElementById("beta-form");
                if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Voir comment ça marche →
            </button>

            <ul className="list">
              <li>Scan auto des annonces (24h/24)</li>
              <li>SMS pré-écrits qui donnent envie de répondre</li>
              <li>Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </div>

          {/* Colonne droite */}
          <div className="right-card" id="beta-form">
            <div className="right-title">Simulation CarHunter</div>
            <div className="right-sub">
              Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux.
            </div>

            <div className="stats">
              <div>
                <div className="stat-label">Vendeurs contactés / jour</div>
                <div className="stat-value">32</div>
              </div>
              <div>
                <div className="stat-label">Taux de réponse moyen</div>
                <div className="stat-value">54%</div>
              </div>
              <div>
                <div className="stat-label">Deals trouvés / semaine</div>
                <div className="stat-value">5</div>
              </div>
              <div>
                <div className="stat-label">Temps gagné</div>
                <div className="stat-value">&gt; 4 h / jour</div>
              </div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <label className="form-label">
                Email
                <input
                  className="form-input"
                  type="email"
                  required
                  placeholder="tonemail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="form-label">
                Comment tu veux utiliser CarHunter ?
                <textarea
                  className="form-textarea"
                  required
                  placeholder="Achat-revente, garage, mandataire, perso..."
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                />
              </label>

              <label className="form-label">
                Volume (ex : voitures / mois)
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ex : 5 voitures / mois"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </label>

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Enregistrement..." : "Je veux être sur la liste"}
              </button>

              <p className="form-note">
                Tu seras prioritaire pour tester CarHunter en avant-première.
              </p>

              {message && <p className="success-msg">{message}</p>}
              {error && <p className="error-msg">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
