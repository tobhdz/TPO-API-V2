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

                <div className="card-container">
                    <h2>Cuentas por pagar</h2>
                    <div className="finanzas-card">
                        <div className="finanzas-info">
                            <h5>Nombre del gasto</h5>
                            <div className="finanzas-detalles">
                                <span>Proyecto: Nombre del proyecto</span>
                                <span>Acreedor: Nombre del acreedor</span>
                            </div>
                            <p className="subtotal-gasto">10</p>
                        </div>
                        <div className="finanzas-botones">
                            <button>Pagar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}