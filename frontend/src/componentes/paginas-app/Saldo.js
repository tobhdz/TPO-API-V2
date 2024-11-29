import React, { useContext, useState } from 'react';
import './Configuracion.css';
import { UserContext } from '../../contexto/UserContext';
import Boton from '../Boton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Saldo() {
  const { user, balance } = useContext(UserContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [monto, setMonto] = useState('');

  const handleAñadirSaldo = () => {
    // Aquí irá la lógica para actualizar el saldo
    const nuevoSaldo = parseFloat(balance) + parseFloat(monto);
    // Actualizar en la base de datos
    setMostrarFormulario(false);
    setMonto('');
  };

  return (
    <div className="saldo-container">
      <p className='saldo'>Saldo disponible: ${balance}</p>
      <div className="metodos-pago">
        <button className="boton" onClick={() => setMostrarFormulario(true)}>
          Cargar saldo
        </button>
      </div>

      {mostrarFormulario && (
        <div className="nuevo-metodo-container" onClick={() => setMostrarFormulario(false)}>
          <div className="nuevo-metodo-form" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon 
              icon={faTimes} 
              onClick={() => setMostrarFormulario(false)} 
              className="cancelar-button"
            />
            <input
              type="number"
              placeholder="Monto a cargar"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              step="0.01"
            />
            <Boton 
              type="button" 
              title="Confirmar" 
              action={handleAñadirSaldo} 
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default Saldo;