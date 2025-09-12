import express from 'express';
import supabase from '../config/supabase.js';
import { add } from 'date-fns'; // Necesitaremos una pequeña ayuda para manejar fechas

const router = express.Router();

// POST /api/plans
// Objetivo: Crear un plan de metas inicial de 30 días para un nuevo usuario.
router.post('/', async (req, res) => {
  try {
    // 1. Recibimos los "ingredientes" del frontend: el ID del usuario y sus preferencias.
    const { user_id, preferences } = req.body;

    // --- Validación ---
    if (!user_id || !preferences || !preferences.area) {
      return res.status(400).json({ error: 'user_id y preferences.area son requeridos.' });
    }

    // 2. Vamos a la "despensa" (Supabase) a buscar plantillas de metas que coincidan con el área elegida.
    const { data: templates, error: templateError } = await supabase
      .from('goal_templates')
      .select('id')
      .eq('category', preferences.area);

    if (templateError) throw templateError;

    if (!templates || templates.length === 0) {
      return res.status(404).json({ error: `No se encontraron plantillas para la categoría: ${preferences.area}` });
    }

    // 3. --- La Lógica de la Receta: Preparar el Plan ---
    const goalsToInsert = [];
    const startDate = new Date(); // Empezamos desde hoy

    for (let i = 0; i < 30; i++) { // Creamos metas para los próximos 30 días
      const targetDate = add(startDate, { days: i }); // Calculamos la fecha para cada día

      // Rotamos entre las plantillas disponibles para dar variedad.
      const template = templates[i % templates.length];

      const newGoal = {
        user_id: user_id,
        template_id: template.id,
        target_date: targetDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      };
      goalsToInsert.push(newGoal);
    }

    // 4. Insertamos todas las nuevas metas en la base de datos de una sola vez (muy eficiente).
    const { error: insertError } = await supabase.from('user_goals').insert(goalsToInsert);

    if (insertError) throw insertError;

    // 5. Enviamos el "plato" terminado: una respuesta de éxito.
    res.status(201).json({ message: `Plan de 30 días creado exitosamente para el usuario ${user_id}. Se crearon ${goalsToInsert.length} metas.` });

  } catch (error) {
    console.error('Error al crear el plan:', error.message);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
  }
});

export default router;