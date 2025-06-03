import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { userEmail, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const name = userEmail ? userEmail.split('@')[0] : '';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header container">
      <h1>Bem vindo, <span style={{ color: '#007BFF' }}>{name}</span></h1>
      <button className="logout-btn" onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
}
