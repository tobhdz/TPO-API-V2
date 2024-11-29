import pkg from 'mssql';
const { VarChar, Int, DateTime, Decimal } = pkg;
import { getConnection } from '../database/connection.js';

export const crearGasto = async (req, res) => {
  const { proyectoId, nombre, descripcion, montoTotal, fecha, participantes } = req.body;
  const acreedorId = req.userId; // El usuario que crea el gasto es el acreedor

  try {
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Verificar que el usuario es participante del proyecto
      const verificacionParticipante = await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('UsuarioId', Int, acreedorId)
        .query(`
          SELECT 1 FROM ParticipantesProyecto 
          WHERE ProyectoId = @ProyectoId AND UsuarioId = @UsuarioId
        `);

      if (verificacionParticipante.recordset.length === 0) {
        throw new Error('No tienes permiso para crear gastos en este proyecto');
      }

      // Crear el gasto
      const resultGasto = await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('Nombre', VarChar(100), nombre)
        .input('Descripcion', VarChar(pkg.MAX), descripcion)
        .input('Fecha', DateTime, new Date(fecha))
        .input('AcreedorId', Int, acreedorId)
        .input('MontoTotal', Decimal(18,2), montoTotal)
        .query(`
          INSERT INTO Gastos (ProyectoId, Nombre, Descripcion, Fecha, AcreedorId, MontoTotal)
          OUTPUT INSERTED.GastoId
          VALUES (@ProyectoId, @Nombre, @Descripcion, @Fecha, @AcreedorId, @MontoTotal)
        `);

      const gastoId = resultGasto.recordset[0].GastoId;

      // Insertar participantes del gasto
      for (const participante of participantes) {
        await transaction.request()
          .input('GastoId', Int, gastoId)
          .input('UsuarioId', Int, participante.usuarioId)
          .input('PorcentajeDeuda', Decimal(5,2), participante.porcentajeDeuda)
          .query(`
            INSERT INTO ParticipantesGasto (GastoId, UsuarioId, PorcentajeDeuda)
            VALUES (@GastoId, @UsuarioId, @PorcentajeDeuda)
          `);
      }

      await transaction.commit();
      res.status(201).json({ 
        message: 'Gasto creado exitosamente',
        gastoId: gastoId
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error al crear gasto:', error);
    res.status(500).json({ 
      message: 'Error al crear el gasto',
      error: error.message 
    });
  }
}; 