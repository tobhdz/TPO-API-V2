import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';
import Boton from '../Boton';

function InformacionPersonal() {
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [nombre, setNombre] = useState('Nombre Completo');
  const [email, setEmail] = useState('correo@ejemplo.com');
  const [profileImage, setProfileImage] = useState("/img/defaultuser.png");

  const handleEditarNombre = () => {
    setEditandoNombre(!editandoNombre);
  };

  const handleEditarEmail = () => {
    setEditandoEmail(!editandoEmail);
  };

  const fileInputRef = useRef(null); // Referencia para el input

  const handleClick = () => {
      // Simular el clic en el input de tipo file
      fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 
    }
};

  return (
    <div className="informacion-personal-container">
      <div className="foto-perfil">
        <img src="/img/defaultuser.png" alt="Foto de perfil" />
        <Boton className="boton" title={"Cambiar Foto"} action={handleClick}/>
        <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // Asignar referencia al input
                onChange={handleFileChange}
                style={{ display: 'none' }} // Ocultar el input
            />
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
              <Boton type={"button"} title={"Aceptar"} action={handleEditarNombre}/>
              <Boton type={"button"} title={"Cancelar"} action={handleEditarNombre}/>
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
