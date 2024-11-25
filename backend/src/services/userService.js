import bcrypt from 'bcrypt';
import { getConnection } from '../database/connection.js';

//CAMBIAR NOMBRE DE CAMPOS DE CONSULTA DE ACUERDO A LOS Q SE ENCUENTRAN EN LA BD


 const createUser = async ({ nombre, apellido, usuario, correo, contraseña }) => {
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

 const getUserById= async(id)=>{
  try{
    if(!id) throw new Error('ID obligatorio')

    const pool= await getConnection();
    const result=await pool.request()
      .input('Id', id)    //.input metodo mssql
      .query('SELECT Id, Nombre, Apellido, Usuario, Correo FROM Usuarios WHERE Id=@Id')

    if (result.recordset.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    return result.recordset[0];

  }catch(error){
    //console.error('Error buscando el usuario:', error.message);
    throw new Error('No se pudo buscar el usuario');
  }
    
}

 const getAllUsers= async()=>{
  try{
    const pool= await getConnection();
    const result= await pool.request()
      .query('SELECT Id, Nombre, Apellido, Usuario, Correo FROM Usuarios')

    return result.recordset;

  }catch (error){
    //console.error('Error obteniendo todos los usuarios:', error.message);
    throw new Error('No se pudieron obtener los usuarios');
  }
}

 const updateUser= async(id, {nombre, apellido, usuario, correo}) => {
  try{

    if(!id) throw Error('ID obligatorio')
    
    if(!nombre || !apellido || !usuario || !correo){
      throw new Error('Nada que actualizar')
    }

    const pool=await getConnection();
    const result= await pool.request()
      .input('Id', id)
      .input('Nombre', nombre)
      .input('Apellido', apellido)
      .input('Usuario', usuario)
      .input('Correo', correo)
      .query(`UPDATE Usuarios 
              SET 
                Nombre=ISNULL(@Nombre, Nombre)
                Apellido = ISNULL(@Apellido, Apellido), 
                Usuario = ISNULL(@Usuario, Usuario), 
                Correo = ISNULL(@Correo, Correo) 
              WHERE Id = @Id`)

    return { message: 'Usuario actualizado correctamente' };

  }catch(error){
      //console.error('Error actualizando el usuario', error.message)
      throw new Error('No se pudo actualizar el usuario')
  }
}


 const deleteUser = async (id) => {
  try {
      if (!id) throw new Error('El ID es obligatorio');

      const pool = await getConnection();
      const result = await pool.request()
          .input('Id', id)
          .query('DELETE FROM Usuarios WHERE Id = @Id');

      if (result.rowsAffected[0] === 0) {
          throw new Error('Usuario no encontrado');
      }

      return { message: 'Usuario eliminado correctamente' };
  } catch (error) {
      //console.error('Error eliminando el usuario:', error.message);
      throw new Error('No se pudo eliminar el usuario');
  }
};


export default{
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
}