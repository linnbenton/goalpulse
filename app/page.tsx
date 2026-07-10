import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: 24,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
          }}
        >
          GoalPulse
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: 20,
            maxWidth: 700,
          }}
        >
          Real-Time Football Intelligence Platform powered by TxODDS & Solana.
        </p>

        <Link
          href="/dashboard"
          style={{
            background: "#22c55e",
            color: "#000",
            padding: "16px 34px",
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          Launch Dashboard
        </Link>
      </section>
    </main>
  );
}
