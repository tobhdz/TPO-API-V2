import React, { useContext, useState } from 'react';
import './Configuracion.css';
import { UserContext } from '../../contexto/UserContext';
import Boton from '../Boton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Saldo() {
  const { user, balance, updateUser } = useContext(UserContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [monto, setMonto] = useState('');
  const [error, setError] = useState('');

  const handleAñadirSaldo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No hay sesión activa");
        return;
      }

      const response = await fetch('http://localhost:4000/api/users/update-balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          monto: parseFloat(monto)
        })
      });

      const data = await response.json();

      if (response.ok) {
        updateUser({ 
          newBalance: data.balance 
        });
        setMostrarFormulario(false);
        setMonto('');
        setError('');
      } else {
        setError(data.message || 'Error al actualizar el saldo');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error(error);
    }
  };

  return (
    <div className="saldo-container">
      {error && <p className="error-message">{error}</p>}
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