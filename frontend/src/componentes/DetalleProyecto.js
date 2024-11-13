import React, { useState } from 'react';
import './DetalleProyecto.css';

const DetalleProyecto = ({ proyecto, onEditar, onEliminar, onAgregarGasto }) => {
    const [desglose, setDesglose] = useState(false);

    const toggleDesglose = () => setDesglose(!desglose);

    return (
        <div className="detalle-proyecto">
            <h2>{proyecto.titulo}</h2>
            <p>{proyecto.descripcion}</p>
            <p>Inicio: {proyecto.fechaInicio}</p>
            <p>Estado: {proyecto.estado}</p>

            <div className="botonera">
                <button onClick={onEditar}>Editar</button>
                <button onClick={onEliminar}>Eliminar</button>
            </div>

            <h3>Participantes</h3>
            <ul>
                {proyecto.participantes.map(participante => (
                    <li key={participante.email}>
                        <p>{participante.nombre} {proyecto.creador === participante.email && '(Dueño del proyecto)'}</p>
                        <p>Email: {participante.email}</p>
                        <p>Monto a pagar: ${participante.monto}</p>
                        <button onClick={toggleDesglose}>Ver desglose de gastos</button>
                        {desglose && (
                            <div className="desglose">
                                {/* Mostrar el desglose de los gastos */}
                                {participante.gastos.map(gasto => (
                                    <div key={gasto.id}>
                                        <p>{gasto.subtitulo}</p>
                                        <p>Monto: ${gasto.monto}</p>
                                        <p>Porcentaje: {gasto.porcentaje}%</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={onAgregarGasto} className="boton-agregar-gasto">Añadir gasto</button>
        </div>
    );
};

export default DetalleProyecto;
