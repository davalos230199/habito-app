// /src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Le pregunta al "gerente" si hay un usuario

  if (!user) {
    // Si no hay usuario, lo redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si hay usuario, le permite ver el contenido de la página solicitada
  return <Outlet />;
};

export default ProtectedRoute;