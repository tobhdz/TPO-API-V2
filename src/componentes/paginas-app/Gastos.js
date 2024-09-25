import Boton from "../Boton";
import Tabla from "../Tabla";
import './Gastos.css'


export default function Gastos() {
    return(
        <div className="gastos-container">
            <div className="gastos-header">
                <h3>Gastos</h3>
            </div>
            <div className="gastos-boton">
                <Boton type={"submit"} title={"Gastos"} className="boton"/>
            </div>
            <div className="gastos-tabla">
                <Tabla/>
            </div>
        </div>
    )
}
//historial de gastos