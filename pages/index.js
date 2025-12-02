import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [usage, setUsage] = useState("");
  const [volume, setVolume] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, usage, volume }),
      });

      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setUsage("");
        setVolume("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="page">
      <main className="card">
        <div className="header-row">
          <div className="logo">
            <div className="logo-badge">CH</div>
            <div>
              <div>CarHunter</div>
              <div style={{ fontSize: 11, color: "#b3b3b3" }}>
                SaaS de prospection auto par SMS
              </div>
            </div>
          </div>
          <div className="badge">Nouveau · Automatisation IA</div>
        </div>

        <div className="main">
          {/* Colonne gauche */}
          <section>
            <h1>
              Tu ne cherches plus les voitures,
              <br />
              <span className="highlight">tu les chasses.</span>
            </h1>
            <p>
              CarHunter repère pour toi les meilleures annonces de voitures et
              contacte automatiquement les vendeurs par SMS. Tu reçois seulement
              les bons plans dans ton tableau de bord.
            </p>

            <button className="primary-btn" onClick={handleSubmit}>
              Demander un accès anticipé
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                const el = document.getElementById("how");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Voir comment ça marche →
            </button>

            <ul className="list">
              <li>• Scan auto des annonces (24h/24)</li>
              <li>• SMS pré-écrits qui donnent envie de répondre</li>
              <li>• Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </section>

          {/* Colonne droite */}
          <aside className="right-card">
            <h3>Simulation CarHunter</h3>
            <p style={{ marginBottom: 10 }}>
              <strong>32 vendeurs contactés</strong>
              <br />
              aujourd&apos;hui
            </p>
            <p>
              Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux.
            </p>
            <p style={{ marginTop: 10 }}>
              Taux de réponse : <strong>54%</strong>
              <br />
              Deals trouvés : <strong>5</strong>
              <br />
              Gain moyen / deal : <strong>+ 650 €</strong>
              <br />
              Temps gagné : <strong>&gt; 4 h / jour</strong>
            </p>
          </aside>
        </div>

        {/* Formulaire */}
        <section className="form-section" id="how">
          <h3 style={{ fontSize: 14, marginBottom: 6 }}>Demander un accès anticipé</h3>
          <p>
            Laisse ton email et comment tu veux utiliser CarHunter. Tu seras
            prioritaire quand la bêta sera ouverte.
          </p>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="tonemail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Comment tu veux utiliser CarHunter ?</label>
              <input
                type="text"
                placeholder="Achat-revente, garage, mandataire..."
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
              />
            </div>

            <div>
              <label>Volume (ex : voitures / mois)</label>
              <input
                type="text"
                placeholder="Ex : 5 voitures / mois"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <button type="submit" className="primary-btn">
                Je veux être sur la liste
              </button>
              {status === "loading" && (
                <div className="status">Envoi en cours...</div>
              )}
              {status === "ok" && (
                <div className="status ok">
                  Merci ! Tu es sur la liste d&apos;attente CarHunter.
                </div>
              )}
              {status === "error" && (
                <div className="status error">
                  Oups, une erreur s&apos;est produite. Réessaie dans un instant.
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
