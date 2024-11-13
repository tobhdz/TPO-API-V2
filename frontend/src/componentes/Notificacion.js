import React from 'react';
import './Notificacion.css';

// Falta prop de link, añadir cuando veamos como manejar las notificaciones

function Notificacion({ titlenotif, infonotif }) {

  // Texto de placeholder
  const textoTitulo = "Prueba notificación";
  const textoInfo = "Te llegó una notificación, texto de prueba para una notificación.";

  return (
    <div className="notificacion">
      <h3>{titlenotif || textoTitulo}</h3>
      <p>{infonotif || textoInfo}</p>
    </div>
  );
}

export default Notificacion;