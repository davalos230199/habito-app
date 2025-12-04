// client/src/contexts/DiaContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- MINIMAL LOCAL STORAGE STORE ---
const KEYS = { DIAS: 'sunself_dias', METAS: 'sunself_metas' };

const DiaContext = createContext();

export function DiaProvider({ children }) {
  const [registroDeHoy, setRegistroDeHoy] = useState(null);
  const [metas, setMetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tema visual (para que no falle SlideDeRegistro)
  const theme = {
    headerBg: 'bg-white',
    headerBorder: 'border-stone-200',
    activeIcon: 'text-amber-500'
  };

  const refrescarDia = async () => {
    setIsLoading(true);
    // Simular carga
    setTimeout(() => {
      const todos = JSON.parse(localStorage.getItem(KEYS.DIAS) || '[]');
      const hoy = new Date().toDateString();
      const encontrado = todos.find(d => new Date(d.created_at).toDateString() === hoy);
      
      const misMetas = JSON.parse(localStorage.getItem(KEYS.METAS) || '[]');
      
      setRegistroDeHoy(encontrado || null);
      setMetas(misMetas);
      setIsLoading(false);
    }, 500);
  };

  // Función dummy para guardar (luego la completamos con el formulario)
  const guardarRitual = (datos) => {
    console.log("Guardando en local:", datos);
    // Aquí iría la lógica de guardado real
  };

  useEffect(() => { refrescarDia(); }, []);

  return (
    <DiaContext.Provider value={{ registroDeHoy, metas, isLoading, refrescarDia, guardarRitual, theme }}>
      {children}
    </DiaContext.Provider>
  );
}

export const useDia = () => useContext(DiaContext);