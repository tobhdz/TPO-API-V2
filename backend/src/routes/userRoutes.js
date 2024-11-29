import express from 'express';
import { registerUser, login, updateUser, changePassword, checkEmail, updateBalance } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update', authMiddleware, updateUser);
router.post('/change-password', authMiddleware, changePassword);
router.post('/check-email', authMiddleware, checkEmail);
router.put('/update-balance', authMiddleware, updateBalance);

export default router;


