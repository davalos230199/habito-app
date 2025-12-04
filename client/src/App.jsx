// /src/App.jsx

import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute'; // Lo guardamos para futuro
import AppLayout from './components/AppLayout';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      {/* 1. La Entrada (Pública) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* 2. La App en sí (Layout VISIBLE para todos) */}
      {/* Sacamos el Layout del ProtectedRoute para que el invitado pueda ver la app */}
      <Route element={<AppLayout />}>
        
        {/* Cambiamos '/dashboard' por '/home' para coincidir con la Landing */}
        <Route path="/home" element={<HomePage />} />
        {/* NUEVA RUTA */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Ruta placeholder para que no de error el botón Plan */}
          <Route path="/plan" element={<div className="p-10 text-center">Próximamente...</div>} />
       </Route>
        
        {/* Aquí puedes agregar más rutas públicas de la app (ej: /recursos) */}

      {/* 3. Zona VIP (Solo si decides proteger algo específico en el futuro) */}
      <Route element={<ProtectedRoute />}>
         {/* Por ahora no metemos nada aquí, o quizás el historial profundo */}
      </Route>

    </Routes>
  );
}

export default App;