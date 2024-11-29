import express from 'express';
import { obtenerFinanzas, pagarDeuda } from '../controllers/finanzasController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, obtenerFinanzas);
router.post('/pagar', authMiddleware, pagarDeuda);

export default router; 