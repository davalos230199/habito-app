// /src/App.jsx

import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // <-- NUEVA
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* Rutas Protegidas que usan el Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          {/* Aquí irán las futuras páginas internas: /plan, /perfil, etc. */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;