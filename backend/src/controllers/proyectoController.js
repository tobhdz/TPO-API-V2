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

      // Insertar al creador como participante primero
      await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('UsuarioId', Int, creadorId)
        .query(`
          INSERT INTO ParticipantesProyecto (ProyectoId, UsuarioId)
          VALUES (@ProyectoId, @UsuarioId)
        `);

      // Insertar otros participantes si existen
      if (participantes && participantes.length > 0) {
        for (const participante of participantes) {
          // Verificar que el participante no sea el creador
          const userResult = await transaction.request()
            .input('Email', VarChar(100), participante.email)
            .input('UsuarioId', Int, creadorId)
            .query(`
              SELECT Id FROM Usuarios WHERE Correo = @Email AND Id != @UsuarioId
            `);
          
          if (userResult.recordset.length > 0) {
            await transaction.request()
              .input('ProyectoId', Int, proyectoId)
              .input('UsuarioId', Int, userResult.recordset[0].Id)
              .query(`
                INSERT INTO ParticipantesProyecto (ProyectoId, UsuarioId)
                VALUES (@ProyectoId, @UsuarioId)
              `);
          }
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

export const obtenerProyectosUsuario = async (req, res) => {
  const userId = req.userId;
  
  try {
    const pool = await getConnection();
    
    // Obtener proyectos y sus participantes
    const result = await pool.request()
      .input('UsuarioId', Int, userId)
      .query(`
        WITH ProyectosUsuario AS (
          SELECT DISTINCT p.*
          FROM Proyectos p
          LEFT JOIN ParticipantesProyecto pp ON p.ProyectoId = pp.ProyectoId
          WHERE pp.UsuarioId = @UsuarioId OR p.CreadorId = @UsuarioId
        )
        SELECT 
          p.*,
          u.Nombre as CreadorNombre,
          u.Apellido as CreadorApellido,
          (
            SELECT COALESCE(
              (
                SELECT DISTINCT 
                  u2.Id as UsuarioId,
                  u2.Nombre,
                  u2.Apellido,
                  u2.Correo as Email
                FROM ParticipantesProyecto pp2
                JOIN Usuarios u2 ON pp2.UsuarioId = u2.Id
                WHERE pp2.ProyectoId = p.ProyectoId
                FOR JSON PATH
              ), '[]'
            )
          ) as Participantes,
          (
            SELECT COALESCE(
              (
                SELECT 
                  g.GastoId,
                  g.Nombre,
                  g.Descripcion,
                  g.Fecha,
                  g.MontoTotal,
                  g.AcreedorId,
                  ua.Nombre as AcreedorNombre,
                  ua.Apellido as AcreedorApellido,
                  (
                    SELECT COALESCE(
                      (
                        SELECT 
                          pg.UsuarioId,
                          u3.Nombre,
                          u3.Apellido,
                          pg.PorcentajeDeuda,
                          ed.Estado as DeudaSaldada
                        FROM ParticipantesGasto pg
                        JOIN Usuarios u3 ON pg.UsuarioId = u3.Id
                        LEFT JOIN EstadoDeudas ed ON ed.GastoId = g.GastoId AND ed.UsuarioId = pg.UsuarioId
                        WHERE pg.GastoId = g.GastoId
                        FOR JSON PATH
                      ), '[]'
                    )
                  ) as ParticipantesGasto,
                  (
                    SELECT COALESCE(
                      (
                        SELECT 
                          t.TicketId,
                          t.RutaArchivo
                        FROM TicketsGasto t
                        WHERE t.GastoId = g.GastoId
                        FOR JSON PATH
                      ), '[]'
                    )
                  ) as Tickets
                FROM Gastos g
                JOIN Usuarios ua ON g.AcreedorId = ua.Id
                WHERE g.ProyectoId = p.ProyectoId
                FOR JSON PATH
              ), '[]'
            )
          ) as Gastos
        FROM ProyectosUsuario p
        JOIN Usuarios u ON p.CreadorId = u.Id
        ORDER BY p.FechaInicio DESC
      `);
    
    // Parsear los participantes de JSON string a objeto
    const proyectos = result.recordset.map(proyecto => ({
      ...proyecto,
      Participantes: JSON.parse(proyecto.Participantes || '[]'),
      Gastos: JSON.parse(proyecto.Gastos || '[]')
    }));

    res.json(proyectos);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ 
      message: 'Error al obtener los proyectos',
      error: error.message 
    });
  }
};

export const actualizarProyecto = async (req, res) => {
  const { nombre, descripcion, participantes } = req.body;
  const proyectoId = req.params.id;
  const userId = req.userId;

  try {
    const pool = await getConnection();
    const transaction = new pkg.Transaction(pool);
    await transaction.begin();

    try {
      // Verificar si el usuario es el creador del proyecto
      const verificacion = await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('CreadorId', Int, userId)
        .query(`
          SELECT CreadorId FROM Proyectos 
          WHERE ProyectoId = @ProyectoId AND CreadorId = @CreadorId
        `);

      if (verificacion.recordset.length === 0) {
        throw new Error('No tienes permiso para editar este proyecto');
      }

      // Actualizar información básica del proyecto
      await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .input('Nombre', VarChar(100), nombre)
        .input('Descripcion', VarChar(pkg.MAX), descripcion)
        .query(`
          UPDATE Proyectos 
          SET Nombre = @Nombre, Descripcion = @Descripcion
          WHERE ProyectoId = @ProyectoId
        `);

      // Obtener participantes actuales que no están en gastos
      const participantesActuales = await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .query(`
          SELECT DISTINCT pp.UsuarioId
          FROM ParticipantesProyecto pp
          LEFT JOIN ParticipantesGasto pg ON pp.UsuarioId = pg.UsuarioId
          WHERE pp.ProyectoId = @ProyectoId AND pg.GastoId IS NULL
        `);

      // Eliminar participantes que no están en gastos
      await transaction.request()
        .input('ProyectoId', Int, proyectoId)
        .query(`
          DELETE FROM ParticipantesProyecto 
          WHERE ProyectoId = @ProyectoId 
          AND UsuarioId IN (
            SELECT UsuarioId FROM ParticipantesProyecto 
            WHERE ProyectoId = @ProyectoId 
            AND UsuarioId NOT IN (
              SELECT DISTINCT UsuarioId 
              FROM ParticipantesGasto 
              WHERE GastoId IN (
                SELECT GastoId 
                FROM Gastos 
                WHERE ProyectoId = @ProyectoId
              )
            )
          )
        `);

      // Agregar nuevos participantes
      for (const participante of participantes) {
        const userResult = await transaction.request()
          .input('Email', VarChar(100), participante.email)
          .query(`SELECT Id FROM Usuarios WHERE Correo = @Email`);

        if (userResult.recordset.length > 0) {
          await transaction.request()
            .input('ProyectoId', Int, proyectoId)
            .input('UsuarioId', Int, userResult.recordset[0].Id)
            .query(`
              IF NOT EXISTS (
                SELECT 1 FROM ParticipantesProyecto 
                WHERE ProyectoId = @ProyectoId AND UsuarioId = @UsuarioId
              )
              INSERT INTO ParticipantesProyecto (ProyectoId, UsuarioId)
              VALUES (@ProyectoId, @UsuarioId)
            `);
        }
      }

      await transaction.commit();
      res.json({ message: 'Proyecto actualizado exitosamente' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: error.message || 'Error al actualizar el proyecto' 
    });
  }
}; 