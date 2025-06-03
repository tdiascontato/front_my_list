import styles from './styles/header.module.css';
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
    <header className={styles.header + " container"}>
      <h1>Bem vindo, <span style={{ color: '#f59d2a' }}>{name}</span>!</h1>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
