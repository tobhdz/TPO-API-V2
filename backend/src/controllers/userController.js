import { use } from 'react';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from '../services/userService.js';

const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, usuario, correo, contraseña } = req.body;
    const newUser = await createUser({ nombre, apellido, usuario, correo, contraseña });
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};


const getUsers= async (req, res)=>{
  try{

    const users= await getAllUsers();
    res.status(200).json(users);

  }catch (error){
    res.status(500).json({
      message: err.message
  });
  }
}

const getUserById= async (req, res)=>{
  const {id}= req.params;
  try{

    const user = await getUserById(Number(id));
    if(!user){
      res.status(404).json({message:'Usuario no encontrado'})
    }
    res.status(200).json(user);

  }catch (error){
    res.status(500).json({
      message: error.message
  });
  }
  
}

const updateUser= async(req, res)=>{
  try{
    
    const {id, nombre, apellido, usuario, correo}= req.params;
    const updatedUser= await updateUser(Number(id), nombre, apellido, usuario, correo);

    if(!updatedUser){res.status(404).json({message: 'Usuario no encontrado'})}

    res.status(200).json({message: updatedUser});

  }catch (error){
    res.status(500).json(
      {message: error.message}
    )
  }
}

const deleteUser= async (req, res)=>{
  try{

    const {id}= req.params;
    const deletedUser= await deleteUser(Number(id));

    if(!deletedUser) res.status(404).json({message: 'Usuario no encotnrado'});

    res.status(200).json({message:deletedUser});
  }catch(error){
    res.status(500).json({
      message: error.message
    })
  }
}

export default{
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}
