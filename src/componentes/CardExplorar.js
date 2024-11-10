import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './CardExplorar.css';

function CardExplorar({ titulo, link, imagen }) {
  return (
    <Link to={link}>
      <div className="cardexplorar-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${imagen})` }}>
        <h3>{titulo}</h3>
        <div className="cardexplorar-icono">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </Link>
  );
}

export default CardExplorar;
