import React, { useContext } from 'react';
import { UserContext } from '../../contexto/UserContext';

function Sharebill() {
  const { user, balance } = useContext(UserContext);  // Accede al usuario y saldo desde el contexto

  return (
    <div>
      
      <div>
        <h1>Bienvenido, {user ? user : 'Usuario'}</h1>  {/* Nombre de usuario */}
        <p>Saldo disponible: ${balance}</p>  {/* Saldo */}
      </div>
    </div>
  );
}

export default Sharebill;
