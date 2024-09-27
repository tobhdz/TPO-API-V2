import FormularioGastos from "../FormularioGastos";
import FormularioParticipantes from "../FormularioParticipantes";
import './CrearEditarGasto.css'

export default function CrearGasto() {
    return(
        <div className="editargasto-container">
            <div className="editargasto-header">
                <h1>Editar gasto</h1>
            </div>
            <div className="editargasto-formularios">
                <FormularioGastos/>
                <FormularioParticipantes/>
            </div>
            
        </div>
    )
}