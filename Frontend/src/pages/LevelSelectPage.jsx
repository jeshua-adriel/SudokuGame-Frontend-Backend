import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerSetupModal from "../components/PlayerSetupModal.jsx";
import { usePlayer } from "../hooks/PlayerProvider.jsx";
import { useAudio } from "../hooks/AudioProvider.jsx";
import '../styles/floatingNumberBG.css';

const LEVELS = [
  {
    id: "easy",
    name: "Easy",
    desc: "Plenty of starting clues — a relaxed warm-up round.",
    dots: 1,
  },
  {
    id: "medium",
    name: "Medium",
    desc: "A fair balance of given numbers and open space to reason through.",
    dots: 2,
  },
  {
    id: "hard",
    name: "Hard",
    desc: "Few clues, more deduction. For when you want to slow down and focus.",
    dots: 3,
  },
];

export default function LevelSelectPage() {
  const navigate = useNavigate();
  const { player } = usePlayer();
  const { startMusic } = useAudio();
  const [pendingLevel, setPendingLevel] = useState(null);

  const handlePick = (levelId) => {
    startMusic();
    if (!player) {
      setPendingLevel(levelId);
      return;
    }
    navigate(`/play/${levelId}`);
  };

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
        <h1>Choose your challenge</h1>
        <p>
          Every board is generated fresh and checked to have exactly one
          solution, no matter which level you pick.
        </p>
      </div>

      <div className="level-grid">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            className={`level-card ${level.id}`}
            onClick={() => handlePick(level.id)}
          >
            <div className="level-name">{level.name}</div>
            <p className="level-desc">{level.desc}</p>
            <div className="level-meta">
              <span>Difficulty</span>
              <span className="level-dots">
                {[1, 2, 3].map((i) => (
                  <span key={i} className={i <= level.dots ? "on" : ""} />
                ))}
              </span>
            </div>
          </button>
        ))}
      </div>

      {pendingLevel && (
        <PlayerSetupModal
          onCancel={() => setPendingLevel(null)}
          onRegister={() =>
            navigate("/register", {
              state: { redirectTo: `/play/${pendingLevel}` },
            })
          }
          onDone={() => {
            const level = pendingLevel;
            setPendingLevel(null);
            navigate(`/play/${level}`);
          }}
        />
      )}
    </div>
  );
}
