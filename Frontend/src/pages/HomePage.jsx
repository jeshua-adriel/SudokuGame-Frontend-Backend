import { Link } from "react-router-dom";
import { useAudio } from "../hooks/AudioProvider.jsx";
import '../styles/floatingNumberBG.css';

const MINI_GRID = [
  0, 0, 7, 0, 8, 0, 0, 0, 0,
  0, 9, 0, 0, 0, 3, 0, 0, 6,
  8, 0, 0, 6, 0, 0, 9, 0, 0,
  0, 6, 0, 6, 0, 8, 0, 3, 0,
  0, 0, 9, 0, 5, 0, 8, 0, 0,
  0, 8, 0, 3, 0, 9, 0, 6, 0,
  0, 0, 7, 0, 0, 9, 0, 0, 5,
  4, 0, 0, 2, 0, 0, 0, 8, 0,
  0, 0, 0, 0, 4, 0, 4, 0, 0,
];
const ACCENT_INDEXES = new Set([2, 30, 40, 50, 78]);

export default function HomePage() {
  const { startMusic } = useAudio();

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
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow-mark">
            <span className="dot" /> One puzzle, no rush
          </span>
          <h1>A quieter way to play Sudoku.</h1>
          <p>
            No ads, no countdown pressure, no clutter: just a clean grid,
            a soft soundtrack, and a puzzle that's guaranteed solvable
            every single time.
          </p>
          <div className="hero-actions">
            <Link to="/play" className="btn btn-primary" onClick={startMusic}>
              Start a game
            </Link>
            <Link to="/leaderboard" className="btn btn-secondary">
              See top scores
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">3</div>
              <div className="label">difficulty levels</div>
            </div>
            <div className="hero-stat">
              <div className="num">100%</div>
              <div className="label">unique solutions</div>
            </div>
            <div className="hero-stat">
              <div className="num">∞</div>
              <div className="label">fresh puzzles</div>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="mini-grid">
            {MINI_GRID.map((val, i) => (
              <div
                key={i}
                className={[
                  "mg-cell",
                  val ? "filled" : "",
                  ACCENT_INDEXES.has(i) ? "accent" : "",
                  i >= 18 && i < 27 ? "row-thick" : "",
                  i >= 45 && i < 54 ? "row-thick" : "",
                ].join(" ")}
              >
                {val || ""}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-glyph">1</div>
          <h3>Pick your pace</h3>
          <p>Easy, medium, or hard: every board is generated fresh and checked to have exactly one solution.</p>
        </div>
        <div className="feature-card">
          <div className="feature-glyph">2</div>
          <h3>Play at your own speed</h3>
          <p>Your score rewards accuracy first, speed second: a careful slow solve beats a rushed messy one.</p>
        </div>
        <div className="feature-card">
          <div className="feature-glyph">3</div>
          <h3>Track your best</h3>
          <p>Every finished board is saved to your profile, so you can watch your high score climb over time.</p>
        </div>
      </section>
    </div>
  );
}
