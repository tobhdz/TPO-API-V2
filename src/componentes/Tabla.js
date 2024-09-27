import './Tabla.css';
import Boton from './Boton';
import React, { useContext } from 'react';
import { UserContext } from '../contexto/UserContext';

export default function Tabla() {
    const { gastos } = useContext(UserContext);

    if (!gastos || gastos.length === 0) {
        return <div className='error'>No hay gastos para mostrar.</div>;
    }

    return (
        <div className="card-gastos-container">
            {gastos.map((gasto, index) => (
                <div className="gasto-card" key={index}>
                    <h3 className="gasto-title">{gasto.name}</h3>
                    <p className="gasto-valor">Monto: ${gasto.monto}</p>
                    <p className="gasto-fecha">Fecha de vencimiento: {gasto.fechaVencimiento}</p>
                    <p className="gasto-participantes">Participantes: participantes</p>
                    <p className="gasto-porcentaje">Porcentaje: porcentaje%</p>
                    <div className="gasto-acciones">
                        <Boton className="boton1" type="button" title="Pagar" />
                        <Boton className="boton1" type="button" title="Editar" link="/editargasto" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Hay que ponerle el link al boton de pagar cuando este la pag