// pages/index.js
import { useState } from "react";

export default function Home() {
  // États pour le formulaire early access
  const [email, setEmail] = useState("");
  const [usage, setUsage] = useState("");
  const [volume, setVolume] = useState("");
  const [loadingLead, setLoadingLead] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");

  // États pour la "recherche de voitures" (mock)
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [region, setRegion] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Scroll vers la section formulaire
  const scrollToForm = () => {
    const el = document.getElementById("early-access");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Envoi des infos early access vers MongoDB
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadMessage("");
    setLoadingLead(true);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, usage, volume }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur");
      }

      setLeadMessage("✅ C'est bon, tu es sur la liste CarHunter !");
      setEmail("");
      setUsage("");
      setVolume("");
    } catch (err) {
      setLeadMessage("❌ " + err.message);
    } finally {
      setLoadingLead(false);
    }
  };

  // Appel de l'API "search-cars" (mock)
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    setSearchResults([]);

    try {
      const res = await fetch("/api/search-cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, model, maxPrice, region }),
      });

      if (!res.ok) {
        throw new Error("Erreur pendant la recherche.");
      }

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      alert(err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="container">
        {/* HEADER / HERO */}
        <header className="hero">
          <div className="badge-row">
            <div className="logo">
              <span className="logo-circle">CH</span>
              <div>
                <div className="logo-title">CarHunter</div>
                <div className="logo-sub">SaaS de prospection auto par SMS</div>
              </div>
            </div>
            <div className="tags">
              <span className="tag">NOUVEAU</span>
              <span className="tag tag-outline">AUTOMATISATION IA</span>
            </div>
          </div>

          <h1 className="hero-title">
            Tu ne cherches plus les voitures, <br />
            <span className="highlight">tu les chasses.</span>
          </h1>

          <p className="hero-text">
            CarHunter repère pour toi les meilleures annonces de voitures et
            contacte automatiquement les vendeurs par SMS. Tu reçois seulement
            les bons plans dans ton tableau de bord.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToForm}>
              Demander un accès anticipé
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Voir comment ça marche →
            </button>
          </div>

          <ul className="hero-bullets">
            <li>Scan auto des annonces (24h/24)</li>
            <li>SMS pré-écrits qui donnent envie de répondre</li>
            <li>Parfait pour achat-revente, garages, mandataires</li>
          </ul>
        </header>

        {/* CARDS SECTION */}
        <section className="cards">
          <div className="card" id="how-it-works">
            <h2>Comment ça marche ?</h2>
            <ol className="steps">
              <li>Tu définis le type de voiture que tu cherches.</li>
              <li>CarHunter scanne les annonces et repère les bonnes opportunités.</li>
              <li>Des SMS sont envoyés automatiquement aux vendeurs en ton nom.</li>
              <li>Tu reçois les réponses et les meilleurs deals directement dans ton espace.</li>
            </ol>
          </div>

          <div className="card card-simulation">
            <h2>Simulation CarHunter</h2>
            <div className="sim-row">
              <span>Vendeurs contactés aujourd’hui</span>
              <span className="sim-value">32</span>
            </div>
            <div className="sim-row">
              <span>Exemple</span>
              <span className="sim-value">Peugeot 208 &lt; 7 000 €</span>
            </div>
            <div className="sim-row">
              <span>Taux de réponse</span>
              <span className="sim-value">54 %</span>
            </div>
            <div className="sim-row">
              <span>Deals trouvés</span>
              <span className="sim-value">5</span>
            </div>
            <div className="sim-row">
              <span>Gain moyen / deal</span>
              <span className="sim-value">&gt; 650 €</span>
            </div>
            <div className="sim-row">
              <span>Temps gagné</span>
              <span className="sim-value">&gt; 4 h / jour</span>
            </div>
            <p className="sim-note">
              Interface en cours de développement. Cette page est une préversion de
              la version bêta de CarHunter.
            </p>
          </div>
        </section>

        {/* EARLY ACCESS FORM */}
        <section className="card card-form" id="early-access">
          <h2>Demander un accès anticipé</h2>
          <p className="form-text">
            Laisse ton email et comment tu veux utiliser CarHunter. Tu seras prioritaire
            quand la bêta sera ouverte.
          </p>

          <form className="form-grid" onSubmit={handleLeadSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="tonmail@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Comment tu veux utiliser CarHunter ?</label>
              <input
                type="text"
                placeholder="Achat-revente, garage, mandataire..."
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Volume (ex : voitures / mois)</label>
              <input
                type="text"
                placeholder="Ex : 5 voitures / mois"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
              />
            </div>

            <button className="btn-primary full" type="submit" disabled={loadingLead}>
              {loadingLead ? "Enregistrement..." : "Je veux être sur la liste"}
            </button>
          </form>

          {leadMessage && <p className="form-message">{leadMessage}</p>}

          <p className="form-footnote">
            Aucun spam. Tu recevras seulement un mail quand la bêta sera prête.
          </p>
        </section>

        {/* MOCK SEARCH SECTION */}
        <section className="card card-search">
          <h2>Démo recherche (mock)</h2>
          <p className="form-text">
            Petite démo pour tester la future recherche CarHunter. Pour l’instant ce
            sont des résultats factices, mais la structure est prête pour le vrai moteur.
          </p>

          <form className="form-grid" onSubmit={handleSearch}>
            <div className="form-group">
              <label>Marque</label>
              <input
                type="text"
                placeholder="Peugeot, Renault..."
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Modèle</label>
              <input
                type="text"
                placeholder="208, Clio..."
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Prix max (€)</label>
              <input
                type="number"
                placeholder="7000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Région</label>
              <input
                type="text"
                placeholder="Bordeaux, Lyon..."
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <button className="btn-secondary full" type="submit" disabled={searchLoading}>
              {searchLoading ? "Recherche en cours..." : "Lancer une recherche de démo"}
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="results">
              {searchResults.map((car) => (
                <a
                  key={car.id}
                  href={car.url}
                  target="_blank"
                  rel="noreferrer"
                  className="result-card"
                >
                  <div className="result-title">{car.title}</div>
                  <div className="result-line">
                    <span>{car.year}</span> · <span>{car.km.toLocaleString()} km</span>
                  </div>
                  <div className="result-footer">
                    <span className="price">{car.price.toLocaleString()} €</span>
                    <span className="source">{car.source}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
