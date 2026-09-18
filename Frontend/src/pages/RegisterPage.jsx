import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { usePlayer } from '../hooks/PlayerProvider.jsx';
import '../styles/register.css';
import '../styles/floatingNumberBG.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('prefer_not_to_say');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { register } = usePlayer();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await register({
        name: username.trim(),
        email: email.trim(),
        password,
        age: parseInt(age, 10),
        gender,
      });

      navigate(location.state?.redirectTo || '/', { replace: true });
    } catch (err) {
      setError(
        err.message.includes('API error')
          ? 'Unable to create that account.'
          : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="register-page">

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

      {/* Background Decorations */}
      <div className="register-decoration register-decoration-1" />
      <div className="register-decoration register-decoration-2" />

      <div className="register-card">

        {/* Header */}
        <div className="register-header">

          <div className="register-mark" aria-hidden="true">
            <span />
            <span />
            <span />

            <span />
            <span className="active" />
            <span />

            <span />
            <span />
            <span />
          </div>

          <p className="register-eyebrow">
            PLAYER REGISTRATION
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="register-error">
            <span className="register-error-icon">!</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="register-form" onSubmit={handleRegister}>

          {/* Username */}
          <div className="register-field field-1">
            <label htmlFor="register-username">
              Username
            </label>

            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>

          {/* Email */}
          <div className="register-field field-2">
            <label htmlFor="register-email">
              Email
            </label>

            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="register-field field-3">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Age */}
          <div className="register-row">

            <div className="register-field field-4">
              <label htmlFor="register-age">
                Age
              </label>

              <input
                id="register-age"
                type="number"
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                required
              />
            </div>

            {/* Gender */}
            <div className="register-field field-5">
              <label htmlFor="register-gender">
                Gender Identity
              </label>

              <select
                id="register-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">
                  Prefer not to say
                </option>
              </select>
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="register-submit"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="register-spinner" />
                Creating…
              </>
            ) : (
              'Create Profile'
            )}
          </button>

        </form>

        {/* Footer */}
        <div className="register-footer">
          <span>Already registered?</span>

          <Link
            to="/login"
            state={{
              redirectTo: location.state?.redirectTo,
            }}
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}

