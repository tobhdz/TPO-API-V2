import React, { useState } from 'react';
import InformacionPersonal from './InformacionPersonal';
import Seguridad from './Seguridad';
import Actividad from './Actividad';
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
            className={`tab-boton ${tabActiva === 'actividad' ? 'tab-activa' : ''}`}
            onClick={() => setTabActiva('actividad')}
          >
            Actividad
          </button>
        </div>
        
        <div className="configuracion-contenido">
          {tabActiva === 'informacion' && <InformacionPersonal />}
          {tabActiva === 'seguridad' && <Seguridad />}
          {tabActiva === 'actividad' && <Actividad />}
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
