import { createUser } from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, usuario, correo, contraseña } = req.body;
    const newUser = await createUser({ nombre, apellido, usuario, correo, contraseña });
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};
