import {createGasto, getAllGastos, getGastoById, updateGasto, deleteGasto} from '../services/gastosService';

const getGastos= async(req, res)=>{
    try{

        const {usuario, proyecto}= req.params;
        const gastos= await getAllGastos(Number(usuario), Number(proyecto))

        

    }catch (error){

    }
}