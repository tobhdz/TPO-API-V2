import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import gastoRoutes from './routes/gastoRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import finanzasRoutes from './routes/finanzasRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Verificar variables de entorno críticas
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no está definida en las variables de entorno');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/gastos', gastoRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/finanzas', finanzasRoutes);

// Agregar esta línea para servir archivos estáticos
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log('JWT_SECRET está configurada:', !!process.env.JWT_SECRET);
});
