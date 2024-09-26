import { useState } from "react"
import Boton from "./Boton";

export default function FormularioParticipantes() {

    const [email, setEmail]=useState("");
    const [porcentaje, setPorcentaje]=useState("");

    return(
        <div className='form-container'>
            <div className='form-box'>
                <form>
                    <div className='form-header'>
                        <h4>Añadir Participantes</h4>
                    </div>
                    <input 
                    type='email'
                    id="email"
                    placeholder='Email'
                    required
                    value={email}
                    onChange={((e)=>{setEmail(e.target.value)})}
                    />

                    <div>
                        <label className='form-label'>Porcentaje de Participación</label>
                        <input 
                            type='text'
                            id="porcentaje"
                            required
                            value={porcentaje}
                            onChange={((e)=>{setPorcentaje(e.target.value)})}
                        />
                    </div>


                    <div className='form-botones'>
                        <Boton className={'submit-button boton-form'} type={'submit'}  title={"Añadir"}/>

                    </div>
                </form>

            </div>

        </div>
    )
}