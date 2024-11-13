import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { getConnection } from './database/connection.js';

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON
app.use('/api/users', userRoutes); // Usar las rutas de usuario

app.listen(4000, () => console.log('Servidor corriendo en el puerto 4000'));
getConnection();
