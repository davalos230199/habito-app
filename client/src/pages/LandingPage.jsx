import React from 'react';
import { useNavigate } from 'react-router-dom';
import habitoLogo from '../assets/habito-app-logo.png'; // Asegúrate de tener un logo o usa el icono

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
      
      {/* Icono / Logo */}
      <div className="mb-8 p-4 bg-zinc-100 rounded-full">
        <img src={habitoLogo} alt="Habito Logo" className="w-24 h-24" />
      </div>

      {/* Título Impactante */}
      <h1 className="text-4xl font-bold text-stone-800 mb-4 tracking-tight">
        ᚺabito
      </h1>

      {/* Subtítulo / Promesa */}
      <p className="text-lg text-stone-600 mb-12 max-w-xs mx-auto leading-relaxed">
        Tu espacio diario de claridad.<br/>
        Solo tú y tu hábito.
      </p>

      {/* Botón de Acción Principal */}
      <button
        onClick={() => navigate('/home')}
        className="w-full max-w-xs bg-stone-900 text-white py-4 rounded-xl font-medium text-lg shadow-lg hover:bg-stone-800 transition-all transform active:scale-95"
      >
        Comenzar Día 1
      </button>

      {/* Footer sutil */}
      <p className="mt-8 text-xs text-stone-400">
        Versión Beta | Arquitectura del Ser
      </p>
    </div>
  );
};

export default LandingPage;