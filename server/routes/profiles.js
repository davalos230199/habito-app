import express from 'express';
import supabase from '../config/supabase.js'; // Importamos nuestra conexión a Supabase

const router = express.Router();

// DEFINIMOS EL PRIMER ENDPOINT
// GET /api/profiles/
// Objetivo: Obtener todos los perfiles de la base de datos.
router.get('/', async (req, res) => {
  try {
    // Usamos el cliente de Supabase para hacer una consulta
    const { data, error } = await supabase
      .from('profiles') // De la tabla 'profiles'
      .select('*');   // Selecciona todas las columnas

    // Si Supabase devuelve un error, lo lanzamos para que lo capture el catch
    if (error) {
      throw error;
    }

    // Si todo va bien, enviamos los datos con un estado 200 (OK)
    res.status(200).json(data);

  } catch (error) {
    // Si ocurre cualquier error, lo mostramos en la consola del servidor
    console.error('Error al obtener perfiles:', error.message);
    // Y enviamos una respuesta de error al cliente
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
  }
});
// Objetivo: Obtener un perfil específico por su ID.
router.get('/:id', async (req, res) => {
  try {
    // 1. Obtenemos el ID que el cliente nos pasa en la URL.
    const { id } = req.params;

    // 2. Hacemos la consulta a Supabase, pero con un filtro.
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)    // .eq() significa "equals" (igual a). Filtramos la columna 'id' por el valor que recibimos.
      .single();      // .single() nos asegura que devolverá un solo objeto, no un array.

    if (error) {
      // Si hay un error en la consulta, lo lanzamos.
      throw error;
    }
    
    // Si la consulta no devuelve datos (porque el ID no existe), enviamos un error 404.
    if (!data) {
        return res.status(404).json({ error: 'Perfil no encontrado.' });
    }

    // 3. Si encontramos el perfil, lo enviamos de vuelta.
    res.status(200).json(data);

  } catch (error) {
    console.error('Error al obtener perfil por ID:', error.message);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
  }
});
  
// ¡Muy importante! Exportamos el router para poder usarlo en nuestro archivo principal.
export default router;