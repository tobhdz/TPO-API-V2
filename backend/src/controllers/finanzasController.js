import pkg from 'mssql';
const { Int, Decimal } = pkg;
import { getConnection } from '../database/connection.js';

export const obtenerFinanzas = async (req, res) => {
  const userId = req.userId;

  try {
    const pool = await getConnection();
    
    const result = await pool.request()
      .input('UsuarioId', Int, userId)
      .query(`
        SELECT 
          g.GastoId,
          g.Nombre,
          g.Descripcion,
          g.Fecha,
          g.MontoTotal,
          p.Nombre as NombreProyecto,
          ua.Nombre as AcreedorNombre,
          ua.Apellido as AcreedorApellido,
          pg.PorcentajeDeuda,
          ed.Estado as EstadoDeuda,
          ed.FechaSaldado
        FROM Gastos g
        JOIN Proyectos p ON g.ProyectoId = p.ProyectoId
        JOIN Usuarios ua ON g.AcreedorId = ua.Id
        JOIN ParticipantesGasto pg ON g.GastoId = pg.GastoId
        JOIN EstadoDeudas ed ON g.GastoId = ed.GastoId AND ed.UsuarioId = pg.UsuarioId
        WHERE pg.UsuarioId = @UsuarioId
        ORDER BY g.Fecha DESC, g.GastoId DESC
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener finanzas:', error);
    res.status(500).json({ 
      message: 'Error al obtener las finanzas',
      error: error.message 
    });
  }
};

export const pagarDeuda = async (req, res) => {
  const userId = req.userId;
  const { gastoId } = req.body;

  try {
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Obtener información del gasto y usuario
      const result = await transaction.request()
        .input('GastoId', Int, gastoId)
        .input('UsuarioId', Int, userId)
        .query(`
          SELECT 
            u.Balance,
            g.MontoTotal,
            pg.PorcentajeDeuda
          FROM Usuarios u
          JOIN ParticipantesGasto pg ON pg.UsuarioId = u.Id
          JOIN Gastos g ON g.GastoId = pg.GastoId
          WHERE u.Id = @UsuarioId AND g.GastoId = @GastoId
        `);

      if (result.recordset.length === 0) {
        throw new Error('Gasto no encontrado');
      }

      const { Balance, MontoTotal, PorcentajeDeuda } = result.recordset[0];
      const montoPagar = (MontoTotal * PorcentajeDeuda / 100);

      if (Balance < montoPagar) {
        throw new Error('Saldo insuficiente');
      }

      // Actualizar balance del usuario
      await transaction.request()
        .input('UsuarioId', Int, userId)
        .input('MontoPagar', Decimal(18,2), montoPagar)
        .query(`
          UPDATE Usuarios 
          SET Balance = Balance - @MontoPagar
          WHERE Id = @UsuarioId
        `);

      // Actualizar estado de la deuda
      await transaction.request()
        .input('GastoId', Int, gastoId)
        .input('UsuarioId', Int, userId)
        .query(`
          UPDATE EstadoDeudas
          SET Estado = 1, FechaSaldado = GETDATE()
          WHERE GastoId = @GastoId AND UsuarioId = @UsuarioId
        `);

      await transaction.commit();
      res.json({ 
        message: 'Pago realizado exitosamente',
        nuevoBalance: Balance - montoPagar
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ 
      message: error.message || 'Error al procesar el pago'
    });
  }
}; 