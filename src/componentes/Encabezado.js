import React from 'react'
import './Encabezado.css';
import { Link } from 'react-router-dom';

function Encabezado() {
  return (
    <div className="encabezado-container">
        <div className="hero-section">
          <video src=".\img\videoencabezado2.mp4" autoPlay loop muted></video>
          <div className="overlay">
          <div className="elementos-hero">
            <h1>Gestionar tus gastos nunca fue tan fácil</h1>
            <p>Consectetur, adipisicing elit. Voluptatem, nostrum sint? Dolores explicabo aliquam ullam beatae libero aliquid. Atque cumque qui commodi delectus nemo dolor enim et, quas fugiat quos?</p>
            <div className="botones">
              <Link to='/ingresar' className='boton'>
                Iniciar sesión
              </Link>
              <Link to='/registrarse' className='boton'>
                Registrarse
              </Link>
            </div>
          </div>
          </div>
        </div>
        
    </div>
  )
}

export default Encabezado


/* Implementar las pantallas de registro e inicio de sesión */