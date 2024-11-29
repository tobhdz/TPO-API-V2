import pkg from 'mssql';
const { VarChar, Int, DateTime, Decimal } = pkg;
import { getConnection } from '../database/connection.js';

export const crearGasto = async (req, res) => {
  const { proyectoId, nombre, descripcion, montoTotal, fecha, participantes, acreedorId } = req.body;
  const usuarioCreador = req.userId;

  try {
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Verificar que el usuario creador es participante del proyecto
      const verificacionParticipante = await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('UsuarioId', Int, usuarioCreador)
        .query(`
          SELECT 1 FROM ParticipantesProyecto 
          WHERE ProyectoId = @ProyectoId AND UsuarioId = @UsuarioId
        `);

      if (verificacionParticipante.recordset.length === 0) {
        throw new Error('No tienes permiso para crear gastos en este proyecto');
      }

      // Verificar que el acreedor es participante del proyecto
      const verificacionAcreedor = await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('UsuarioId', Int, acreedorId)
        .query(`
          SELECT 1 FROM ParticipantesProyecto 
          WHERE ProyectoId = @ProyectoId AND UsuarioId = @UsuarioId
        `);

      if (verificacionAcreedor.recordset.length === 0) {
        throw new Error('El acreedor debe ser participante del proyecto');
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

      // Insertar participantes del gasto y crear registros en EstadoDeudas
      for (const participante of participantes) {
        await transaction.request()
          .input('GastoId', Int, gastoId)
          .input('UsuarioId', Int, participante.usuarioId)
          .input('PorcentajeDeuda', Decimal(5,2), participante.porcentajeDeuda)
          .input('AcreedorId', Int, acreedorId)
          .query(`
            INSERT INTO ParticipantesGasto (GastoId, UsuarioId, PorcentajeDeuda)
            VALUES (@GastoId, @UsuarioId, @PorcentajeDeuda);

            INSERT INTO EstadoDeudas (GastoId, UsuarioId, Estado, FechaSaldado)
            VALUES (
              @GastoId, 
              @UsuarioId, 
              CASE 
                WHEN @UsuarioId = @AcreedorId THEN 1 
                ELSE 0 
              END,
              CASE 
                WHEN @UsuarioId = @AcreedorId THEN GETDATE() 
                ELSE NULL 
              END
            );
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

export const eliminarGasto = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Verificar que el usuario es el acreedor del gasto
      const verificacionAcreedor = await transaction.request()
        .input('GastoId', Int, id)
        .input('UsuarioId', Int, userId)
        .query(`
          SELECT 1 FROM Gastos 
          WHERE GastoId = @GastoId AND AcreedorId = @UsuarioId
        `);

      if (verificacionAcreedor.recordset.length === 0) {
        throw new Error('No tienes permiso para eliminar este gasto');
      }

      // Primero eliminar los registros de EstadoDeudas
      await transaction.request()
        .input('GastoId', Int, id)
        .query(`
          DELETE FROM EstadoDeudas
          WHERE GastoId = @GastoId
        `);

      // Luego eliminar los registros de ParticipantesGasto
      await transaction.request()
        .input('GastoId', Int, id)
        .query(`
          DELETE FROM ParticipantesGasto
          WHERE GastoId = @GastoId
        `);

      // Luego eliminar el gasto
      await transaction.request()
        .input('GastoId', Int, id)
        .query(`
          DELETE FROM Gastos
          WHERE GastoId = @GastoId
        `);

      await transaction.commit();
      res.json({ message: 'Gasto eliminado exitosamente' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error al eliminar gasto:', error);
    res.status(500).json({ 
      message: 'Error al eliminar el gasto',
      error: error.message 
    });
  }
}; 