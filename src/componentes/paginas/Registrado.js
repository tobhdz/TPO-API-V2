import React from 'react';
import { Link } from 'react-router-dom';
import './Registrado.css';
import Boton from '../Boton';

function Registrado() {
  return (
    <div className="registrado-container">
      <h1 className="registrado-title">¡Registro exitoso!</h1>
      <p className="registrado-message">Gracias por registrarte. Ahora puedes acceder a todas las funcionalidades de nuestra aplicación.</p>
      <p className="registrado-info">Explora y comienza a gestionar tus finanzas de manera eficiente.</p>
      <Boton className="boton2" type="button" title="Iniciar sesión" link="/ingresar" />

    </div>
  );
}

export default Registrado;
