import FormularioGastos from "../FormularioGastos";
import FormularioParticipantes from "../FormularioParticipantes";
import './CrearGasto.css'

export default function CrearGasto() {
    return(
        <div className="container">
            <h3>Crear Gasto</h3>
            <FormularioGastos/>
            <FormularioParticipantes/>
        </div>
    )
}
//formulario para agregar gasto