import pkg from 'mssql';
const { VarChar, Int, DateTime, Bit } = pkg;
import { getConnection } from '../database/connection.js';

export const crearProyecto = async (req, res) => {
  const { nombre, descripcion, fechaInicio, participantes } = req.body;
  const creadorId = req.userId;
  
  try {
    console.log('Datos recibidos:', { nombre, descripcion, fechaInicio, participantes, creadorId });
    
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Insertar el proyecto sin especificar ProyectoId (será generado automáticamente)
      const resultProyecto = await transaction.request()
        .input('Nombre', VarChar(100), nombre)
        .input('Descripcion', VarChar(pkg.MAX), descripcion)
        .input('FechaInicio', DateTime, new Date(fechaInicio))
        .input('CreadorId', Int, creadorId)
        .input('Estado', Bit, 1)
        .query(`
          INSERT INTO Proyectos (Nombre, Descripcion, FechaInicio, CreadorId, Estado)
          OUTPUT INSERTED.ProyectoId
          VALUES (@Nombre, @Descripcion, @FechaInicio, @CreadorId, @Estado)
        `);

      const proyectoId = resultProyecto.recordset[0].ProyectoId;
      console.log('Proyecto creado con ID:', proyectoId);

      // Insertar participantes si existen
      if (participantes && participantes.length > 0) {
        for (const participante of participantes) {
          console.log('Insertando participante:', participante.email);
          await transaction.request()
            .input('ProyectoId', Int, proyectoId)
            .input('Email', VarChar(100), participante.email)
            .query(`
              INSERT INTO ParticipantesProyecto (ProyectoId, UsuarioId)
              SELECT @ProyectoId, Id
              FROM Usuarios 
              WHERE Correo = @Email
            `);
        }
      }

      await transaction.commit();
      res.status(201).json({ 
        message: 'Proyecto creado exitosamente',
        proyectoId: proyectoId
      });
    } catch (error) {
      console.error('Error en la transacción:', error);
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ 
      message: 'Error al crear el proyecto',
      error: error.message,
      stack: error.stack
    });
  }
}; 