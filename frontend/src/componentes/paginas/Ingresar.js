import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Ingresar.css';
import { UserContext } from "../../contexto/UserContext";
import mockUser from "../../user/mockUser";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);
    const navigate = useNavigate();

    const { login } = useContext(UserContext);

    const handleSubmit = (e) => {
      e.preventDefault();

      // Verificación de credenciales
      if (user === mockUser.user && password === mockUser.password) {
        // Pasa toda la información del mockUser
        login({
          user: mockUser.user,
          name: mockUser.name,
          email: mockUser.email,
          balance: mockUser.balance,
          gastos: mockUser.gastos,
          password: mockUser.password,
        });
        navigate("/app");  // Redirigir a la página /app
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