import express from 'express';
import { obtenerNotificaciones } from '../controllers/notificacionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, obtenerNotificaciones);

export default router; 