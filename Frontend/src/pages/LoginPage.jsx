import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { usePlayer } from '../hooks/PlayerProvider.jsx';
import '../styles/login.css'; 
import '../styles/floatingNumberBG.css';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = usePlayer();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await login({
        name: name.trim(),
        password,
      });

      navigate(
        location.state?.redirectTo || '/',
        { replace: true }
      );
    } catch (err) {
      setError(
        err.message.includes('API error')
          ? 'Invalid username or password.'
          : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="login-page">

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

      {/* Login Card */}
      <div className="login-card">

        {/* Header */}
        <div className="login-header">

          {/* Animated Sudoku Grid */}
          <div className="login-mark">
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>

            <span>4</span>
            <span className="active">5</span>
            <span>6</span>

            <span>7</span>
            <span>8</span>
            <span className="active">9</span>
          </div>

          <p className="login-eyebrow">
            WELCOME BACK
          </p>

          <h2 className="login-heading">
            Player Login
          </h2>

          <p className="login-subheading">
            Continue your Sudoku journey.
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className="login-error">
            <span className="login-error-icon">
              !
            </span>

            <span>
              {error}
            </span>
          </div>
        )}

        {/* Login Form */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* Username */}
          <div className="login-field field-1">
            <label htmlFor="login-username">
              Username
            </label>

            <input
              id="login-username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>

          {/* Password */}
          <div className="login-field field-2">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-submit"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="login-spinner"></span>
                Signing In…
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="login-arrow">
                  →
                </span>
              </>
            )}
          </button>

        </form>

        {/* Register */}
        <div className="login-footer">

          <span>
            New user?
          </span>

          <Link
            to="/register"
            state={{
              redirectTo: location.state?.redirectTo
            }}
          >
            Create Account

            <span className="login-link-arrow">
              →
            </span>
          </Link>

        </div>

      </div>
    </div>
  );
}