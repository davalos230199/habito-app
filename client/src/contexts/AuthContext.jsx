// /src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chequea la sesión activa al cargar la página
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    // Escucha cambios en el estado de autenticación (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Limpia el listener cuando el componente se desmonta
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  // Si aún está cargando la sesión, no mostramos nada para evitar parpadeos
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Un hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};