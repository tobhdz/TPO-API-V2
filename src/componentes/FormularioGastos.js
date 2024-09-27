import { useContext, useState } from 'react'
import './FormularioGastos.css'
import Boton from './Boton';
import { UserContext } from '../contexto/UserContext';
 

export default function FormularioGastos() {

    const {user}=useContext(UserContext);   // Asociar el gasto con el usuario que lo creó
    const [nombreProyecto, setNombreProyecto]= useState("");
    const [presupuesto, setPresupuesto]= useState(0);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [participante, setParticipante]=useState([]);
    const [porcentaje, setPorcentaje]=useState(0);
   
  // Función para manejar el submit del formulario y crear un objeto "gasto"
    const handleSubmit = (e) => {
        e.preventDefault();  // Evita el comportamiento predeterminado del formulario

        // Creación del objeto "gasto" con los datos del formulario y el userId
        const nuevoParticipante={
            email:participante,
            porcentaje: porcentaje
        }
        const gasto = {
            nombre: nombreProyecto,
            descripcion: descripcion,
            monto: parseFloat(presupuesto),
            fechaInicio: fechaInicio,
            fechaVencimiento: fechaVencimiento,
            
        };

          // Asegurarse de que el array 'gastos' está definido
        if (!user.gastos) {
            user.gastos = [];  // Inicializar si está undefined
        }
        user.gastos.push(gasto)
    };
   
    const handleReset=(e)=>{
        setNombreProyecto("");
        setPresupuesto(0);
        setDescripcion("");
        setFechaInicio("");
        setFechaVencimiento("");
        setParticipante("");
        setPorcentaje(0);
    }

    return(
        <div className='form-container'>
            <div className='form-box'>
                <form onSubmit={handleSubmit}>
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
                        value={fechaInicio}
                        onChange={((e)=>{setFechaInicio(e.target.value)})}
                        />
                        
                    </div>
                    
                    <div>
                        <label className='form-label'>Fecha Límite</label>
                        <input 
                        type='date'
                        id="end-date"
                        required
                        value={fechaVencimiento}
                        onChange={((e)=>{setFechaVencimiento(e.target.value)})}
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

                    <div>
                        <label>Participante</label>
                        <input
                        placeholder='Email Participante'
                        value={participante}
                        onChange={((e)=>{setParticipante(e.target.value)})}/>

                        <label>Porcentaje</label>
                        <input
                        value={porcentaje}
                        onChange={((e)=>{setPorcentaje(e.target.value)})}/>
                    </div>
                    
                    

                    

                    <textarea
                    placeholder='Deje una descripcion aquí...'
                    value={descripcion}
                    onChange={((e)=>{setDescripcion(e.target.value)})}
                    >

                        
                    </textarea>

                    <div className='form-botones'>
                        <Boton className={'submit-button boton-form'} type={"submit"} title={"Crear Gasto"}/>
                        <Boton  className={'boton-form'} type={'button'} title={"Restablecer"} action={handleReset}/>

                    </div>
                </form>

            </div>

        </div>
    )
}