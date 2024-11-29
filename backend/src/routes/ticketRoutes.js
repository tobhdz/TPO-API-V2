import express from 'express';
import { subirTicket, eliminarTicket } from '../controllers/ticketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const ticketsDir = path.join('uploads', 'tickets');
if (!fs.existsSync(ticketsDir)) {
  fs.mkdirSync(ticketsDir, { recursive: true });
}

router.post('/upload', authMiddleware, upload.single('ticket'), subirTicket);
router.delete('/:id', authMiddleware, eliminarTicket);

export default router; 