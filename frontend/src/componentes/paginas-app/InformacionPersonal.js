import React, { useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Configuracion.css';
import Boton from '../Boton';
import { UserContext } from '../../contexto/UserContext';  // Importa el contexto

function InformacionPersonal() {
  const { name, user, email, updateUser, profileImage, updateProfileImage, userId } = useContext(UserContext);  // Accede a los datos del contexto

  const [editandoNombre, setEditandoNombre] = useState(false);
  const [editandoApellido, setEditandoApellido] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [error, setError] = useState("");
  
  const [nombreActualizado, setNombreActualizado] = useState(name.split(' ')[0]);
  const [apellidoActualizado, setApellidoActualizado] = useState(name.split(' ')[1]);
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

  // Funciones de validación
  const validateUsuario = (usuario) => {
    const regex = /^[A-Za-z0-9._]+$/;
    return regex.test(usuario) && usuario.length > 0;
  };

  const validateNombre = (nombre) => {
    return nombre.length >= 2 && /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(nombre);
  };

  const handleGuardarCambios = async () => {
    try {
      // Validaciones
      if (!validateNombre(nombreActualizado)) {
        setError("El nombre solo puede contener letras y debe tener al menos 2 caracteres");
        return;
      }

      if (!validateNombre(apellidoActualizado)) {
        setError("El apellido solo puede contener letras y debe tener al menos 2 caracteres");
        return;
      }

      if (!validateUsuario(usuarioActualizado)) {
        setError("El usuario solo puede contener letras, números, puntos y guiones bajos");
        return;
      }

      // Si el usuario no ha cambiado, no necesitamos validar si existe
      if (usuarioActualizado === user) {
        setError("");
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError("No hay sesión activa");
        return;
      }

      const response = await fetch('http://localhost:4000/api/users/update', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: userId,
          nombre: nombreActualizado,
          apellido: apellidoActualizado,
          usuario: usuarioActualizado
        })
      });

      const data = await response.json();

      if (response.ok) {
        updateUser({
          newName: `${nombreActualizado} ${apellidoActualizado}`,
          newEmail: email,
          newUser: usuarioActualizado
        });
        setEditandoNombre(false);
        setEditandoApellido(false);
        setEditandoUsuario(false);
        setError("");
      } else {
        setError(data.message);
        if (data.message === 'El nombre de usuario ya está en uso') {
          setUsuarioActualizado(user); // Restaurar el usuario original
        }
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
      // Restaurar valores originales en caso de error
      setUsuarioActualizado(user);
    }
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

      {error && <div className="error-message">{error}</div>}

      <div className="informacion-usuario">
        <div className="campo-editar">
          <p>{email}</p>
        </div>

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
                <Boton type={"button"} title={"Cancelar"} action={() => {
                  setEditandoNombre(false);
                  setNombreActualizado(name.split(' ')[0]);
                  setError("");
                }}/>
              </div>
            </>
          ) : (
            <>
              <p>{name.split(' ')[0]}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={() => setEditandoNombre(true)} />
            </>
          )}
        </div>

        <div className="campo-editar">
          {editandoApellido ? (
            <>
              <input 
                type="text" 
                value={apellidoActualizado} 
                onChange={(e) => setApellidoActualizado(e.target.value)} 
              />
              <div className="botones">
                <Boton type={"button"} title={"Guardar"} action={handleGuardarCambios}/>
                <Boton type={"button"} title={"Cancelar"} action={() => {
                  setEditandoApellido(false);
                  setApellidoActualizado(name.split(' ')[1]);
                  setError("");
                }}/>
              </div>
            </>
          ) : (
            <>
              <p>{name.split(' ')[1]}</p>
              <FontAwesomeIcon icon={faPencilAlt} onClick={() => setEditandoApellido(true)} />
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
                <Boton type={"button"} title={"Cancelar"} action={() => {
                  setEditandoUsuario(false);
                  setUsuarioActualizado(user);
                  setError("");
                }}/>
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
