import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';

function InformacionPersonal() {
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [nombre, setNombre] = useState('Nombre Completo');
  const [email, setEmail] = useState('correo@ejemplo.com');

  const handleEditarNombre = () => {
    setEditandoNombre(!editandoNombre);
  };

  const handleEditarEmail = () => {
    setEditandoEmail(!editandoEmail);
  };

  return (
    <div className="informacion-personal-container">
      <div className="foto-perfil">
        <img src="/img/defaultuser.png" alt="Foto de perfil" />
        <button className="boton">Cambiar foto</button>
      </div>

      <div className="informacion-usuario">
        <div className="campo-editar">
          {editandoNombre ? (
            <>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
              <button onClick={handleEditarNombre}>Aceptar</button>
              <button onClick={handleEditarNombre}>Cancelar</button>
            </>
          ) : (
            <>
              <p>{nombre}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={handleEditarNombre} />
            </>
          )}
        </div>

        <div className="campo-editar">
          {editandoEmail ? (
            <>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button onClick={handleEditarEmail}>Aceptar</button>
              <button onClick={handleEditarEmail}>Cancelar</button>
            </>
          ) : (
            <>
              <p>{email}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={handleEditarEmail} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InformacionPersonal;
