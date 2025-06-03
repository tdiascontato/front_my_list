import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles/register.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== repeatPassword) {
      setError('As senhas não conferem.');
      return;
    }
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError('Não foi possível registrar. Tente outro email.');
    }
  };

  return (
    <div className={styles.container}>
      <img src="/leeds.png" alt="Logo" className={styles.logo} />
      <div className={styles.title}>Criar Conta no My List</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" style={{ marginTop: '1rem' }}>Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="repeat-password" style={{ marginTop: '1rem' }}>Repetir Senha:</label>
        <input
          id="repeat-password"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit">Registrar</button>
      </form>
      <p className={styles.link}>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}
