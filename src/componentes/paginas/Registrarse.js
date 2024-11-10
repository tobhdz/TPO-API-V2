import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Ingresar.css'; // Reciclé la hoja de estilos del login

export default function Registrarse() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [usuario, setUsuario] = useState(""); // Estado para Usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValid = validateEmail(email);
    const usuarioValid = validateUsuario(usuario);

    if (emailValid && usuarioValid) { // Validar email y usuario
      setError({ error: false, message: "" });
      console.log("Email y usuario correctos");
      navigate('/registrado');
    } else {
      // mensajes de error
      setError({
        error: true,
        message: emailValid ? "Solo se permiten los símbolos '_' y '.'" : "Formato de email incorrecto.",
      });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const validateUsuario = (usuario) => {
    const regex = /^[A-Za-z0-9._]+$/; // letras, números, . y _
    return regex.test(usuario) && usuario.length > 0; // validacion
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="login-container">
      <div className="login-box reg">
        <form onSubmit={handleSubmit}>
          <div className="login-header">
            <icon><FontAwesomeIcon icon={faUserPlus} /></icon>
            <h2>Registro</h2>
          </div>

          <input
            type="text"
            placeholder="Nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Apellido"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Usuario" // Cambiado a Usuario
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          {error.error && <span className="error-text">{error.message}</span>}

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type={visibility ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
