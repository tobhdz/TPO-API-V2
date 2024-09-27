import React, { useContext } from 'react';
import './Sharebill.css';
import { UserContext } from '../../contexto/UserContext';
import '../CardExplorar.js';
import CardExplorar from '../CardExplorar.js';

function Sharebill() {
  const { name, user, email, balance, profileImage } = useContext(UserContext);  // Accede al nombre, usuario, email, saldo e imagen de perfil desde el contexto

  return (
      <div className="sharebill-container">
        <div className="sharebill-encabezado">
          <img src="/img/logo.png" alt="Logo" />
          <div className="datos-perfil">
            <img src={profileImage || "/img/defaultuser.png"} alt="Foto de perfil" />  {/* Muestra la foto de perfil o una por defecto */}
            <div className="sharebill-mini-perfil">
              <h1>{name ? name : 'No disponible'}</h1>
              <p className='usuario'>{user ? user : 'usuario'}</p>
              <p>{email ? email : 'correo@nodisponible.com'}</p>
            </div>
          </div>
          <div className="balance">
            <p>Saldo disponible: ${balance}</p>
          </div>
        </div>
        <div className="sharebill-cuerpo">
          <h2>Explorar</h2>
          <div className="box-explorar">
            <CardExplorar titulo="Finanzas" link="/finanzas" imagen="/img/burbujas.png" />
            <CardExplorar titulo="Gastos" link="/gastos" imagen="/img/burbujas1.png" />
            <CardExplorar titulo="Crear gasto" link="/creargasto" imagen="/img/burbujas2.png" />
          </div>
        </div>
      </div>
  );
}

export default Sharebill;
