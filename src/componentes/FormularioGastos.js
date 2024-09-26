import { useState } from 'react'
import './FormularioGastos.css'
import Boton from './Boton';

export default function FormularioGastos() {

    const [nombreProyecto, setNombreProyecto]= useState("");
    const [presupuesto, setPresupuesto]= useState(0);


    return(
        <div className='form-container'>
            <div className='form-box'>
                <form>
                    <div className='form-header'>
                        <h4>Crear Gasto</h4>
                    </div>
                    <input 
                    type='text'
                    id="nombre-proyecto"
                    placeholder='Nombre del Proyecto'
                    required
                    value={nombreProyecto}
                    onChange={((e)=>{setNombreProyecto(e.target.value)})}
                    />

                    

                    <div>
                        <label className='form-label'>Fecha Inicio</label>
                        <input 
                        type='date'
                        id="start-date"
                        required
                        />
                        
                    </div>
                    
                    <div>
                        <label className='form-label'>Fecha Límite</label>
                        <input 
                        type='date'
                        id="end-date"
                        required
                        />
                        
                    </div>

                    <div>
                        <label className='form-label'>Presupuesto</label>
                        <input 
                            type='text'
                            id="presupuesto"
                            required
                            value={presupuesto}
                            onChange={((e)=>{setPresupuesto(e.target.value)})}
                        />
                    </div>

                    

                    <textarea
                    placeholder='Deje una descripcion aquí...'>
                    </textarea>

                    <div className='form-botones'>
                        <Boton className="boton2" type="submit" title="Agregar" />
                        <Boton className="boton2" type="submit" title="Reestablecer" />

                    </div>
                </form>

            </div>

        </div>
    )
}