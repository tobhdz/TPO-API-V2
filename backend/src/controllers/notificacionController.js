import pkg from 'mssql';
const { Int } = pkg;
import { getConnection } from '../database/connection.js';

export const obtenerNotificaciones = async (req, res) => {
  const userId = req.userId;

  try {
    const pool = await getConnection();
    
    const result = await pool.request()
      .input('UsuarioId', Int, userId)
      .query(`
        SELECT 
          NotificacionId,
          Mensaje,
          FechaNotificacion,
          CASE 
            WHEN DATEDIFF(HOUR, FechaNotificacion, GETDATE()) < 24 
            THEN 'hoy'
            WHEN DATEDIFF(DAY, FechaNotificacion, GETDATE()) < 7 
            THEN 'esta semana'
            ELSE 'anterior'
          END as Periodo
        FROM Notificaciones
        WHERE UsuarioId = @UsuarioId
        ORDER BY FechaNotificacion DESC
      `);

    const notificaciones = {
      hoy: [],
      estaSemana: [],
      anterior: []
    };

    result.recordset.forEach(notif => {
      switch(notif.Periodo) {
        case 'hoy':
          notificaciones.hoy.push(notif);
          break;
        case 'esta semana':
          notificaciones.estaSemana.push(notif);
          break;
        default:
          notificaciones.anterior.push(notif);
      }
    });

    res.json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ 
      message: 'Error al obtener las notificaciones',
      error: error.message 
    });
  }
}; 