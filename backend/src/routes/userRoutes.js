import express from 'express';
import { registerUser, login, updateUser, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update', updateUser);
router.post('/change-password', changePassword);

export default router;


