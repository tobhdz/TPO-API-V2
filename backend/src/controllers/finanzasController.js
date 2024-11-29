import pkg from 'mssql';
const { Int } = pkg;
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