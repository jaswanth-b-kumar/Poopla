type HistoryRow = {
  id: string;
  date: string;
  result: "Normal" | "Abnormal" | "Uncertain";
  confidence: string;
};

const historyRows: HistoryRow[] = [
  { id: "CHK-1423", date: "2026-01-27", result: "Normal", confidence: "93%" },
  { id: "CHK-1398", date: "2026-01-22", result: "Uncertain", confidence: "61%" },
  { id: "CHK-1361", date: "2026-01-18", result: "Abnormal", confidence: "88%" }
];

export function PatientDashboard() {
  return (
    <aside className="dashboard-card" aria-labelledby="patient-dashboard-title">
      <p className="hero-kicker">Patient Dashboard</p>
      <h2 id="patient-dashboard-title" className="dashboard-title">
        Aanya Mehta
      </h2>

      <div className="dashboard-grid">
        <div className="dashboard-stat">
          <span>Child age</span>
          <strong>8 months</strong>
        </div>
        <div className="dashboard-stat">
          <span>History</span>
          <strong>{historyRows.length} checks</strong>
        </div>
      </div>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <caption className="sr-only">Recent check results</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Result</th>
              <th scope="col">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {historyRows.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.result}</td>
                <td>{row.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
