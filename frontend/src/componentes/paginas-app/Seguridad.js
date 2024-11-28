import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';
import { UserContext } from '../../contexto/UserContext';
import Boton from '../Boton';
import { useNavigate } from 'react-router-dom';


function Seguridad() {
  const { user, password, updatePassword, userId } = useContext(UserContext);  // Accede a la contraseña del contexto
  const [cambiarContrasena, setCambiarContrasena] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false);
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
  const [eliminarCuenta, setEliminarCuenta]=useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleCambiarContrasena = async () => {
    try {
      // Validaciones
      if (!contrasenaActual || !nuevaContrasena || !confirmarContrasena) {
        setError("Todos los campos son obligatorios");
        return;
      }

      if (nuevaContrasena !== confirmarContrasena) {
        setError("Las contraseñas no coinciden");
        return;
      }

      if (nuevaContrasena.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      const response = await fetch('http://localhost:4000/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          currentPassword: contrasenaActual,
          newPassword: nuevaContrasena
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        updatePassword(nuevaContrasena);
        setCambiarContrasena(false);
        setContrasenaActual('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error al actualizar la contraseña");
      console.error(error);
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
        <div className="cambiar-contrasena-container" onClick={() => {
          setCambiarContrasena(false);
          setError('');
        }}>
          <div className="cambiar-contrasena-form" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faTimes} onClick={() => setCambiarContrasena(false)} className="cancelar-button"/>
            {error && <div className="error-message">{error}</div>}
            <div className="password-field">
              <input
                type={mostrarContrasenaActual ? "text" : "password"}
                placeholder="Contraseña actual"
                value={contrasenaActual}
                onChange={(e) => setContrasenaActual(e.target.value)}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setMostrarContrasenaActual(!mostrarContrasenaActual)}
              >
                <FontAwesomeIcon icon={mostrarContrasenaActual ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="password-field">
              <input
                type={mostrarNuevaContrasena ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setMostrarNuevaContrasena(!mostrarNuevaContrasena)}
              >
                <FontAwesomeIcon icon={mostrarNuevaContrasena ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="password-field">
              <input
                type={mostrarConfirmarContrasena ? "text" : "password"}
                placeholder="Confirmar nueva contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
              >
                <FontAwesomeIcon icon={mostrarConfirmarContrasena ? faEyeSlash : faEye} />
              </button>
            </div>
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
