import express from 'express';
import { registerUser, login, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update', updateUser);

export default router;
