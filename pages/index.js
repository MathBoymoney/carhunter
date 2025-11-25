export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #222 0, #050505 60%)",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "#E60023" }}>Car</span>Hunter
      </h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "1.1rem",
          maxWidth: "600px",
          textAlign: "center",
          opacity: 0.85,
        }}
      >
        Tu ne cherches plus les voitures. <br />
        <strong>Tu les chasses automatiquement.</strong>
      </p>

      <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
        <a
          href="/dashboard"
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            background: "#E60023",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            boxShadow: "0 0 25px rgba(230,0,35,0.4)",
          }}
        >
          Accéder au tableau de bord
        </a>

        <a
          href="#how"
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid #555",
            color: "#ddd",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          Voir comment ça marche
        </a>
      </div>

      <section
        id="how"
        style={{
          marginTop: "60px",
          maxWidth: "900px",
          borderRadius: "18px",
          padding: "24px 20px",
          border: "1px solid #333",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>
          Comment fonctionne CarHunter ?
        </h2>
        <ol style={{ paddingLeft: "20px", lineHeight: 1.6, fontSize: "0.95rem" }}>
          <li>Tu définis le type de voiture que tu recherches (budget, modèle, kilométrage…)</li>
          <li>CarHunter scanne les annonces en continu.</li>
          <li>Les vendeurs sont contactés automatiquement par SMS malin.</li>
          <li>Les réponses des vendeurs sont centralisées dans ton tableau de bord.</li>
        </ol>
      </section>

      <footer style={{ marginTop: "50px", fontSize: "0.75rem", opacity: 0.5 }}>
        CarHunter · SaaS expérimental en développement
      </footer>
    </div>
  );
}
