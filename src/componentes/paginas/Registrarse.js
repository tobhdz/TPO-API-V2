import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Ingresar.css'; // Reciclé la hoja de estilos del login

export default function Registrarse() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "Ingrese un mail válido",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError({ error: false, message: "" });
      console.log("Email correcto");
    } else {
      setError({ error: true, message: "Formato de Email incorrecto" });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
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
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error.error && <span className="error-text">{error.message}</span>}

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
