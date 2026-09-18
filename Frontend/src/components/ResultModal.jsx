function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ResultModal({ result, onPlayAgain, onChangeLevel }) {
  if (!result) return null;
  const { score, difficulty, seconds, correctInputs, totalInputs, isHighScore } = result;
  const wrong = Math.max(0, totalInputs - correctInputs);

  return (
    <div className="player-modal-backdrop">
      <div className="result-card">
        <div className="result-badge">✓</div>
        <h2>Puzzle solved</h2>
        <p>
          {difficulty[0].toUpperCase() + difficulty.slice(1)} board, cleared in{" "}
          {formatTime(seconds)}.
        </p>
        <div className="result-score">{score}</div>
        {isHighScore && (
          <p style={{ color: "var(--amber)", fontWeight: 600, marginBottom: "var(--space-4)" }}>
            New personal best!
          </p>
        )}
        <div className="result-breakdown">
          <div>
            <div className="val">{formatTime(seconds)}</div>
            <div className="lbl">Time</div>
          </div>
          <div>
            <div className="val">{correctInputs}</div>
            <div className="lbl">Correct</div>
          </div>
          <div>
            <div className="val">{wrong}</div>
            <div className="lbl">Wrong</div>
          </div>
        </div>
        <div className="modal-actions" style={{ justifyContent: "center" }}>
          <button className="btn btn-secondary" onClick={onChangeLevel}>
            Change level
          </button>
          <button className="btn btn-primary" onClick={onPlayAgain}>
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}
