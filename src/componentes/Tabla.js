import { Link } from 'react-router-dom'
import Boton from './Boton'
import './Tabla.css'
import React, { useContext } from 'react';
import mockUser from '../user/mockUser';
import { UserContext } from '../contexto/UserContext';


export default function Tabla() {

    const { gastos } = useContext(UserContext); // Obtener gastos del contexto

    if (!gastos || gastos.length === 0) {
        return <div className='error'>No hay gastos para mostrar.</div>;  // Mostrar mensaje si no hay gastos
    }

    return(
        <div class="grid-table">
            <div class="header">Nombre del Proyecto</div>
            <div class="header">Valor</div>
            <div class="header">Fecha</div>
            <div class="header">Participantes</div>
            <div class="header">Porcentaje</div>
            <div class="header">Acciones</div>

             {/* Renderizar los gastos */}
            {gastos.map((gasto, index) => (
                <React.Fragment key={index}>
                <div className="cell">{gasto.name}</div>
                <div className="cell">{gasto.monto}</div>
                <div className="cell">{gasto.fechaVencimiento}</div>
                <div className="cell">participantes</div>
                <div className="cell">porcentaje%</div>

                <div className="cell botones">
                    <Link>
                    <Boton className={"tabla-boton"} type={"submit"} title={"Pagar"} />
                    </Link>
                    <Link to="/editargasto">
                    <Boton className={"tabla-boton"} type={"submit"} title={"Editar"} />
                    </Link>
                </div>
                </React.Fragment>
            ))}

        </div>

    )
}