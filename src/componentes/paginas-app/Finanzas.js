import { Link } from "react-router-dom";
import CardGastos from "../CardGastos";
import './Finanzas.css';
import Boton from "../Boton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const gastosVencidos=[
    {name: "hola", descripcion:"hola", monto:"1000", fechVto:"24/07/2024"},
    {name: "chau", descripcion:"chau", monto:"5000", fechVto:"24/08/2024"},
    {name: "hello", descripcion:"hello", monto:"1000", fechVto:"22/07/2024"}
]

const venceHoy=[
    {name: "melu", descripcion:"", monto:"2000", fechVto:""},
    {name: "tobi", descripcion:"", monto:"7000", fechVto:""}
]

const prox7dias=[
    
]

export default function Finanzas() {
    return(
        <div className="finanzas-container">
            <div className="finanzas-box">
                <h1>Finanzas</h1>
                <div className="btn-container">
                    <Boton className="boton1" type="button" title="Cuentas por pagar" link="/finanzas" />
                    <Boton className="boton1" type="button" title="Gastos" link="/gastos" />
                    <Boton className="boton1" type="button" title={<><FontAwesomeIcon icon={faCirclePlus} /> Crear gasto</>} link="/creargasto" />
                </div>

                <div className="card-container">
                    <CardGastos title="Atrasados" tipo={gastosVencidos} className="card-item"></CardGastos>
                    <CardGastos title="Vence hoy" tipo={venceHoy} className="card-item"></CardGastos>
                    <CardGastos title="Proximos 7 días" tipo={prox7dias} className="card-item"></CardGastos>
                </div>
            </div>
        </div>
    )
}