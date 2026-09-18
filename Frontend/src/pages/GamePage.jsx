import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SudokuBoard from "../components/SudokuBoard.jsx";
import NumberPad from "../components/NumberPad.jsx";
import AudioPanel from "../components/AudioPanel.jsx";
import ResultModal from "../components/ResultModal.jsx";
import PlayerSetupModal from "../components/PlayerSetupModal.jsx";
import { useSudokuGame } from "../hooks/useSudokuGame.js";
import { useAudio } from "../hooks/AudioProvider.jsx";
import { usePlayer } from "../hooks/PlayerProvider.jsx";
import { api } from "../api/client";

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function GamePage() {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const { player, refreshPlayer } = usePlayer();
  const { playSfx, startMusic } = useAudio();

  const {
    loading,
    error,
    userGrid,
    wrongCells,
    selected,
    correctInputs,
    totalInputs,
    seconds,
    status,
    feedback,
    isGiven,
    selectCell,
    inputNumber,
    eraseCell,
    reload,
  } = useSudokuGame(VALID_DIFFICULTIES.includes(difficulty) ? difficulty : "medium");

  const [result, setResult] = useState(null);
  const [needsPlayer, setNeedsPlayer] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    startMusic();
  }, [startMusic]);

  useEffect(() => {
    if (!loading && !player) setNeedsPlayer(true);
  }, [loading, player]);

  useEffect(() => {
    if (status === "won" && !submittedRef.current && player) {
      submittedRef.current = true;
      playSfx("win");
      const priorHighScore = player.high_score;

      api
        .submitScore({
          player: player.id,
          difficulty,
          time_completed_seconds: seconds,
          correct_inputs: correctInputs,
          total_inputs: totalInputs,
        })
        .then((saved) => {
          setResult({
            score: saved.score,
            difficulty,
            seconds,
            correctInputs,
            totalInputs,
            isHighScore: saved.score > priorHighScore,
          });
          refreshPlayer();
        })
        .catch(() => {
          setResult({
            score: null,
            difficulty,
            seconds,
            correctInputs,
            totalInputs,
            isHighScore: false,
          });
        });
    }
  }, [status, player, difficulty, seconds, correctInputs, totalInputs, playSfx, refreshPlayer]);

  const handleSelect = (r, c) => {
    playSfx("select");
    selectCell(r, c);
  };

  const handleInput = (num) => {
    const correct = inputNumber(num);
    if (correct === true) playSfx("correct");
    else if (correct === false) playSfx("wrong");
  };

  const handlePlayAgain = () => {
    submittedRef.current = false;
    setResult(null);
    reload();
  };

  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    return (
      <div className="container">
        <p style={{ padding: "var(--space-7) 0" }}>
          Unknown difficulty. <Link to="/play">Pick a level</Link>.
        </p>
      </div>
    );
  }

  const wrongCount = Math.max(0, totalInputs - correctInputs);

  return (
    <div className="container game-page">
      <div className="game-topbar">
        <div>
          <div className="difficulty-tag">{difficulty}</div>
        </div>
        <div className="game-stats">
          <div className="stat-chip timer">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(seconds)}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Correct</span>
            <span className="stat-value">{correctInputs}</span>
          </div>
          <div className="stat-chip wrong">
            <span className="stat-label">Wrong</span>
            <span className="stat-value">{wrongCount}</span>
          </div>
          <Link to="/play" className="btn btn-ghost">
            Change level
          </Link>
        </div>
      </div>

      {error && <p style={{ color: "var(--clay)", marginBottom: "var(--space-4)" }}>{error}</p>}

      {loading || !userGrid ? (
        <p>Shuffling a fresh board…</p>
      ) : (
        <div className="game-layout">
          <div className="board-wrap">
            <SudokuBoard
              userGrid={userGrid}
              isGiven={isGiven}
              selected={selected}
              wrongCells={wrongCells}
              feedback={feedback}
              onSelect={handleSelect}
            />
          </div>
          <div className="side-panel">
            <NumberPad onInput={handleInput} onErase={eraseCell} disabled={status !== "playing"} />
            <AudioPanel />
            <div className="side-actions">
              <button className="btn btn-secondary" onClick={reload}>
                New puzzle
              </button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <ResultModal
          result={result}
          onPlayAgain={handlePlayAgain}
          onChangeLevel={() => navigate("/play")}
        />
      )}

      {needsPlayer && (
        <PlayerSetupModal
          onCancel={() => navigate("/play")}
          onRegister={() =>
            navigate("/register", {
              state: { redirectTo: `/play/${difficulty}` },
            })
          }
          onDone={() => setNeedsPlayer(false)}
        />
      )}
    </div>
  );
}