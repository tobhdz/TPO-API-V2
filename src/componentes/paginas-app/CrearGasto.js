import FormularioGastos from "../FormularioGastos";
import FormularioParticipantes from "../FormularioParticipantes";
import './CrearEditarGasto.css'

export default function CrearGasto() {
    return(
        <div className="creargasto-container">
            <div className="creargasto-header">
                <h1>Crear gasto</h1>
            </div>
            <div className="creargasto-formularios">
                <FormularioGastos/>
            </div>
            
        </div>
    )
}