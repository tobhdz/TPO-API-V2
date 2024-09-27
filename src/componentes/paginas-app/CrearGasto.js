import FormularioGastos from "../FormularioGastos";
import FormularioParticipantes from "../FormularioParticipantes";
import './CrearGasto.css'

export default function CrearGasto() {
    return(
        <div className="creargasto-container">
            <div className="creargasto-header">
                <h1>Crear Gasto</h1>
            </div>
            <div className="creargasto-formularios">
                <div className="formularios-box">
                    <FormularioGastos/>
                    <FormularioParticipantes/>
                </div>
            </div>
            
        </div>
    )
}
//formulario para agregar gasto