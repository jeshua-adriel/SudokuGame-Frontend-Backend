import { useEffect, useState } from "react";
import { api } from "../api/client";
import '../styles/floatingNumberBG.css';

const FILTERS = [
  { id: "", label: "All" },
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .getLeaderboard(filter || undefined)
      .then((data) => setRows(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError("Couldn't reach the backend. Is it running on localhost:8000?"))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="container">
      {/* Decorative Sudoku Numbers */}
      <div className="floating-decoration floating-decoration-1">
        <span>7</span>
        <span>2</span>
        <span>9</span>
      </div>

      <div className="floating-decoration floating-decoration-2">
        <span>4</span>
        <span>8</span>
        <span>1</span>
      </div>

      <div className="floating-decoration floating-decoration-3">
        <span>2</span>
        <span>1</span>
        <span>8</span>
      </div>

      <div className="floating-decoration floating-decoration-4">
        <span>5</span>
        <span>2</span>
        <span>8</span>
      </div>

      <div className="floating-decoration floating-decoration-5">
        <span>1</span>
        <span>7</span>
        <span>4</span>
      </div>

      <div className="floating-decoration floating-decoration-6">
        <span>2</span>
        <span>3</span>
        <span>7</span>
      </div>

      <div className="floating-decoration floating-decoration-7">
        <span>8</span>
        <span>9</span>
        <span>5</span>
      </div>

      <div className="floating-decoration floating-decoration-8">
        <span>7</span>
        <span>6</span>
        <span>1</span>
      </div>
      <div className="page-head">
        <h1>Top scores</h1>
        <p>Score rewards a clean, accurate solve — speed only breaks ties.</p>
      </div>

      <div className="pill-toggle" style={{ marginBottom: "var(--space-5)" }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={filter === f.id ? "selected" : ""}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && <p style={{ color: "var(--clay)" }}>{error}</p>}

      {!error && loading && <p>Loading…</p>}

      {!error && !loading && rows.length === 0 && (
        <div className="empty-state">No games finished yet — be the first on the board.</div>
      )}

      {!error && !loading && rows.length > 0 && (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Difficulty</th>
              <th>Time</th>
              <th>Accuracy</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id}>
                <td className="rank">{i + 1}</td>
                <td>{row.player_name}</td>
                <td style={{ textTransform: "capitalize" }}>{row.difficulty}</td>
                <td>
                  {Math.floor(row.time_completed_seconds / 60)}:
                  {String(row.time_completed_seconds % 60).padStart(2, "0")}
                </td>
                <td>
                  {row.total_inputs > 0
                    ? Math.round((row.correct_inputs / row.total_inputs) * 100)
                    : 100}
                  %
                </td>
                <td className="score">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
