const fakeLeads = [
  {
    id: 1,
    title: "Peugeot 208 1.6L HDi",
    price: "5 200 €",
    location: "Bordeaux",
    km: "152 000 km",
    status: "En attente de réponse",
  },
  {
    id: 2,
    title: "Clio 4 1.5 Dci",
    price: "4 700 €",
    location: "Mérignac",
    km: "138 000 km",
    status: "Vendeur intéressé",
  },
  {
    id: 3,
    title: "Golf 6 2.0 TDI",
    price: "7 900 €",
    location: "Pessac",
    km: "190 000 km",
    status: "SMS envoyé",
  },
];

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "20px",
        background: "#050505",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700 }}>
            CarHunter <span style={{ color: "#E60023" }}>Dashboard</span>
          </h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
            Aperçu de tes recherches et des vendeurs contactés.
          </p>
        </div>

        <a
          href="/"
          style={{
            fontSize: "0.85rem",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid #444",
            textDecoration: "none",
            color: "#ddd",
          }}
        >
          ⬅ Retour à l&apos;accueil
        </a>
      </header>

      <section
        style={{
          marginBottom: "20px",
          padding: "16px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, rgba(230,0,35,0.08), rgba(255,255,255,0.02))",
          border: "1px solid #331018",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
          Nouvelle recherche (bientôt)
        </h2>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "10px" }}>
          Ici tu pourras définir ton budget, modèle, kilométrage max, zone de recherche, etc.
        </p>
        <button
          disabled
          style={{
            padding: "10px 18px",
            borderRadius: "999px",
            border: "none",
            background: "#333",
            color: "#888",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "not-allowed",
          }}
        >
          + Ajouter une recherche (désactivé pour l&apos;instant)
        </button>
      </section>

      <section>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Vendeurs contactés (fake data)</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
          }}
        >
          {fakeLeads.map((lead) => (
            <div
              key={lead.id}
              style={{
                borderRadius: "14px",
                padding: "14px",
                border: "1px solid #262626",
                background: "linear-gradient(135deg, #111, #050505)",
              }}
            >
              <h3 style={{ fontSize: "1rem", marginBottom: "6px" }}>{lead.title}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.85 }}>
                {lead.price} · {lead.km}
              </p>
              <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "8px" }}>
                📍 {lead.location}
              </p>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  background: "#1b1b1b",
                  border: "1px solid #333",
                }}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "25px" }}>
        Les SMS réels et le scraping seront branchés plus tard. Pour l&apos;instant, ceci est une
        maquette fonctionnelle du tableau de bord.
      </p>
    </div>
  );
}
