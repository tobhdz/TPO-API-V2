import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Ingresar.css';

import { useNavigate } from "react-router-dom";
    export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);

    const navigate = useNavigate();

    const mockUser = {         // Mock para el login. Reemplazar con una simulación de DB basada en JSON
      user: "admin",
      password: "admin",
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    
    if (user === mockUser.user && password === mockUser.password) {     // Envía a la APP si loguea con mock. Idem punto anterior.
      navigate("/app");
    } else {
      alert("Credenciales incorrectas. Por favor, intenta nuevamente.");
    }
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="login-header">
            <icon><FontAwesomeIcon icon={faRightToBracket} /></icon>
            <h2>Iniciar Sesión</h2>
          </div>

            <input
              type="text"
              id="user"
              placeholder="Usuario"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />



            <div className="password-field">
              <input
                type={visibility ? "text" : "password"}
                id="password"
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
            <Link to="/">¿Has olvidado la contraseña?</Link>
          </div>

          <div className="login-botones">
            <button type="submit" className="submit-button boton-form">
              Ingresar
            </button>
            <div className="divisor"></div>
            <button type="button" className="boton-form">
            <Link to="/registrarse">Registrarme</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
