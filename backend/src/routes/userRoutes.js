import express from 'express';
import { registerUser, login, updateUser, changePassword, checkEmail, updateBalance, updateProfilePic } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadProfilePic } from '../middleware/uploadMiddleware.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Crear directorio para fotos de perfil si no existe
const pfpDir = path.join('uploads', 'pfp');
if (!fs.existsSync(pfpDir)) {
  fs.mkdirSync(pfpDir, { recursive: true });
}

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update', authMiddleware, updateUser);
router.post('/change-password', authMiddleware, changePassword);
router.post('/check-email', authMiddleware, checkEmail);
router.put('/update-balance', authMiddleware, updateBalance);
router.post('/update-profile-pic', authMiddleware, uploadProfilePic.single('profilePic'), updateProfilePic);

export default router;


