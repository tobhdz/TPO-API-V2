import express from 'express';
import { crearGasto } from '../controllers/gastoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crearGasto);

export default router; 