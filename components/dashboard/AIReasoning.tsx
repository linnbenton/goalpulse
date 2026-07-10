export default function AIReasoning() {
  return (
    <div className="card">
      <h3>AI Recommendation</h3>

      <h1
        style={{
          marginTop: 18,
          color: "#22c55e",
          fontSize: 42,
        }}
      >
        BUY
      </h1>

      <p
        style={{
          marginTop: 20,
        }}
      >
        Confidence
      </p>

      <h2>91%</h2>

      <ul
        style={{
          marginTop: 20,
          lineHeight: 2,
        }}
      >
        <li>✔ Argentina dominates possession</li>

        <li>✔ Brazil received red card</li>

        <li>✔ Odds falling rapidly</li>

        <li>✔ Momentum increasing</li>
      </ul>
    </div>
  );
}
