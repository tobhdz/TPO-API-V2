import React, { useContext, useState } from 'react';
import './Configuracion.css';
import { UserProvider } from '../../contexto/UserContext';
import { UserContext } from '../../contexto/UserContext';
import Boton from '../Boton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

function Actividad() {

  const {user, metodosPago, addPayMethod} =useContext(UserContext);
  const [anadirMetodo, setAnadirMetodo]=useState(false);
  const [numeroTarjeta, setNumeroTarjeta]=useState("");
  const [titularTarjeta, setTitularTarjeta]=useState("");
  const [codigoVerificacion, setCodVerificacion]=useState("");
  const [fechaInicio, setFechaInicio]=useState("");
  const [fechaVencimiento, setFechaVencimiento]=useState("");

  const handleNuevoMetodo=()=>{
    
    const nuevoMetodo={
        numTarjeta: {numeroTarjeta},
        titular: {titularTarjeta},
        codigoVerificacion: {codigoVerificacion},
        fechaInicio: {fechaInicio},
        fechaVencimiento:{fechaVencimiento}
    }
    addPayMethod(nuevoMetodo);
    setAnadirMetodo(false);
    alert("Nuevo metodo registrado exitosamente.");
  }
  
  return (
    <div className="actividad-container">
      <p className='saldo'>Saldo disponible: $5000</p>
      <div className="metodos-pago">
        <button className="boton" onClick={()=>setAnadirMetodo(true)}>Añadir método de pago</button>
      </div>

      {anadirMetodo &&(
          <div className="nuevo-metodo-container" onClick={() => setAnadirMetodo(false)}>
            <div className="nuevo-metodo-form" onClick={(e) => e.stopPropagation()}>
              <FontAwesomeIcon icon={faTimes} onClick={() => setAnadirMetodo(false)} className="cancelar-button"/>
              <input
                type="text"
                placeholder="Numero de Tarjeta"
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre del Titular"
                value={titularTarjeta}
                onChange={(e) => setTitularTarjeta(e.target.value)}
              />
              <input
                type="text"
                placeholder="Codigo de Verificación"
                value={codigoVerificacion}
                onChange={(e) => setCodVerificacion(e.target.value)}
              />
              <input
                type="text"
                placeholder="Fecha Inicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
              <input
                type="text"
                placeholder="Fecha Vencimiento"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
              <Boton type={"button"} title={"Añadir"} action={handleNuevoMetodo} />
            </div>
          </div>
      )

      }

      <div className="movimientos">
        <h4>Movimientos</h4>
        <p><i className="prueba">No hay movimientos disponibles.</i></p>
      </div>
    </div>
  );
}

export default Actividad;