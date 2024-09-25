import { useState } from "react"

export default function FormularioParticipantes() {

    const [email, setEmail]=useState("");

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


                    <div className='form-botones'>
                        <button type='submit' className='submit-button boton-form'>Añadir</button>


                    </div>
                </form>

            </div>

        </div>
    )
}