export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#e60023",
          marginBottom: "1rem",
        }}
      >
        CarHunter
      </h1>
      <p
        style={{
          fontSize: "1.3rem",
          maxWidth: "600px",
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: "2rem",
        }}
      >
        Tu ne cherches plus les voitures. <br /> Tu les chasses.
        <br />
        <br />
        CarHunter scanne les annonces, trouve les bonnes affaires et
        contacte automatiquement les vendeurs par SMS.
      </p>

      <a
        href="/dashboard"
        style={{
          background: "#e60023",
          padding: "0.8rem 1.8rem",
          borderRadius: "999px",
          fontWeight: "600",
          textDecoration: "none",
          color: "#fff",
        }}
      >
        Accéder au tableau de bord
      </a>
    </div>
  );
}
