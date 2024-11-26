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
    .query(`INSERT INTO Usuarios (Nombre, Apellido, Usuario, Correo, Contraseña) 
            VALUES (@Nombre, @Apellido, @Usuario, @Correo, @Contraseña);
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
