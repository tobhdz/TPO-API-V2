import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavbarApp.css';

export default function NavBarApp({ links }) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
                    </ul>
                </div>
            </nav>
        </>
    );
}