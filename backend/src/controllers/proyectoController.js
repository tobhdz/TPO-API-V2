import { getConnection } from '../database/connection.js';

export const crearProyecto = async (req, res) => {
  const { nombre, descripcion, fechaInicio, participantes } = req.body;
  const creadorId = req.userId;
  
  try {
    const pool = await getConnection();
    const transaction = await pool.transaction();

    try {
      // Insertar el proyecto
      const resultProyecto = await transaction.request()
        .input('nombre', nombre)
        .input('descripcion', descripcion)
        .input('fechaInicio', fechaInicio)
        .input('creadorId', creadorId)
        .query(`
          INSERT INTO Proyectos (projectName, descripcion, fechaInicio, usuarioId)
          OUTPUT INSERTED.projectId
          VALUES (@nombre, @descripcion, @fechaInicio, @creadorId)
        `);

      const proyectoId = resultProyecto.recordset[0].projectId;

      // Insertar participantes si existen
      if (participantes && participantes.length > 0) {
        for (const participante of participantes) {
          await transaction.request()
            .input('proyectoId', proyectoId)
            .input('usuarioId', creadorId)
            .input('email', participante.email)
            .input('porcentaje', participante.porcentaje)
            .query(`
              INSERT INTO miembrosProyectos (id_proyecto, id_usuario, porcentaje_participacion)
              VALUES (@proyectoId, 
                     (SELECT userId FROM Usuarios WHERE email = @email),
                     @porcentaje)
            `);
        }
      }

      await transaction.commit();
      res.status(201).json({ 
        message: 'Proyecto creado exitosamente',
        proyectoId: proyectoId
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear el proyecto',
      error: error.message 
    });
  }
}; 