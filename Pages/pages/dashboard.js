const fakeLeads = [
  {
    id: 1,
    titre: "Peugeot 208 1.6 HDI",
    prix: "5 200 €",
    ville: "Bordeaux",
    tel: "06 12 34 56 78",
    statut: "SMS envoyé",
  },
  {
    id: 2,
    titre: "Clio 4 1.5 dCi",
    prix: "4 800 €",
    ville: "Pessac",
    tel: "06 98 76 54 32",
    statut: "En attente de réponse",
  },
];

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "2rem",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#e60023" }}>
          CarHunter – Dashboard
        </h1>
        <a
          href="/"
          style={{
            color: "#ccc",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}
        >
          Retour à l&apos;accueil
        </a>
      </header>

      <section
        style={{
          background: "#161616",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>
          Recherche de véhicules
        </h2>
        <p style={{ fontSize: "0.95rem", color: "#aaa" }}>
          Ici plus tard : formulaire pour choisir marque, modèle, budget, etc.
        </p>
      </section>

      <section
        style={{
          background: "#161616",
          borderRadius: "16px",
          padding: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Derniers leads trouvés (exemple)
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {fakeLeads.map((lead) => (
            <div
              key={lead.id}
              style={{
                background: "#1f1f1f",
                borderRadius: "12px",
                padding: "1rem",
                border: "1px solid #333",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {lead.titre}
              </h3>
              <p style={{ margin: "0.2rem 0" }}>Prix : {lead.prix}</p>
              <p style={{ margin: "0.2rem 0" }}>Ville : {lead.ville}</p>
              <p style={{ margin: "0.2rem 0" }}>Tel : {lead.tel}</p>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#7dd3fc",
                }}
              >
                Statut : {lead.statut}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
