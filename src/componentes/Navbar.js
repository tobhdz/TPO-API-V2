import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar({links}) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className='nav-logo'>
                        <img src=".\img\logosimple.png" alt="logo" />
                        <div className="logo-titulo">Sharebill</div>
                    </Link>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/sobrenosotros' className='nav-links' onClick={closeMobileMenu}>
                                Sobre nosotros
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/contacto' className='nav-links' onClick={closeMobileMenu}>
                                Contacto
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/ingresar' className='nav-links' onClick={closeMobileMenu}>
                                Ingresar
                            </Link>
                        </li>
                    </ul>
                    <div className="icono-nav" onClick={handleClick}>
                        <FontAwesomeIcon icon={click ? faTimes : faBars} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
