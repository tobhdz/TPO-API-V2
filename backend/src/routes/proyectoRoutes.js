import express from 'express';
import { crearProyecto, obtenerProyectosUsuario, actualizarProyecto } from '../controllers/proyectoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crearProyecto);
router.get('/', authMiddleware, obtenerProyectosUsuario);
router.put('/:id', authMiddleware, actualizarProyecto);

export default router; 