import { Link, useNavigate } from 'react-router-dom';
import { usePlayer } from '../hooks/PlayerProvider.jsx';
import '../styles/layout.css'; 

export default function Navbar() {
  const navigate = useNavigate();
  const { player, clearPlayer } = usePlayer();
  const handleLogout = () => {
    clearPlayer();
    navigate('/login');
  };

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#111', borderBottom: '1px solid #333' }}>
      <div className="nav-brand">
        <Link 
          to="/" 
          className="brand" 
          style={{ fontSize: '1.2rem', marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', color: '#fff', textDecoration: 'none' }}
        >
          <span className="brand-mark">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
          Sudo (apt-get) KO
        </Link>
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/leaderboard" style={{ color: '#ccc', textDecoration: 'none' }}>Leaderboard</Link>
        
        {player ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#4dadf7' }}>⚡ {player.name}</span>
            <button onClick={handleLogout} style={{ background: '#e63946', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '4px', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', background: '#4dadf7', padding: '8px 14px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
