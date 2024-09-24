import { Link } from "react-router-dom";
import CardGastos from "../CardGastos";
import './Finanzas.css';

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
                    <Link to='/finanzas'><button className="btn">Cuentas por Pagar</button></Link>
                    <Link to='/gastos'><button className="btn">Gastos</button></Link>
                
                </div>
                <div className="crear-container">
                    <Link to='/creargasto'><button className="btn">Gastos</button></Link>
                
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