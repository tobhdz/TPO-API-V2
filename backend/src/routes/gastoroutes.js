import express from 'express';
import { crearGasto, eliminarGasto } from '../controllers/gastoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crearGasto);
router.delete('/:id', authMiddleware, eliminarGasto);

export default router; 