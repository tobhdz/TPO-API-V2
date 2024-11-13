import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';
import { UserContext } from '../../contexto/UserContext';
import Boton from '../Boton';
import { useNavigate } from 'react-router-dom';


function Seguridad() {
  const { user, password, updatePassword } = useContext(UserContext);  // Accede a la contraseña del contexto
  const [cambiarContrasena, setCambiarContrasena] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [eliminarCuenta, setEliminarCuenta]=useState(false);
  const navigate=useNavigate();

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

  const handleEliminarCuenta=()=>{
    setEliminarCuenta(false)
    navigate("/");
  }

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

      <button className="danger-button" onClick={()=>setEliminarCuenta(true)}>
        <FontAwesomeIcon icon={faTrash} /> Eliminar cuenta
      </button>
      {eliminarCuenta && (
          <div className="eliminar-cuenta-container" onClick={() => setEliminarCuenta(false)}>
          <div className="eliminar-cuenta-form" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faTimes} onClick={() => setEliminarCuenta(false)} className="cancelar-button"/>
            <p>Está seguro que quiere eliminar su cuenta?</p>
            <Boton type={"button"} title={"Eliminar"} action={handleEliminarCuenta} />
          </div>
        </div>
   
      )}
    </div>
  );
}

export default Seguridad;
