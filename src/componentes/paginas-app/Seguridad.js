import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';
import { UserContext } from '../../contexto/UserContext';
import Boton from '../Boton';

function Seguridad() {
  const { user, password, updatePassword } = useContext(UserContext);  // Accede a la contraseña del contexto
  const [cambiarContrasena, setCambiarContrasena] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleCambiarContrasena = () => {
    if (contrasenaActual !== password) {
      alert("La contraseña actual es incorrecta.");
    } else if (nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
    } else {
      updatePassword(nuevaContrasena);
      setCambiarContrasena(false);
      alert("Contraseña actualizada exitosamente.");
    }
  };

  return (
    <div className="seguridad-container">
      <div className="field">
        <label>Contraseña:</label>
        <span onClick={() => user && setMostrarContrasena(!mostrarContrasena)}>
          {mostrarContrasena && user ? password : '********'}
        </span>
        <button className="boton" onClick={() => setCambiarContrasena(true)}>Cambiar contraseña</button>
      </div>

      {cambiarContrasena && (
        <div className="cambiar-contrasena-container" onClick={() => setCambiarContrasena(false)}>
          <div className="cambiar-contrasena-form" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faTimes} onClick={() => setCambiarContrasena(false)} className="cancelar-button"/>
            <input
              type="password"
              placeholder="Contraseña actual"
              value={contrasenaActual}
              onChange={(e) => setContrasenaActual(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
            <Boton type={"button"} title={"Guardar"} action={handleCambiarContrasena} />
          </div>
        </div>
      )}

      <button className="danger-button">
        <FontAwesomeIcon icon={faTrash} /> Eliminar cuenta
      </button>
    </div>
  );
}

export default Seguridad;
