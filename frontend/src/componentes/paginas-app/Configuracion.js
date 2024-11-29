import React, { useState } from 'react';
import InformacionPersonal from './InformacionPersonal';
import Seguridad from './Seguridad';
import Saldo from './Saldo';
import './Configuracion.css';

function Configuracion() {
  const [tabActiva, setTabActiva] = useState('informacion');

  return (
    <div className="configuracion-container">
      <div className="configuracion-box">
        <div className="configuracion-tabs">
          <button
            className={`tab-boton ${tabActiva === 'informacion' ? 'tab-activa' : ''}`}
            onClick={() => setTabActiva('informacion')}
          >
            Información
          </button>
          <button
            className={`tab-boton ${tabActiva === 'seguridad' ? 'tab-activa' : ''}`}
            onClick={() => setTabActiva('seguridad')}
          >
            Seguridad
          </button>
          <button
            className={`tab-boton ${tabActiva === 'saldo' ? 'tab-activa' : ''}`}
            onClick={() => setTabActiva('saldo')}
          >
            Saldo
          </button>
        </div>
        
        <div className="configuracion-contenido">
          {tabActiva === 'informacion' && <InformacionPersonal />}
          {tabActiva === 'seguridad' && <Seguridad />}
          {tabActiva === 'saldo' && <Saldo />}
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
