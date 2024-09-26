import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';

function Seguridad() {
  return (
    <div className="seguridad-container">
      <div className="field">
        <label>Contraseña:</label>
        <span>********</span>
        <button className="boton">Cambiar contraseña</button>
      </div>

      <button className="danger-button">
        <FontAwesomeIcon icon={faTrash} /> Eliminar cuenta
      </button>
    </div>
  );
}

export default Seguridad;
