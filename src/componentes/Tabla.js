import './Tabla.css';
import Boton from './Boton';
import React, { useContext, useState } from 'react';
import { UserContext } from '../contexto/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Tabla() {
    const {user,balance, gastos, updateBalance , removeGasto} = useContext(UserContext);
    const [pagar, setPagar]=useState(false);
    const [gastoSeleccionado, setGastoSeleccionado] = useState(null);

    if (!gastos || gastos.length === 0) {
        return <div className='error'>No hay gastos para mostrar.</div>;
    }

    const handlePagar=()=>{
        if(gastoSeleccionado){
            if(balance>gastoSeleccionado.monto){
                updateBalance(gastoSeleccionado.monto);
                removeGasto(gastoSeleccionado.name);
                setPagar(false);
                setGastoSeleccionado(null);
            }else{
                alert("No fue posible realizar el pago");
            }
            
            
        }
       
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
                        <Boton className="boton1" type="button" title="Pagar" action={()=>{setPagar(true);setGastoSeleccionado(gasto);}}/>
                        <Boton className="boton1" type="button" title="Editar" link="/editargasto" />
                    </div>

                    {pagar &&(
                        <div className="pagar-container" onClick={() => setPagar(false)}>
                            <div className="pagar-form" onClick={(e) => e.stopPropagation()}>
                            <FontAwesomeIcon icon={faTimes} onClick={() => setPagar(false)} className="cancelar-button"/>
                            <h3>Desea pagar?</h3>
                            <p className="gasto-title">{gastoSeleccionado.name}</p>
                            <p className="gasto-valor">Monto: ${gastoSeleccionado.monto}</p>
                            <p className="gasto-fecha">Fecha de vencimiento: {gastoSeleccionado.fechaVencimiento}</p>
                            <p className="gasto-participantes">Participantes: participantes</p>
                            <p className="gasto-porcentaje">Porcentaje: porcentaje%</p>
                            <Boton type={"button"} title={"Pagar"} action={handlePagar} />
                            </div>
                        </div>
                    )
                    }
                </div>
            ))}
        </div>
    );
}

// Hay que ponerle el link al boton de pagar cuando este la pag