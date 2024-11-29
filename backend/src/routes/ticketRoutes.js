import express from 'express';
import { subirTicket, eliminarTicket } from '../controllers/ticketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('ticket'), subirTicket);
router.delete('/:id', authMiddleware, eliminarTicket);

export default router; 