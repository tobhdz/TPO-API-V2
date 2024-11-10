import React from 'react'
import './Notificaciones.css';
import Notificacion from '../Notificacion.js';

function Notificaciones() {
  return (
    <div className="notificaciones-container">
        <h1>Notificaciones</h1>
        <div className="box-notificaciones">
            <Notificacion />
            <Notificacion />
            <Notificacion />
        </div>
    </div>
  )
}

export default Notificaciones