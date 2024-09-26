import Boton from "../Boton";
import Tabla from "../Tabla";
import './Gastos.css'


export default function Gastos() {

    

    return(
        <div className="gastos-container">
            <div className="gastos-header">
                <h1>Gastos</h1>
            </div>
            <div className="gastos-boton">
                <Boton className={"boton"} type={"submit"} title={"Gastos"}  />
            </div>
            <div className="gastos-tabla">
                <Tabla/>
            </div>
        </div>
    )
}
//historial de gastos