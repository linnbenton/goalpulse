export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f2937",
        paddingBottom: 18,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          GoalPulse Dashboard
        </h2>

        <p
          style={{
            color: "#9ca3af",
          }}
        >
          Real-Time Football Intelligence
        </p>
      </div>

      <div
        style={{
          background: "#22c55e",
          color: "#000",
          padding: "10px 18px",
          borderRadius: 8,
          fontWeight: 700,
        }}
      >
        LIVE
      </div>
    </header>
  );
}
