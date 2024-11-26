import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexto/UserContext';
import { useAuth } from '../../contexto/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Ingresar.css';

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { login: userLogin } = useContext(UserContext);
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:4000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, contraseña })
        });

        const data = await response.json();

        if (response.ok) {
          authLogin();
          userLogin({
            id: data.user.id,
            user: data.user.usuario,
            name: `${data.user.nombre} ${data.user.apellido}`,
            email: data.user.correo,
            balance: 5000,
            gastos: [],
            password: contraseña
          });
          navigate("/app");
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error al intentar iniciar sesión");
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
              <FontAwesomeIcon icon={faRightToBracket} />
              <h2>Iniciar Sesión</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            <input
              type="text"
              placeholder="Usuario"
              require
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
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
                {visibility ? <FontAwesomeIcon icon="fa-eye-slash" /> : <FontAwesomeIcon icon="fa-eye" />}
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