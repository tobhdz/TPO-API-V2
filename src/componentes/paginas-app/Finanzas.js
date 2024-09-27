import { Link } from "react-router-dom";
import CardGastos from "../CardGastos";
import './Finanzas.css';
import Boton from "../Boton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { UserContext } from "../../contexto/UserContext";



export default function Finanzas() {
    const { getGastosVencidos, getGastosPorVencer } = useContext(UserContext);
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
                    <CardGastos title="Atrasados" tipo={getGastosVencidos()} className="card-item"></CardGastos>
                    <CardGastos title="Vence hoy" tipo={getGastosPorVencer(0)} className="card-item"></CardGastos>
                    <CardGastos title="Proximos 7 días" tipo={getGastosPorVencer(7)} className="card-item"></CardGastos>
                </div>
            </div>
        </div>
    )
}