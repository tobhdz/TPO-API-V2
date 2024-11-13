import React, { useState } from 'react';
import './Proyectos.css';
import { Link } from 'react-router-dom';

// no le des bola a esto
const Proyectos = () => {
    // proyectos de ejemplo
    const [proyectos, setProyectos] = useState([
        {
            id: 1,
            titulo: 'Proyecto de Viaje',
            descripcion: 'Organización de los gastos del viaje',
            fechaInicio: '2023-01-15',
            estado: 'Activo'
        },
        {
            id: 2,
            titulo: 'Reparación de Computadora',
            descripcion: 'Dividir el costo de las reparaciones',
            fechaInicio: '2023-02-01',
            estado: 'Finalizado'
        },

    ]);

    if (!proyectos || proyectos.length === 0) {
        return <div className="error">No hay proyectos para mostrar.</div>;
    }

    return (
        <div className="proyectos-container">
            <h1>Proyectos</h1>
            <div className="proyectos-lista">
                {proyectos.map(proyecto => (
                    <Link to={`/proyecto/${proyecto.id}`} key={proyecto.id} className="proyecto-item">
                        <h3>{proyecto.titulo}</h3>
                        <p>{proyecto.descripcion}</p>
                        <p>Inicio: {proyecto.fechaInicio}</p>
                        <p>Estado: {proyecto.estado}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Proyectos;
