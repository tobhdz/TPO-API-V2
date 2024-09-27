import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-bloque">
        <div className="foter-subcontainer">
          <h3>Sobre nosotros</h3>
          <ul>
            <li><Link to="/sobrenosotros#que-es">¿Qué es Sharebill?</Link></li>
            <li><Link to="/sobrenosotros#testimoniales">Testimoniales</Link></li>
            <li><Link to="/sobrenosotros#faqs">FAQs</Link></li>
          </ul>
        </div>
        <div className="foter-subcontainer">
          <h3>Contacto</h3>
          <ul>
            <li><Link to="/contacto">Contáctanos</Link></li>
            <li><Link to="/contacto">Soporte</Link></li>
            <li><Link to="/contacto">Newsletter</Link></li>
          </ul>
        </div>
        <div className="foter-subcontainer">
          <h3>Redes sociales</h3>
          <ul>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} /> YouTube
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="creditos">UADE 2024. Web diseñada por Tobías Hernández y Melina Rodríguez.</p>
    </div>
  );
}

export default Footer;
