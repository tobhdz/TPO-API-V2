import express from 'express';
import { obtenerFinanzas } from '../controllers/finanzasController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, obtenerFinanzas);

export default router; 