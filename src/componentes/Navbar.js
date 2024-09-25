import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar({ links }) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className='nav-logo'>
                        <img src="./img/logosimple.png" alt="logo" />
                        <div className="logo-titulo">Sharebill</div>
                    </Link>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        {links.map((item, index) => (
                            <li key={index} className="nav-item">
                                <Link to={item.path} className='nav-links' onClick={closeMobileMenu}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
