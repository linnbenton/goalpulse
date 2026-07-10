const signals = [
  {
    minute: "21'",
    action: "BUY",
    confidence: "82%",
  },
  {
    minute: "46'",
    action: "WATCH",
    confidence: "71%",
  },
  {
    minute: "69'",
    action: "BUY",
    confidence: "93%",
  },
];

export default function SignalFeed() {
  return (
    <div className="card">
      <h3
        style={{
          marginBottom: 20,
        }}
      >
        Recent Signals
      </h3>

      {signals.map((signal) => (
        <div
          key={signal.minute}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: "1px solid #1f2937",
          }}
        >
          <span>{signal.minute}</span>

          <strong>{signal.action}</strong>

          <span>{signal.confidence}</span>
        </div>
      ))}
    </div>
  );
}
