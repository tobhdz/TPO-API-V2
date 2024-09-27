import React from 'react'
import './Encabezado.css';
import { Link } from 'react-router-dom';

function Encabezado() {
  return (
    <div className="encabezado-container">
        <div className="hero-section">
          <div className="filtro-video">
            <video src=".\img\videoencabezado2.mp4" autoPlay loop muted></video>
          </div>
          <div className="overlay">
          <div className="elementos-hero">
            <h1>Gestionar tus gastos nunca fue tan fácil</h1>
            <p>Descubre una nueva forma de compartir y olvídate de las discusiones y los malentendidos. Con nuestra app, la gestión de gastos compartidos se convierte en una experiencia sin complicaciones. Simplifica el proceso y disfruta de cada momento sin preocupaciones.</p>
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

