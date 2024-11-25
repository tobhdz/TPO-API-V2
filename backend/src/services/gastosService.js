import { getConnection } from "../database/connection";


const createGasto= async()=>{

}

const getAllGastos= async (idUsuario, idProyecto)=>{
    try{
        
        if(!idUsuario) throw new Error('Usuario obligatorio')

        const pool= await getConnection();
        let query = `
            SELECT g.gastoId, g.descripcion, g.subtotal, g.fecha, g.proyectoId
            FROM Gastos g
            INNER JOIN Proyectos p ON g.proyectoId = p.projectId
            WHERE p.usuarioId = @IdUsuario
        `;

        if (idProyecto) {
            query += ' AND g.proyectoId = @IdProyecto';
        }

        const request = pool.request()
            .input('IdUsuario', idUsuario);

        if (idProyecto) {
            request.input('IdProyecto', idProyecto);
        }

        const result = await request.query(query);

        return result.recordset;

    }catch(error){
        throw new Error();
    }

}

const getGastoById= async(idUsuario, idProyecto, idGasto)=>{
    try{
        if(!idUsuario || !idProyecto) throw new Error('usuario y proyecto son obligatorios');

        const pool= getConnection();
        const result= pool.request()
            //.input('IdUsuario', idUsuario)
            //.input('IdProyecto', idProyecto)   no se si es necesario hacer la busqueda sobre usuarios y proyectos
            .input('IdGasto', idGasto)
            .query(`SELECT gastoId, descripcion, subtotal, fecha, proyectoId
            FROM Gastos 
            WHERE gastoId=@IdGasto`)
        
        if(!result){
            throw new Error('Gasto no encontrado')
        }
        
    }catch(error){
        throw new Error()
    }
}

const updateGasto= async()=>{

}

const deleteGasto= async ()=>{

}

export default{
    createGasto,
    getAllGastos,
    getGastoById,
    updateGasto,
    deleteGasto,
}