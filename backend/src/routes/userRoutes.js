import express from 'express';
import { registerUser, login, updateUser, changePassword, checkEmail } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update', authMiddleware, updateUser);
router.post('/change-password', authMiddleware, changePassword);
router.post('/check-email', authMiddleware, checkEmail);

export default router;


