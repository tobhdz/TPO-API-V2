import React from 'react';
import './Notificacion.css';

function Notificacion({ infonotif, fecha }) {
  return (
    <div className="notificacion">
      <p>{infonotif}</p>
      {fecha && <span className="fecha-notificacion">{fecha}</span>}
    </div>
  );
}

export default Notificacion;