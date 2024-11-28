import express from 'express';
import { crearProyecto } from '../controllers/proyectoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crearProyecto);

export default router; 