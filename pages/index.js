export default function Home() {
  return (
    <main className="main">
      <div className="card">
        <div className="logo">
          <div className="logo-icon">CH</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>CarHunter</div>
            <div style={{ fontSize: "0.8rem", color: "#aaaaaa" }}>
              SaaS de prospection auto par SMS
            </div>
          </div>
        </div>

        <div className="badge">Nouveau • Automatisation IA</div>

        <h1 className="title">
          Tu ne cherches plus les voitures,<br />
          <span>tu les chasses.</span>
        </h1>

        <p className="subtitle">
          CarHunter repère pour toi les meilleures annonces de voitures et contacte
          automatiquement les vendeurs par SMS. Tu reçois seulement les bons plans
          dans ton tableau de bord.
        </p>

        <div className="layout">
          {/* Colonne gauche : CTA */}
          <div className="cta-group">
            <a href="#early-access" className="btn-primary">
              Demander un accès anticipé
            </a>
            <button className="btn-secondary">
              Voir comment ça marche →
            </button>

            <div className="benefits">
              <div className="benefit">
                <div className="dot" />
                <span>Scan auto des annonces (24h/24)</span>
              </div>
              <div className="benefit">
                <div className="dot" />
                <span>SMS pré-écrits qui donnent envie de répondre</span>
              </div>
              <div className="benefit">
                <div className="dot" />
                <span>Parfait pour achat-revente, garages, mandataires</span>
              </div>
            </div>
          </div>

          {/* Colonne droite : panneau "simulation" */}
          <div className="panel">
            <div className="panel-title">Simulation CarHunter</div>
            <div className="panel-main">
              32 vendeurs contactés aujourd&apos;hui
            </div>
            <div className="panel-tag">
              Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux
            </div>

            <div className="panel-stats">
              <div>
                <div className="stat-label">Taux de réponse</div>
                <div className="stat-value">54%</div>
              </div>
              <div>
                <div className="stat-label">Deals trouvés</div>
                <div className="stat-value">5</div>
              </div>
              <div>
                <div className="stat-label">Gain moyen / deal</div>
                <div className="stat-value">+ 650 €</div>
              </div>
              <div>
                <div className="stat-label">Temps gagné</div>
                <div className="stat-value">&gt; 4 h / jour</div>
              </div>
            </div>

            <div className="footer-note">
              Interface en cours de développement. Cette page est une preview de la
              version bêta de CarHunter.
            </div>
          </div>
        </div>

        <div id="early-access" style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
          Intéressé par tester CarHunter en avant-première ? <br />
          Ajoute simplement ton email dans ta bio ou envoie un message à ton
          futur site quand il sera live — tu pourras brancher ici un vrai
          formulaire plus tard.
        </div>
      </div>
    </main>
  );
}
