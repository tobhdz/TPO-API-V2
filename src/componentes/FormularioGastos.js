import { useState } from 'react'
import './FormularioGastos.css'

export default function FormularioGastos() {

    const [nombreProyecto, setNombreProyecto]= useState("");
    const [presupuesto, setPresupuesto]= useState(0);

    const handleReset=()=>{
        
    }

    const handleSubmit=()=>{

    }

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

                    <input 
                        type='number'
                        id="presupuesto"
                        placeholder='Presupuesto'
                        required
                        value={presupuesto}
                        onChange={((e)=>{setPresupuesto(e.target.value)})}
                    />

                    <textarea
                    placeholder='Deje una descripcion aquí...'>
                    </textarea>

                    <div className='form-botones'>
                        <button type='submit' className='submit-button boton-form' onSubmit={handleSubmit()}>Crear</button>
                        <button type='button' className='boton-form' onClick={handleReset()}>Restablecer</button>

                    </div>
                </form>

            </div>

        </div>
    )
}