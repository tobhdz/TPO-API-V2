import React, { useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';
import Boton from '../Boton';
import { UserContext } from '../../contexto/UserContext';  // Importa el contexto

function InformacionPersonal() {
  const { name, user, email, updateUser, profileImage, updateProfileImage } = useContext(UserContext);  // Accede a los datos del contexto

  const [editandoNombre, setEditandoNombre] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  
  const [nombreActualizado, setNombreActualizado] = useState(name);
  const [emailActualizado, setEmailActualizado] = useState(email);
  const [usuarioActualizado, setUsuarioActualizado] = useState(user);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateProfileImage(imageUrl); // Actualiza la imagen de perfil globalmente
    }
  };

  const handleGuardarCambios = () => {
    updateUser({
      newName: nombreActualizado, 
      newEmail: emailActualizado, 
      newUser: usuarioActualizado 
    }); // Actualiza nombre, email y usuario
    setEditandoNombre(false);
    setEditandoEmail(false);
    setEditandoUsuario(false);
  };

  return (
    <div className="informacion-personal-container">
      <div className="foto-perfil">
        <img src={profileImage} alt="Foto de perfil" />
        <Boton className="boton" title={"Cambiar Foto"} action={handleClick}/>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="informacion-usuario">
        <div className="campo-editar">
          {editandoNombre ? (
            <>
              <input 
                type="text" 
                value={nombreActualizado} 
                onChange={(e) => setNombreActualizado(e.target.value)} 
              />
              <div className="botones">
                <Boton type={"button"} title={"Guardar"} action={handleGuardarCambios}/>
                <Boton type={"button"} title={"Cancelar"} action={() => setEditandoNombre(false)}/>
              </div>
            </>
          ) : (
            <>
              <p>{name}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={() => setEditandoNombre(true)} />
            </>
          )}
        </div>

        <div className="campo-editar">
          {editandoEmail ? (
            <>
              <input 
                type="email" 
                value={emailActualizado} 
                onChange={(e) => setEmailActualizado(e.target.value)} 
              />
              <Boton type={"button"} title={"Guardar"} action={handleGuardarCambios}/>
              <Boton type={"button"} title={"Cancelar"} action={() => setEditandoEmail(false)}/>
            </>
          ) : (
            <>
              <p>{email}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={() => setEditandoEmail(true)} />
            </>
          )}
        </div>

        <div className="campo-editar">
          {editandoUsuario ? (
            <>
              <input 
                type="text" 
                value={usuarioActualizado} 
                onChange={(e) => setUsuarioActualizado(e.target.value)} 
              />
              <div className="botones">
                <Boton type={"button"} title={"Guardar"} action={handleGuardarCambios}/>
                <Boton type={"button"} title={"Cancelar"} action={() => setEditandoUsuario(false)}/>
              </div>
            </>
          ) : (
            <>
              <p>{user}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={() => setEditandoUsuario(true)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InformacionPersonal;
