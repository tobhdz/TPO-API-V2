import pkg from 'mssql';
const { VarChar, Int } = pkg;
import { getConnection } from '../database/connection.js';
import path from 'path';
import fs from 'fs';

export const subirTicket = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo' });
  }

  const { gastoId } = req.body;
  const rutaArchivo = req.file.filename;

  try {
    const pool = await getConnection();
    
    // Verificar que el gasto existe y el usuario tiene permiso
    const verificacion = await pool.request()
      .input('GastoId', Int, gastoId)
      .input('UsuarioId', Int, req.userId)
      .query(`
        SELECT 1 FROM Gastos g
        JOIN ParticipantesGasto pg ON g.GastoId = pg.GastoId
        WHERE g.GastoId = @GastoId AND (g.AcreedorId = @UsuarioId OR pg.UsuarioId = @UsuarioId)
      `);

    if (verificacion.recordset.length === 0) {
      fs.unlinkSync(path.join('uploads', 'tickets', rutaArchivo));
      return res.status(403).json({ message: 'No tienes permiso para añadir tickets a este gasto' });
    }

    // Guardar el ticket en la base de datos
    await pool.request()
      .input('GastoId', Int, gastoId)
      .input('RutaArchivo', VarChar(255), rutaArchivo)
      .query(`
        INSERT INTO TicketsGasto (GastoId, RutaArchivo)
        VALUES (@GastoId, @RutaArchivo)
      `);

    res.status(201).json({ 
      message: 'Ticket subido exitosamente',
      rutaArchivo 
    });
  } catch (error) {
    // Si hay error, eliminar el archivo subido
    fs.unlinkSync(path.join('uploads', 'tickets', rutaArchivo));
    res.status(500).json({ 
      message: 'Error al subir el ticket',
      error: error.message 
    });
  }
};

export const eliminarTicket = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Obtener información del ticket y verificar permisos
      const verificacion = await transaction.request()
        .input('TicketId', Int, id)
        .input('UsuarioId', Int, userId)
        .query(`
          SELECT t.RutaArchivo, t.GastoId 
          FROM TicketsGasto t
          JOIN Gastos g ON t.GastoId = g.GastoId
          LEFT JOIN ParticipantesGasto pg ON g.GastoId = pg.GastoId
          WHERE t.TicketId = @TicketId 
          AND (g.AcreedorId = @UsuarioId OR pg.UsuarioId = @UsuarioId)
        `);

      if (verificacion.recordset.length === 0) {
        throw new Error('No tienes permiso para eliminar este ticket');
      }

      const rutaArchivo = verificacion.recordset[0].RutaArchivo;

      // Eliminar el ticket de la base de datos
      await transaction.request()
        .input('TicketId', Int, id)
        .query(`
          DELETE FROM TicketsGasto
          WHERE TicketId = @TicketId
        `);

      // Eliminar el archivo físico
      const rutaCompleta = path.join('uploads', 'tickets', rutaArchivo);
      if (fs.existsSync(rutaCompleta)) {
        fs.unlinkSync(rutaCompleta);
      }

      await transaction.commit();
      res.json({ message: 'Ticket eliminado exitosamente' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error al eliminar ticket:', error);
    res.status(500).json({ 
      message: 'Error al eliminar el ticket',
      error: error.message 
    });
  }
}; 