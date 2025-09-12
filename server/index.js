import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import profilesRouter from './routes/profiles.js'
import goalsRouter from './routes/goals.js';
import tipsRouter from './routes/tips.js';
import plansRouter from './routes/plans.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite al servidor entender JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('El sistema nervioso de ᚺabito está en línea.');
});

// --- CONECTAMOS EL ROUTER DE PERFILES ---
// Le decimos a Express que todas las rutas que empiecen con '/api/profiles'
// deben ser manejadas por nuestro 'profilesRouter'.
app.use('/api/profiles', profilesRouter);
app.use('/api/goals', goalsRouter); // Para todo lo que empiece con /api/goals
app.use('/api/tips', tipsRouter);
app.use('/api/plans', plansRouter);   // Para todo lo que empiece con /api/tips

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});