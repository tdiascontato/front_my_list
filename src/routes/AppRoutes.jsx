import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

export default function AppRoutes() {
  const { userEmail } = useContext(AuthContext); // troque token por userEmail

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userEmail ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!userEmail ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!userEmail ? <Register /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to={userEmail ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
