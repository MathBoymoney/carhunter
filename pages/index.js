// pages/index.js
import { useRef, useState } from "react";

export default function Home() {
  const formRef = useRef(null);

  // état formulaire waitlist
  const [email, setEmail] = useState("");
  const [usage, setUsage] = useState("");
  const [volume, setVolume] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState(null);

  // état formulaire recherche
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [budget, setBudget] = useState("");
  const [ville, setVille] = useState("");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ➜ NOUVEAU : envoie les emails vers /api/waitlist
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, usage, volume }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setWaitlistStatus("error");
      } else {
        setWaitlistStatus("success");
        setEmail("");
        setUsage("");
        setVolume("");
      }
    } catch (err) {
      console.error(err);
      setWaitlistStatus("error");
    }
  };

  // ➜ Recherche : ouvre Leboncoin + LaCentrale
  const handleSearch = (e) => {
    e.preventDefault();

    if (!marque && !modele) {
      alert("Mets au moins une marque ou un modèle 😉");
      return;
    }

    const query = `${marque} ${modele}`.trim();
    const price = budget ? budget.replace(/\D/g, "") : "";
    const city = ville.trim();

    // URL LeBonCoin
    let lbcUrl =
      "https://www.leboncoin.fr/recherche?category=2&text=" +
      encodeURIComponent(query);
    if (price) {
      lbcUrl += `&price=0-${price}`;
    }
    if (city) {
      lbcUrl += `&locations=${encodeURIComponent(city)}`;
    }

    // URL LaCentrale
    let lcUrl =
      "https://www.lacentrale.fr/listing?makesModelsCommercialNames=" +
      encodeURIComponent(query);
    if (price) {
      lcUrl += `&priceMax=${price}`;
    }

    window.open(lbcUrl, "_blank");
    window.open(lcUrl, "_blank");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #222 0, #020617 40%, #000 100%)",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "32px 16px 64px",
        }}
      >
        {/* Header / Logo */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "999px",
                background: "#facc15",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#000",
                fontSize: 14,
              }}
            >
              CH
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>CarHunter</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                SaaS de prospection auto par SMS
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            bêta privée
          </div>
        </header>

        {/* Carte principale */}
        <section
          style={{
            borderRadius: 24,
            border: "1px solid rgba(250, 204, 21, 0.2)",
            padding: 32,
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.98))",
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(250, 204, 21, 0.12)",
                color: "#facc15",
                textTransform: "uppercase",
                letterSpacing: 0.08,
                fontWeight: 600,
              }}
            >
              Nouveau
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(52,211,153,0.12)",
                color: "#4ade80",
                textTransform: "uppercase",
                letterSpacing: 0.08,
                fontWeight: 600,
              }}
            >
              Automatisation IA
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
              gap: 24,
            }}
          >
            {/* Bloc gauche : pitch */}
            <div>
              <h1
                style={{
                  fontSize: 32,
                  lineHeight: 1.1,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                Tu ne cherches plus les voitures,
                <br />
                <span style={{ color: "#facc15" }}>tu les chasses.</span>
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#d1d5db",
                  maxWidth: 420,
                  marginBottom: 20,
                }}
              >
                CarHunter repère pour toi les meilleures annonces de voitures et
                te propose les meilleurs plans en quelques clics. Tu gardes le
                contrôle : c&apos;est toi qui contactes les vendeurs.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <button
                  onClick={scrollToForm}
                  style={{
                    borderRadius: 999,
                    padding: "12px 22px",
                    border: "none",
                    background:
                      "linear-gradient(90deg, #facc15, #fbbf24, #f59e0b)",
                    color: "#111827",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(250, 204, 21, 0.35)",
                  }}
                >
                  Demander un accès anticipé
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById("search-block")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    borderRadius: 999,
                    padding: "12px 20px",
                    border: "1px solid rgba(148, 163, 184, 0.6)",
                    background: "transparent",
                    color: "#e5e7eb",
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Voir comment ça marche →
                </button>
              </div>

              <ul
                style={{
                  fontSize: 13,
                  color: "#9ca3af",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                <li>• Scan auto des annonces (LeBonCoin + LaCentrale)</li>
                <li>• Filtres simples : marque, modèle, budget, ville</li>
                <li>• Tu gardes le contrôle des contacts vendeurs</li>
              </ul>
            </div>

            {/* Bloc droit : simulation */}
            <div
              style={{
                borderRadius: 20,
                border: "1px solid rgba(148,163,184,0.6)",
                background:
                  "radial-gradient(circle at top, rgba(250,204,21,0.12), rgba(15,23,42,0.98))",
                padding: 16,
                fontSize: 12,
                color: "#e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 0.08,
                  color: "#9ca3af",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Simulation CarHunter
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    Vendeurs trouvés (aujourd&apos;hui)
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>32</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>Exemple</div>
                  <div style={{ fontSize: 12 }}>
                    Peugeot 208 &lt; 7 000 € autour de Bordeaux
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <InfoLine label="Taux de réponses" value="54 %" />
                <InfoLine label="Deals trouvés" value="5" />
                <InfoLine label="Gain moyen / deal" value="≈ 650 €" />
                <InfoLine label="Temps gagné" value="&gt; 4 h / jour" />
              </div>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
                Interface en cours de développement. Cette page est une
                préversion de la future version bêta de CarHunter.
              </p>
            </div>
          </div>
        </section>

        {/* Bloc recherche annonces */}
        <section
          id="search-block"
          style={{
            marginTop: 32,
            borderRadius: 20,
            border: "1px solid rgba(148,163,184,0.3)",
            padding: 20,
            background: "rgba(15,23,42,0.92)",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Lancer une recherche d&apos;annonces maintenant
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              marginBottom: 16,
              maxWidth: 520,
            }}
          >
            Remplis ces champs et CarHunter ouvre automatiquement LeBonCoin et
            LaCentrale avec ta recherche pré-remplie. Tu consultes et contactes
            ensuite les vendeurs toi-même.
          </p>

          <form
            onSubmit={handleSearch}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <input
              placeholder="Marque (ex : Peugeot)"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Modèle (ex : 208)"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Budget max (ex : 7000)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Ville / région (ex : Bordeaux)"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              style={inputStyle}
            />
            <div style={{ gridColumn: "1 / -1", textAlign: "left" }}>
              <button
                type="submit"
                style={{
                  marginTop: 4,
                  borderRadius: 999,
                  padding: "10px 20px",
                  border: "none",
                  background:
                    "linear-gradient(90deg, #facc15, #fbbf24, #f59e0b)",
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Lancer la recherche
              </button>
            </div>
          </form>
          <p style={{ fontSize: 11, color: "#6b7280" }}>
            ⚠️ CarHunter n&apos;est pas affilié à LeBonCoin ou LaCentrale. Les
            onglets ouverts utilisent simplement leurs formulaires de recherche
            publics.
          </p>
        </section>

        {/* Bloc waitlist */}
        <section
          ref={formRef}
          style={{
            marginTop: 32,
            borderRadius: 20,
            border: "1px solid rgba(148,163,184,0.3)",
            padding: 20,
            background: "rgba(15,23,42,0.92)",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Demander un accès anticipé
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              marginBottom: 16,
              maxWidth: 520,
            }}
          >
            Laisse ton email et comment tu veux utiliser CarHunter. Tu seras
            prioritaire quand la bêta sera ouverte.
          </p>

          <form
            onSubmit={handleWaitlistSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Comment tu veux utiliser CarHunter ?"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Volume (ex : 5 voitures / mois)"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              style={inputStyle}
            />
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button
                type="submit"
                disabled={waitlistStatus === "loading"}
                style={{
                  marginTop: 4,
                  borderRadius: 999,
                  padding: "10px 24px",
                  border: "none",
                  background:
                    "linear-gradient(90deg, #facc15, #fbbf24, #f59e0b)",
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  opacity: waitlistStatus === "loading" ? 0.7 : 1,
                }}
              >
                {waitlistStatus === "loading"
                  ? "Enregistrement..."
                  : "Je veux être sur la liste"}
              </button>
            </div>
          </form>

          {waitlistStatus === "success" && (
            <p style={{ fontSize: 12, color: "#4ade80" }}>
              ✅ C&apos;est bon, tu es sur la liste d&apos;attente CarHunter.
            </p>
          )}
          {waitlistStatus === "error" && (
            <p style={{ fontSize: 12, color: "#f97373" }}>
              ❌ Impossible d&apos;enregistrer maintenant. Réessaie dans
              quelques minutes.
            </p>
          )}

          <p style={{ fontSize: 11, color: "#6b7280", marginTop: 8 }}>
            Aucun spam. Tu recevras seulement un mail quand la bêta sera prête.
          </p>
        </section>
      </main>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(55,65,81,0.9)",
  background: "rgba(15,23,42,0.9)",
  color: "#e5e7eb",
  fontSize: 13,
  outline: "none",
};

function InfoLine({ label, value }) {
  return (
    <div
      style={{
        padding: "6px 8px",
        borderRadius: 10,
        border: "1px solid rgba(55,65,81,0.9)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span style={{ fontSize: 11, color: "#9ca3af" }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#facc15" }}>
        {value}
      </span>
    </div>
  );
}
