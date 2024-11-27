import bcrypt from 'bcrypt';
import { getConnection } from '../database/connection.js';

export const createUser = async ({ nombre, apellido, usuario, correo, contraseña }) => {
  const hashedPassword = await bcrypt.hash(contraseña, 10); // Encriptación
  const pool = await getConnection();
  const result = await pool.request()
    .input('Nombre', nombre)
    .input('Apellido', apellido)
    .input('Usuario', usuario)
    .input('Correo', correo)
    .input('Contraseña', hashedPassword)
    .input('Balance', 0)
    .query(`INSERT INTO Usuarios (Nombre, Apellido, Usuario, Correo, Contraseña, Balance) 
            VALUES (@Nombre, @Apellido, @Usuario, @Correo, @Contraseña, @Balance);
            SELECT * FROM Usuarios WHERE Id = SCOPE_IDENTITY();`);
  return result.recordset[0];
};

export const loginUser = async ({ usuario, contraseña }) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('Usuario', usuario)
    .query('SELECT * FROM Usuarios WHERE Usuario = @Usuario');
    
  const user = result.recordset[0];
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  const isValidPassword = await bcrypt.compare(contraseña, user.Contraseña);
  
  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }
  
  return user;
};

export const checkUserExists = async (usuario, userId) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('Usuario', usuario)
    .input('UserId', userId)
    .query(`
      SELECT COUNT(*) as count 
      FROM Usuarios 
      WHERE Usuario = @Usuario 
      AND Id != @UserId
    `);
  return result.recordset[0].count > 0;
};

export const updateUserInfo = async ({ id, nombre, apellido, usuario }) => {
  // Verificar si el usuario ya existe
  const userExists = await checkUserExists(usuario, id);
  if (userExists) {
    throw new Error('El nombre de usuario ya está en uso');
  }

  const pool = await getConnection();
  const result = await pool.request()
    .input('Id', id)
    .input('Nombre', nombre)
    .input('Apellido', apellido)
    .input('Usuario', usuario)
    .query(`
      UPDATE Usuarios 
      SET Nombre = @Nombre, 
          Apellido = @Apellido, 
          Usuario = @Usuario 
      WHERE Id = @Id;
      SELECT * FROM Usuarios WHERE Id = @Id;
    `);
  return result.recordset[0];
};

export const updatePassword = async (userId, currentPassword, newPassword) => {
  const pool = await getConnection();
  
  // Obtener contraseña actual del usuario
  const result = await pool.request()
    .input('Id', userId)
    .query('SELECT Contraseña FROM Usuarios WHERE Id = @Id');
    
  const user = result.recordset[0];
  
  // Verificar contraseña actual
  const isValidPassword = await bcrypt.compare(currentPassword, user.Contraseña);
  if (!isValidPassword) {
    throw new Error('La contraseña actual es incorrecta');
  }
  
  // Encriptar nueva contraseña
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
  // Actualizar contraseña
  await pool.request()
    .input('Id', userId)
    .input('Contraseña', hashedNewPassword)
    .query('UPDATE Usuarios SET Contraseña = @Contraseña WHERE Id = @Id');
    
  return true;
};
