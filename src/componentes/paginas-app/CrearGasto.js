import FormularioGastos from "../FormularioGastos";
import FormularioParticipantes from "../FormularioParticipantes";
import './CrearGasto.css'

export default function CrearGasto() {
    return(
        <div className="container">
            <div className="header">
                <h1>Crear Gasto</h1>
            </div>
            <div className="formularios">
                <FormularioGastos/>
                <FormularioParticipantes/>
            </div>
            
        </div>
    )
}
//formulario para agregar gasto