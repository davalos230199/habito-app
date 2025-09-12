import express from 'express';
import supabase from '../config/supabase.js';

const router = express.Router();

// GET /api/tips
// GET /api/tips?category=Salud%20Física
// Objetivo: Obtener todos los tips o filtrarlos por categoría.
router.get('/', async (req, res) => {
    try {
        const { category } = req.query; // Obtenemos la categoría de la URL, si existe.

        let query = supabase.from('tips').select('*');

        // Si el cliente nos pasó una categoría, añadimos un filtro a la consulta.
        if (category) {
            query = query.eq('related_category', category);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.status(200).json(data);

    } catch (error) {
        console.error('Error al obtener tips:', error.message);
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

export default router;