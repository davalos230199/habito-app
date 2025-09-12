// /src/components/Onboarding.jsx

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Este componente recibe una función 'onPlanCreated' para avisar a su padre cuando el plan se ha creado.
function Onboarding({ onPlanCreated }) {
  const { user } = useAuth();
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const areas = [
    'Salud Física',
    'Enfoque Mental',
    'Equilibrio Emocional',
    'Carrera Profesional'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedArea) {
      setError('Por favor, selecciona un área de enfoque.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Llamamos al "plato especial": el generador de planes.
      await axios.post('/api/plans', {
        user_id: user.id,
        preferences: {
          area: selectedArea,
        },
      });
      // Si todo va bien, llamamos a la función que nos pasó el padre para que sepa que debe recargar los datos.
      onPlanCreated();
    } catch (err) {
      setError('Hubo un error al crear tu plan. Inténtalo de nuevo.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-2">¡Bienvenido a ᚺabito!</h2>
      <p className="text-gray-600 mb-6">Para comenzar, elige un área en la que te gustaría enfocarte.</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {areas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => setSelectedArea(area)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedArea === area
                  ? 'bg-green-500 border-green-500 text-white font-bold shadow-lg'
                  : 'bg-white border-gray-300 hover:border-green-400'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={!selectedArea || loading}
          className="w-full bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? 'Generando tu plan...' : 'Crear Mi Plan'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default Onboarding;