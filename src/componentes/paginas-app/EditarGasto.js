import FormularioGastos from "../FormularioGastos";
import FormularioParticipantes from "../FormularioParticipantes";
import './EditarGasto.css'

export default function EditarGasto(){
    return(
        <div className="container">
            <div className="header">
                <h1>Editar Gasto</h1>
            </div>
            <div className="formularios">
                <FormularioGastos/>
                <FormularioParticipantes/>
            </div>
            
        </div>
    )
}