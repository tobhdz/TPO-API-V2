import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import './NavbarApp.css';
import { UserContext } from '../contexto/UserContext';  // Importamos el contexto del usuario
import { useAuth } from '../contexto/AuthContext';

export default function NavBarApp({ links }) {
    const [click, setClick] = useState(false);
    const { logout: userLogout } = useContext(UserContext);
    const { logout: authLogout } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const handleLogout = () => {
        authLogout(); // Desactiva la autenticación
        userLogout(); // Limpia los datos del usuario
        navigate("/ingresar");
    };

    return (
        <>
            <nav className="navbarapp">
                <div className="navbarapp-icono-nav" onClick={handleClick}>
                    <FontAwesomeIcon icon={click ? faTimes : faBars} />
                </div>
                <div className={click ? 'navbarapp-container active' : "navbarapp-container"}>
                    <ul className='navbarapp-menu'>
                        {links.map((link, index) => (
                            <li key={index} className="navbarapp-menu-item">
                                <Link to={link.path} className="navbarapp-menu-link" onClick={closeMobileMenu}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                        <li className="navbarapp-menu-item">
                            <button onClick={handleLogout} className="navbarapp-menu-link salir">
                                <><FontAwesomeIcon icon={faDoorOpen} /> Salir</>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}