import React, { useContext } from 'react';
import './Sharebill.css';
import { UserContext } from '../../contexto/UserContext';
import '../CardExplorar.js';
import CardExplorar from '../CardExplorar.js';
import { Link } from 'react-router-dom';


function Sharebill() {
  const { user, balance } = useContext(UserContext);  // Accede al usuario y saldo desde el contexto

  return (
      <div className="sharebill-container">
        <div className="sharebill-encabezado">
          <img src="/img/logo.png" alt="Logo" />
          <div className="datos-perfil">
            <img src="/img/defaultuser.png" alt="Foto de perfil" /> 
            {/* Reemplazar este img con imagen del usuario en sesión */}
            <h1>{user ? user : 'Usuario'}</h1>
          </div>
          <div className="balance">
            <p>Saldo disponible: ${balance}</p>
          </div>
        </div>
        <div className="sharebill-cuerpo">
          <h2>Explorar</h2>
          <div className="box-explorar">
          <CardExplorar titulo="Sección 1" link="/app" imagen="/img/burbujas.png" />
          <CardExplorar titulo="Sección 2" link="/app" imagen="/img/burbujas1.png" />
          <CardExplorar titulo="Sección 3" link="/app" imagen="/img/burbujas2.png" />
          </div>
        </div>
      </div>
  );
}

export default Sharebill;
