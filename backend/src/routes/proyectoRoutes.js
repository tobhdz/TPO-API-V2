import express from 'express';
import { crearProyecto, obtenerProyectosUsuario } from '../controllers/proyectoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crearProyecto);
router.get('/', authMiddleware, obtenerProyectosUsuario);

export default router; 