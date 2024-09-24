import React from 'react'
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="footer-container">

      <div className="footer-bloque">
        <div className="foter-subcontainer">
          <h3>Sobre nosotros</h3>
          <ul>
            <li>¿Qué es Sharebill?</li>
            <li>Testimoniales</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="foter-subcontainer">
          <h3>Contacto</h3>
          <ul>
            <li>Contáctanos</li>
            <li>Soporte</li>
            <li>Newsletter</li>
          </ul>
        </div>
        <div className="foter-subcontainer">
          <h3>Redes sociales</h3>
          <ul>
          <li>
        <FontAwesomeIcon icon={faInstagram} /> Instagram
      </li>
      <li>
        <FontAwesomeIcon icon={faFacebook} /> Facebook
      </li>
      <li>
        <FontAwesomeIcon icon={faYoutube} /> YouTube
      </li>
      <li>
        <FontAwesomeIcon icon={faTwitter} /> Twitter
      </li>
          </ul>
        </div>
      </div>

      <p className='creditos'>UADE 2024. Web diseñada por Tobías Hernández y Melina Rogríguez.</p>
    </div>
  )
}

export default Footer


/* Colocar la idea de marquee */