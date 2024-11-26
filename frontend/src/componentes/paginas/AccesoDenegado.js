import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './AccesoDenegado.css';
import Boton from '../Boton';

export default function AccesoDenegado() {
    return (
        <div className="acceso-denegado-container">
            <FontAwesomeIcon icon={faLock} className="icono-lock" />
            <h1>Acceso Denegado</h1>
            <p>Necesitas iniciar sesión para ver esta página</p>
            <Boton className="boton2" type="button" title="Iniciar sesión" link="/ingresar" />
        </div>
    );
} 