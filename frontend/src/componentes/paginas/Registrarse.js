import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Ingresar.css';

export default function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = validateEmail(correo);
    const usuarioValid = validateUsuario(usuario);

    if (emailValid && usuarioValid) {
      setError({ error: false, message: "" });

      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido,
          usuario,
          correo,
          contraseña
        }),
      });

      if (response.ok) {
        console.log("Usuario registrado exitosamente");
        navigate('/registrado');
      } else {
        const errorData = await response.json();
        console.error("Error al registrar usuario:", errorData.message);
      }
    } else {
      setError({
        error: true,
        message: emailValid ? "Solo se permiten los símbolos '_' y '.'" : "Formato de email incorrecto.",
      });
    }
  };

  const validateEmail = (correo) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(correo);
  };

  const validateUsuario = (usuario) => {
    const regex = /^[A-Za-z0-9._]+$/;
    return regex.test(usuario) && usuario.length > 0;
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="login-container">
      <div className="login-box reg">
        <form onSubmit={handleSubmit}>
          <div className="login-header">
            <FontAwesomeIcon icon={faUserPlus} />
            <h2>Registro</h2>
          </div>

          <input
            type="text"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Apellido"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

          <input
            type="text"
            placeholder="Usuario"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          {error.error && <span className="error-text">{error.message}</span>}

          <input
            type="email"
            placeholder="Correo"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <div className="password-field">
            <input
              type={visibility ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <button type="button" onClick={handleVisibility} className="toggle-visibility">
              {visibility ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>

          <div className="forgot-password">
            <Link to="/ingresar">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
          <div className="login-botones reg">
            <button type="submit" className="submit-button boton-form">
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
