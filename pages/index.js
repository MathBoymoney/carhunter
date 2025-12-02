// pages/index.js

export default function Home() {
  return (
    <div className="page">
      <div className="hero-card">
        {/* Logo + titre */}
        <div className="header-row">
          <div className="logo-circle">CH</div>
          <div className="logo-text">
            <div className="logo-title">CarHunter</div>
            <div className="logo-subtitle">SaaS de prospection auto par SMS</div>
          </div>
        </div>

        <div className="badge-row">
          <span className="badge">NOUVEAU · AUTOMATISATION IA</span>
        </div>

        {/* Bloc gauche : texte principal */}
        <div className="content-row">
          <div className="left-column">
            <h1 className="hero-title">
              Tu ne cherches plus les voitures,
              <br />
              <span className="text-red">tu les chasses.</span>
            </h1>

            <p className="hero-subtitle">
              CarHunter repère pour toi les meilleures annonces de voitures et
              contacte automatiquement les vendeurs par SMS. Tu reçois seulement
              les bons plans dans ton tableau de bord.
            </p>

            <div className="cta-row">
              <a href="#early-access" className="btn btn-primary">
                Demander un accès anticipé
              </a>
              <a href="#how-it-works" className="btn btn-secondary">
                Voir comment ça marche →
              </a>
            </div>

            <ul className="bullet-list">
              <li>Scan auto des annonces (24h/24)</li>
              <li>SMS pré-écrits qui donnent envie de répondre</li>
              <li>Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </div>

          {/* Bloc droit : simulation chiffres */}
          <div className="right-column">
            <div className="card-stats">
              <h2 className="card-title">SIMULATION CARHUNTER</h2>
              <p className="card-subtitle">32 vendeurs contactés aujourd&apos;hui</p>
              <p className="card-example">
                Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux
              </p>

              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Taux de réponse</div>
                  <div className="stat-value">54%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Deals trouvés</div>
                  <div className="stat-value">5</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Gain moyen / deal</div>
                  <div className="stat-value">&gt; 650 €</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Temps gagné</div>
                  <div className="stat-value">&gt; 4 h / jour</div>
                </div>
              </div>

              <p className="card-footer">
                Interface en cours de développement. Cette page est une preview de la
                version bêta de CarHunter.
              </p>
            </div>
          </div>
        </div>

        {/* Section comment ça marche */}
        <div id="how-it-works" className="section">
          <h2>Comment ça marche ?</h2>
          <ol className="steps-list">
            <li>Tu définis le type de voiture que tu cherches (modèle, budget, région…).</li>
            <li>CarHunter scanne les annonces et repère les bonnes opportunités.</li>
            <li>Des SMS sont envoyés automatiquement aux vendeurs en ton nom.</li>
            <li>Tu reçois les réponses et les meilleurs deals directement dans ton espace.</li>
          </ol>
        </div>

        {/* Section early access */}
        <div id="early-access" className="section">
          <h2>Demander un accès anticipé</h2>
          <p>
            Laisse ton email et comment tu veux utiliser CarHunter. Tu seras prioritaire
            quand la bêta sera ouverte.
          </p>

          <form className="early-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>
                Email
                <input type="email" placeholder="tonemail@example.com" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Comment tu veux utiliser CarHunter ?
                <input
                  type="text"
                  placeholder="Achat-revente, garage, mandataire..."
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Volume (ex : voitures / mois)
                <input type="text" placeholder="Ex : 5 voitures / mois" />
              </label>
            </div>
            <button type="submit" className="btn btn-primary full-width">
              Je veux être sur la liste
            </button>
          </form>

          <p className="disclaimer">
            (Formulaire encore en mode démo – on branchera la vraie base de données ensuite.)
          </p>
        </div>
      </div>
    </div>
  );
}
