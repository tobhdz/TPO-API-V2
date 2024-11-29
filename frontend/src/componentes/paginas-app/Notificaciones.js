import React, { useState, useEffect } from 'react';
import './Notificaciones.css';
import Notificacion from '../Notificacion.js';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState({
    hoy: [],
    estaSemana: [],
    anterior: []
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNotificaciones = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay sesión activa');
          setCargando(false);
          return;
        }

        const response = await fetch('http://localhost:4000/api/notificaciones', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener notificaciones');
        }

        const data = await response.json();
        setNotificaciones(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar las notificaciones');
      } finally {
        setCargando(false);
      }
    };

    obtenerNotificaciones();
  }, []);

  const renderSeccion = (titulo, notificacionesLista) => {
    if (notificacionesLista.length === 0) return null;

    return (
      <div className="seccion-notificaciones">
        <h2>{titulo}</h2>
        <div className="box-notificaciones">
          {notificacionesLista.map(notificacion => (
            <Notificacion
              key={notificacion.NotificacionId}
              titlenotif={`Notificación #${notificacion.NotificacionId}`}
              infonotif={notificacion.Mensaje}
              fecha={new Date(notificacion.FechaNotificacion).toLocaleDateString()}
            />
          ))}
        </div>
      </div>
    );
  };

  if (cargando) {
    return (
      <div className="notificaciones-container">
        <h1>Notificaciones</h1>
        <div className="cargando">Cargando notificaciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notificaciones-container">
        <h1>Notificaciones</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="notificaciones-container">
      <h1>Notificaciones</h1>
      {renderSeccion('Hoy', notificaciones.hoy)}
      {renderSeccion('Esta semana', notificaciones.estaSemana)}
      {renderSeccion('Anterior', notificaciones.anterior)}
    </div>
  );
}

export default Notificaciones;