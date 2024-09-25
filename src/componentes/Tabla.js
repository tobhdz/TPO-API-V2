import './Tabla.css'

export default function Tabla() {
    return(
        <div class="grid-table">
            <div class="header">Nombre del Proyecto</div>
            <div class="header">Valor</div>
            <div class="header">Fecha</div>
            <div class="header">Participantes</div>

            <div class="cell">Row 1, Col 1</div>
            <div class="cell">Row 1, Col 2</div>
            <div class="cell">Row 1, Col 3</div>
            <div class="cell">Row 1, Col 3</div>

            <div class="cell">Row 2, Col 1</div>
            <div class="cell">Row 2, Col 2</div>
            <div class="cell">Row 2, Col 3</div>
            <div class="cell">Row 2, Col 3</div>

            <div class="cell">Row 3, Col 1</div>
            <div class="cell">Row 3, Col 2</div>
            <div class="cell">Row 3, Col 3</div>
            <div class="cell">Row 3, Col 3</div>
        </div>

    )
}