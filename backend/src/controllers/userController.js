import { createUser } from '../services/userService.js';
import { loginUser } from '../services/userService.js';
import { updateUserInfo } from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, usuario, correo, contraseña } = req.body;
    const newUser = await createUser({ nombre, apellido, usuario, correo, contraseña });
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const user = await loginUser({ usuario, contraseña });
    res.status(200).json({ 
      message: 'Login exitoso',
      user: {
        id: user.Id,
        nombre: user.Nombre,
        apellido: user.Apellido,
        usuario: user.Usuario,
        correo: user.Correo,
        balance: user.Balance
      }
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, nombre, apellido, usuario } = req.body;
    const updatedUser = await updateUserInfo({ id, nombre, apellido, usuario });
    res.status(200).json({ 
      message: 'Usuario actualizado exitosamente',
      user: updatedUser 
    });
  } catch (error) {
    if (error.message === 'El nombre de usuario ya está en uso') {
      res.status(400).json({ 
        message: error.message 
      });
    } else {
      res.status(500).json({ 
        message: 'Error al actualizar usuario', 
        error: error.message 
      });
    }
  }
};
