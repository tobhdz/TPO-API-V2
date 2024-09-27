import './CardGastos.css';
import { UserContext } from '../contexto/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import Boton from './Boton';
import { useContext, useState } from 'react';

export default function CardGastos({title, tipo, className}) {

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
                suma-=gastoSeleccionado.monto;
                tipo.length=tipo.length-1;
            }else{
                alert("No fue posible realizar el pago");
            }
            
            
        }
       
    }

    let suma=0;
    for (let i=0; i<tipo.length; i++){
        suma+= parseFloat(tipo[i].monto);
    }
   

    return(
        <div className="card-container">
            <div className="info-container">
                <h5 className="card-title">{title}</h5>
                <p className="card-sum">Total: ${suma}</p>
                <p className="card-description">Gastos: {tipo.length}</p>
            </div>
            <div className="cardgastos-container">
                {tipo.length==0 && <p>No hay gastos pendientes</p>}
                {
                    tipo.map(item=>(
                        <div 
                        key={item.name}
                        className="gasto-item">
                            <div className='item-info'>
                                <p>{item.name}</p>
                                <p>${item.monto}</p>
                            </div>
                            <div className='item-info'>
                                <p>{item.descripcion}</p>
                                <p>{item.fechaVto}</p>
                            </div>
                            <div className='pagar'>
                                <Boton className={"boton1"} type={"button"} title={"Pagar"} action={()=>{setPagar(true);setGastoSeleccionado(item);}} />
                            </div>
                                 
                        </div>
                    ))
                }
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
    )
}