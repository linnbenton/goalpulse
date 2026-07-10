export default function OddsPanel() {
  return (
    <div className="card">
      <h3
        style={{
          marginBottom: 20,
        }}
      >
        Live Odds
      </h3>

      <table
        style={{
          width: "100%",
        }}
      >
        <tbody>
          <tr>
            <td>Argentina</td>
            <td>1.25</td>
          </tr>

          <tr>
            <td>Draw</td>
            <td>3.65</td>
          </tr>

          <tr>
            <td>Brazil</td>
            <td>5.80</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
