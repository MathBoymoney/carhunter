import { useRef, useState } from "react";

export default function Home() {
  const formRef = useRef(null);

  // WAITLIST STATES
  const [email, setEmail] = useState("");
  const [usage, setUsage] = useState("");
  const [volume, setVolume] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState(null);

  // SEARCH STATES
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [budget, setBudget] = useState("");
  const [ville, setVille] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //--------------------------
  //  WAITLIST SUBMIT (MongoDB)
  //--------------------------
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, usage, volume }),
      });

      const data = await res.json();

      if (!data.success) {
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

  //--------------------------
  //  REAL SEARCH BACKEND
  //--------------------------
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!marque && !modele) {
      alert("Mets au moins une marque ou un modèle 😉");
      return;
    }

    const query = `${marque} ${modele} ${budget} ${ville}`.trim();

    setSearching(true);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResults(data.results || []);
    setSearching(false);
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
        {/* HEADER */}
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
                borderRadius: 999,
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
                Trouve les meilleures voitures automatiquement.
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>bêta privée</div>
        </header>

        {/* HERO CARD */}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
              gap: 24,
            }}
          >
            {/* LEFT BLOCK */}
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

              <p style={{ fontSize: 14, color: "#d1d5db", marginBottom: 16 }}>
                CarHunter scanne Leboncoin + LaCentrale, filtre les bonnes
                voitures et te les affiche directement.
              </p>

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
            </div>

            {/* RIGHT SIMULATION */}
            <div
              style={{
                borderRadius: 20,
                border: "1px solid rgba(148,163,184,0.6)",
                padding: 16,
                background:
                  "radial-gradient(circle at top, rgba(250,204,21,0.12), rgba(15,23,42,0.98))",
              }}
            >
              <h4 style={{ fontSize: 14, marginBottom: 8, color: "#facc15" }}>
                Exemple de résultats aujourd’hui
              </h4>
              <p style={{ fontSize: 12, color: "#e5e7eb" }}>
                Peugeot 208 &lt; 7 000€ autour de Bordeaux  
                32 annonces trouvées, 5 très bonnes affaires.
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH BLOCK */}
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
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>
            Recherche automatique d’annonces
          </h2>

          <form
            onSubmit={handleSearch}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              gap: 12,
              marginTop: 16,
            }}
          >
            <input
              placeholder="Marque"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Modèle"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Budget max"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Ville / région"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              style={inputStyle}
            />

            <div style={{ gridColumn: "1/-1" }}>
              <button
                type="submit"
                style={{
                  borderRadius: 999,
                  padding: "10px 24px",
                  border: "none",
                  background:
                    "linear-gradient(90deg,#facc15,#fbbf24,#f59e0b)",
                  color: "#111827",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {searching ? "Recherche..." : "Lancer la recherche"}
              </button>
            </div>
          </form>

          {/* RESULTS */}
          {results.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>Résultats :</h3>

              {results.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 12,
                    marginBottom: 10,
                    borderRadius: 12,
                    border: "1px solid rgba(148,163,184,0.4)",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 14, color: "#facc15" }}>
                    {item.price}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>
                    {item.location}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    style={{ fontSize: 12, color: "#60a5fa" }}
                  >
                    Voir l’annonce →
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* WAITLIST */}
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
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>
            Demande d’accès anticipé
          </h2>

          <form
            onSubmit={handleWaitlistSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,minmax(0,1fr))",
              gap: 10,
              marginTop: 16,
            }}
          >
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Utilisation prévue"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Volume de recherche"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={waitlistStatus === "loading"}
              style={{
                gridColumn: "1/-1",
                padding: "10px 20px",
                borderRadius: 999,
                background:
                  "linear-gradient(90deg,#facc15,#fbbf24,#f59e0b)",
                color: "#111827",
                fontWeight: 700,
                cursor: "pointer",
                width: "100%",
              }}
            >
              {waitlistStatus === "loading"
                ? "Enregistrement..."
                : "Rejoindre la liste"}
            </button>
          </form>

          {waitlistStatus === "success" && (
            <p style={{ fontSize: 12, color: "#4ade80", marginTop: 8 }}>
              ✔️ Email enregistré !
            </p>
          )}
          {waitlistStatus === "error" && (
            <p style={{ fontSize: 12, color: "#f87171", marginTop: 8 }}>
              ❌ Une erreur est survenue.
            </p>
          )}
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
