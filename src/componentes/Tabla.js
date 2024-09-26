import { Link } from 'react-router-dom'
import Boton from './Boton'
import './Tabla.css'

export default function Tabla() {
    return(
        <div class="grid-table">
            <div class="header">Nombre del Proyecto</div>
            <div class="header">Valor</div>
            <div class="header">Fecha</div>
            <div class="header">Participantes</div>
            <div class="header">Porcentaje</div>
            <div class="header">Acciones</div>

            <div class="cell">Row 1, Col 1</div>
            <div class="cell">Row 1, Col 2</div>
            <div class="cell">Row 1, Col 3</div>
            <div class="cell">Row 1, Col 3</div>
            <div class="cell">Row 1, Col 3</div>
            <div class="cell botones">
                <Link>
                    <Boton className={"tabla-boton"} type={"submit"} title={"Pagar"}/>
                </Link>
                
                <Link to="/editargasto">
                    <Boton className={"tabla-boton"} type={"submit"} title={"Editar"}/>
                </Link>
                
            </div>

            <div class="cell">Row 2, Col 1</div>
            <div class="cell">Row 2, Col 2</div>
            <div class="cell">Row 2, Col 3</div>
            <div class="cell">Row 2, Col 3</div>
            <div class="cell">Row 2, Col 3</div>
            <div class="cell">
            <div class="cell botones">
                <Boton className={"tabla-boton"} type={"submit"} title={"Pagar"}/>
                <Boton className={"tabla-boton"} type={"submit"} title={"Editar"}/>
            </div>
            </div>


            <div class="cell">Row 3, Col 1</div>
            <div class="cell">Row 3, Col 2</div>
            <div class="cell">Row 3, Col 3</div>
            <div class="cell">Row 3, Col 3</div>
            <div class="cell">Row 3, Col 3</div>
            <div class="cell">
            <div class="cell botones">
                <Boton className={"tabla-boton"} type={"submit"} title={"Pagar"}/>
                <Boton className={"tabla-boton"} type={"submit"} title={"Editar"}/>
            </div>
            </div>

        </div>

    )
}