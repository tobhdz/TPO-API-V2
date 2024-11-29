import { createUser } from '../services/userService.js';
import { loginUser } from '../services/userService.js';
import { updateUserInfo } from '../services/userService.js';
import { updatePassword } from '../services/userService.js';
import jwt from 'jsonwebtoken';
import { getConnection } from '../database/connection.js';
import path from 'path';
import fs from 'fs';
import pkg from 'mssql';
const { VarChar, Int } = pkg;

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
    console.log('Intento de login para usuario:', usuario);
    
    const user = await loginUser({ usuario, contraseña });
    console.log('Usuario encontrado:', user.Id);
    
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está definida');
      throw new Error('Error de configuración del servidor');
    }

    const token = jwt.sign(
      { userId: user.Id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({ 
      message: 'Login exitoso',
      user: {
        id: user.Id,
        nombre: user.Nombre,
        apellido: user.Apellido,
        usuario: user.Usuario,
        correo: user.Correo,
        balance: user.Balance
      },
      token: token
    });
  } catch (error) {
    console.error('Error en login:', error);
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

export const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    await updatePassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
      .input('Correo', email)
      .query('SELECT COUNT(*) as count FROM Usuarios WHERE Correo = @Correo');
    
    const exists = result.recordset[0].count > 0;
    res.json({ exists });
  } catch (error) {
    console.error('Error al verificar email:', error);
    res.status(500).json({ message: 'Error al verificar email' });
  }
};

export const updateBalance = async (req, res) => {
  try {
    const userId = req.userId; // Obtenido del middleware de autenticación
    const { monto } = req.body;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('UserId', userId)
      .input('Monto', monto)
      .query(`
        UPDATE Usuarios 
        SET Balance = Balance + @Monto 
        WHERE Id = @UserId;
        SELECT Balance FROM Usuarios WHERE Id = @UserId;
      `);
    
    const nuevoBalance = result.recordset[0].Balance;
    
    res.status(200).json({ 
      message: 'Balance actualizado exitosamente',
      balance: nuevoBalance
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al actualizar el balance', 
      error: error.message 
    });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }

    const userId = req.userId;
    const rutaArchivo = req.file.filename;

    const pool = await getConnection();
    
    // Obtener foto de perfil anterior
    const oldPicResult = await pool.request()
      .input('UserId', Int, userId)
      .query('SELECT FotoPerfil FROM Usuarios WHERE Id = @UserId');
    
    const oldPic = oldPicResult.recordset[0]?.FotoPerfil;

    // Actualizar foto de perfil en la base de datos
    await pool.request()
      .input('UserId', Int, userId)
      .input('FotoPerfil', VarChar(255), rutaArchivo)
      .query(`
        UPDATE Usuarios 
        SET FotoPerfil = @FotoPerfil 
        WHERE Id = @UserId
      `);

    // Eliminar foto anterior si existe
    if (oldPic) {
      const oldPicPath = path.join('uploads', 'pfp', oldPic);
      if (fs.existsSync(oldPicPath)) {
        fs.unlinkSync(oldPicPath);
      }
    }

    res.status(200).json({
      message: 'Foto de perfil actualizada exitosamente',
      fotoPerfil: rutaArchivo
    });
  } catch (error) {
    console.error('Error al actualizar foto de perfil:', error);
    // Si hay error, eliminar la imagen subida
    if (req.file) {
      fs.unlinkSync(path.join('uploads', 'pfp', req.file.filename));
    }
    res.status(500).json({
      message: 'Error al actualizar la foto de perfil',
      error: error.message
    });
  }
};
