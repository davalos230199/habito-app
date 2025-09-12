import express from 'express';
import supabase from '../config/supabase.js';

const router = express.Router();

// GET /api/goals?user_id=...
// Objetivo: Obtener TODAS las metas de un usuario específico.
router.get('/', async (req, res) => {
  try {
    // Obtenemos el user_id de los parámetros de la URL (ej: /api/goals?user_id=uuid)
    const { user_id } = req.query;

    // Si no nos pasan un user_id, no podemos buscar. Enviamos un error.
    if (!user_id) {
      return res.status(400).json({ error: 'El user_id es requerido.' });
    }

    const { data, error } = await supabase
      .from('user_goals')
      .select(`
        id,
        target_date,
        completed,
        completed_at,
        goal_templates ( name, category )
      `) // Hacemos un "join" para traer también el nombre y categoría de la plantilla.
      .eq('user_id', user_id); // Filtramos por el ID del usuario.

    if (error) throw error;

    res.status(200).json(data);

  } catch (error) {
    console.error('Error al obtener metas del usuario:', error.message);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
  }
});

// PUT /api/goals/:id
// Objetivo: Actualizar una meta (ej: marcarla como completada).
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // El ID de la meta específica a actualizar.
        const { completed } = req.body; // El nuevo estado (ej: true) que viene en el cuerpo de la petición.

        // Validamos que nos hayan enviado el estado 'completed'.
        if (completed === undefined) {
            return res.status(400).json({ error: 'La propiedad "completed" es requerida.' });
        }

        const { data, error } = await supabase
            .from('user_goals')
            .update({ 
                completed: completed,
                completed_at: completed ? new Date() : null // Si se completa, guarda la fecha actual. Si no, la borra.
            })
            .eq('id', id)
            .select() // .select() para que nos devuelva la fila actualizada.
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Meta no encontrada.' });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error('Error al actualizar la meta:', error.message);
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});


export default router;