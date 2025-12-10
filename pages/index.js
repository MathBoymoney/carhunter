import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [usage, setUsage] = useState("");
  const [volume, setVolume] = useState("");
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Merci d’indiquer au moins ton email.");
      return;
    }

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, usage, volume }),
      });

      if (!res.ok) {
        throw new Error("Erreur serveur");
      }

      setStatus("ok");
      setMessage("Inscription enregistrée. Tu seras prévenu dès que CarHunter ouvre la bêta.");
      setEmail("");
      setUsage("");
      setVolume("");
    } catch (err) {
      setStatus("error");
      setMessage("Impossible d’enregistrer maintenant. Réessaie dans quelques minutes.");
    }
  }

  function scrollToHow() {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="page">
      <main className="card">
        {/* HEADER */}
        <div className="header-row">
          <div className="logo-circle">CH</div>
          <div className="badge-text">
            <div className="badge-title">CarHunter</div>
            <div className="badge-sub">SaaS de prospection auto par SMS</div>
          </div>
        </div>

        <div className="chip-row">
          <span className="chip">NOUVEAU</span>
          <span className="chip">AUTOMATISATION IA</span>
        </div>

        {/* TITRE */}
        <h1 className="title-main">
          Tu ne cherches plus les voitures, <span className="yellow">tu les chasses.</span>
        </h1>
        <p className="description-main">
          CarHunter repère pour toi les meilleures annonces de voitures et contacte automatiquement les vendeurs par SMS.
          Tu reçois seulement les bons plans dans ton tableau de bord.
        </p>

        {/* LAYOUT PRINCIPAL */}
        <div className="layout">
          {/* COLONNE GAUCHE */}
          <div className="left-col">
            <button className="btn-primary" onClick={() => {
              const el = document.getElementById("early-access");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              Demander un accès anticipé
            </button>

            <button className="btn-secondary" type="button" onClick={scrollToHow}>
              Voir comment ça marche <span className="arrow">↘</span>
            </button>

            <ul className="bullet-list">
              <li>
                <span className="bullet-dot" />
                <span>Scan auto des annonces (24h/24)</span>
              </li>
              <li>
                <span className="bullet-dot" />
                <span>SMS pré-écrits qui donnent envie de répondre</span>
              </li>
              <li>
                <span className="bullet-dot" />
                <span>Parfait pour achat-revente, garages, mandataires</span>
              </li>
            </ul>
          </div>

          {/* COLONNE DROITE */}
          <aside className="right-col">
            <div className="simulation-title">Simulation CarHunter</div>
            <div className="simulation-box">
              <div className="sim-row">
                <span className="sim-label">Vendeurs contactés aujourd’hui</span>
                <span className="sim-value">32</span>
              </div>
              <div className="sim-row">
                <span className="sim-label">Exemple</span>
                <span className="sim-value">Peugeot 208 &lt; 7 000 €</span>
              </div>
              <div className="sim-divider" />
              <div className="sim-row">
                <span className="sim-label">Taux de réponse</span>
                <span className="sim-value">54 %</span>
              </div>
              <div className="sim-row">
                <span className="sim-label">Deals trouvés</span>
                <span className="sim-value">5</span>
              </div>
              <div className="sim-row">
                <span className="sim-label">Gain moyen / deal</span>
                <span className="sim-value">&gt; 650 €</span>
              </div>
              <div className="sim-row">
                <span className="sim-label">Temps gagné</span>
                <span className="sim-value">&gt; 4 h / jour</span>
              </div>
            </div>

            <p className="bottom-note">
              Interface en cours de développement. Cette page est une préversion de la version bêta de CarHunter.
            </p>
          </aside>
        </div>

        {/* SECTION COMMENT ÇA MARCHE */}
        <section id="how-it-works" className="form-section">
          <h2 style={{ fontWeight: 600, marginBottom: 4 }}>Comment ça marche ?</h2>
          <p>
            1️⃣ Tu définis le type de voiture que tu cherches. <br />
            2️⃣ CarHunter scanne les annonces et repère les bonnes opportunités. <br />
            3️⃣ Des SMS sont envoyés automatiquement aux vendeurs. <br />
            4️⃣ Tu reçois les réponses et les meilleurs deals directement dans ton espace.
          </p>
        </section>

        {/* SECTION FORMULAIRE */}
        <section id="early-access" className="form-section" style={{ marginTop: 20 }}>
          <h2 style={{ fontWeight: 600, marginBottom: 4 }}>Demander un accès anticipé</h2>
          <p>
            Laisse ton email et comment tu veux utiliser CarHunter. Tu seras prioritaire quand la bêta sera ouverte.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="tonemail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Comment tu veux utiliser CarHunter ?</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Achat-revente, garage, mandataire…"
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Volume (ex : voitures / mois)</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ex : 5 voitures / mois"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn-primary" style={{ boxShadow: "0 12px 30px rgba(250, 204, 21, 0.35)" }}>
                Je veux être sur la liste
              </button>
              <span className="form-helper">
                Aucun spam. Tu recevras seulement un mail quand la bêta sera prête.
              </span>
            </div>

            {status && (
              <div className={`status-message ${status === "ok" ? "status-ok" : "status-error"}`}>
                {message}
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
