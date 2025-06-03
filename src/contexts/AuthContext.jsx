import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);

  const login = async (email, password) => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const register = async (email, password) => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, { email, password });
    await login(email, password);
  };

  const logout = () => {
    setUserEmail(null);
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
