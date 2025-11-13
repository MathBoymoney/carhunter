export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#111",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "system-ui, sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#E60023", marginBottom: "1rem" }}>
        CarHunter
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", textAlign: "center" }}>
        Tu ne cherches plus les voitures. <br />Tu les chasses.
      </p>
      <button
        style={{
          marginTop: "2rem",
          backgroundColor: "#E60023",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "999px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Créer un compte (bientôt)
      </button>
    </div>
  );
}
