import express from 'express';
import { subirTicket } from '../controllers/ticketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('ticket'), subirTicket);

export default router; 