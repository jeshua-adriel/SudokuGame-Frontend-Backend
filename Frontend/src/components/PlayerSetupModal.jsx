import { useState } from "react";
import { usePlayer } from "../hooks/PlayerProvider.jsx";

export default function PlayerSetupModal({ onDone, onCancel, onRegister }) {
  const { login } = usePlayer();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Enter your username.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }

    setSaving(true);
    try {
      const player = await login({ name: name.trim(), password });
      onDone(player);
    } catch (err) {
      setError(
        err.message.includes("API error")
          ? "Invalid username or password."
          : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="player-modal-backdrop" role="dialog" aria-modal="true">
      <form className="player-modal" onSubmit={handleSubmit}>
        <h2>Sign in to play</h2>
        <p className="helper">
          Sign in so your scores and personal best stay connected to your account.
        </p>

        <div className="field">
          <label htmlFor="login-name">Username</label>
          <input
            id="login-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your username"
            autoFocus
          />
        </div>

        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>

        {error && <div className="field-error">{error}</div>}

        <p className="modal-register-prompt">
          Not registered yet?{" "}
          <button type="button" onClick={onRegister}>
            Create an account
          </button>
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
