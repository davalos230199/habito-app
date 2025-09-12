// /src/pages/HomePage.jsx

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Onboarding from '../components/Onboarding'; // <-- 1. Importa el nuevo componente
import apiClient from '../api';

function HomePage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Creamos una función para buscar los datos, envuelta en useCallback para optimización.
  const fetchGoals = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/goals?user_id=${user.id}`);
        if (Array.isArray(response.data)) {
          setGoals(response.data);
        } else {
          setError('Los datos recibidos no tienen el formato esperado.');
        }
      } catch (err) {
        setError('No se pudieron cargar las metas.');
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  // 3. El useEffect ahora solo llama a fetchGoals.
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  if (loading) {
    return <p>Cargando tu plan...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const handleToggleGoal = async (goalId, currentStatus) => {
  // 1. Actualización Optimista: Cambiamos el estado local inmediatamente.
  setGoals(currentGoals => 
    currentGoals.map(goal => 
      goal.id === goalId ? { ...goal, completed: !currentStatus } : goal
    )
  );

  // 2. Llamada a la API: Informamos al backend del cambio.
  try {
    await axios.put(`/api/goals/${goalId}`, {
      completed: !currentStatus,
    });
  } catch (err) {
    // 3. Rollback: Si la API falla, revertimos el cambio en la UI y mostramos un error.
    console.error("Error al actualizar la meta:", err);
    alert("No se pudo guardar el cambio, por favor intenta de nuevo.");
    setGoals(currentGoals => 
      currentGoals.map(goal => 
        goal.id === goalId ? { ...goal, completed: currentStatus } : goal // Revertimos al estado original
      )
    );
  }
};

  // --- 4. LA LÓGICA PRINCIPAL ---
  // Si no hay metas, muestra el Onboarding. Si hay, muestra la lista.
  return (
    <div>
      {goals.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Metas para Hoy</h2>
 <ul className="space-y-3">
  {goals.map((goal) => (
    <li key={goal.id} className="bg-gray-50 p-3 rounded-lg flex items-center transition-all duration-300">
<input 
  type="checkbox" 
  className="mr-4 h-6 w-6 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer"
  checked={goal.completed}
  onChange={() => handleToggleGoal(goal.id, goal.completed)} // <-- ¡LÍNEA AÑADIDA!
/>
      <span className={goal.completed ? 'text-gray-400 line-through' : 'text-gray-800'}>
        {goal.goal_templates.name}
      </span>
    </li>
  ))}
</ul>
        </div>
      ) : (
        // Pasamos la función fetchGoals al componente Onboarding.
        // Cuando el plan se cree, Onboarding llamará a esta función para recargar los datos.
        <Onboarding onPlanCreated={fetchGoals} />
      )}
    </div>
  );
}

export default HomePage;