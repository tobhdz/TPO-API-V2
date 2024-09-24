import React from 'react'
import './Tarjeta.css';

function Tarjeta({ imageSrc, title, bodyText }) {
    return (
      <div className="tarjeta">
        <img src={imageSrc} alt={title} className="tarjeta-imagen" />
        <div className="tarjeta-contenido">
          <h2 className="tarjeta-titulo">{title}</h2>
          <p className="tarjeta-cuerpo">{bodyText}</p>
        </div>
      </div>
    );
  }
  
  export default Tarjeta;