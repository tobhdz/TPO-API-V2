import React from "react";
import './Proyectos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowLeft, faFileImage } from '@fortawesome/free-solid-svg-icons';


export default function Proyectos() {
  const [participanteVisible, setParticipanteVisible] = React.useState(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = React.useState(null);
  
  const toggleDetalles = (participanteId) => {
    setParticipanteVisible(participanteVisible === participanteId ? null : participanteId);
  };

  const handleProyectoClick = (proyectoId) => {
    setProyectoSeleccionado(proyectoId);
    const proyectos = document.querySelectorAll('.proyecto-box');
    const botonCrear = document.querySelector('.crear-proyecto');
    const botonVolver = document.querySelector('.volver-proyectos');
    const proyectoActual = document.querySelector(`#proyecto-${proyectoId}`);

    // Ocultar todos los proyectos excepto el seleccionado
    proyectos.forEach(proyecto => {
      if (proyecto.id !== `proyecto-${proyectoId}`) {
        proyecto.style.display = 'none';
      }
    });

    botonCrear.style.display = 'none';
    botonVolver.style.display = 'flex';

    // Mostrar elementos del proyecto seleccionado
    if (proyectoActual) {
      const proyectoInfo = proyectoActual.querySelector('.proyecto-info');
      const botonesGasto = proyectoActual.querySelector('.boton-proyectos:not(.crear-proyecto)');
      const gastoInfo = proyectoActual.querySelector('.gasto');

      if (proyectoInfo) proyectoInfo.style.display = 'block';
      if (botonesGasto) botonesGasto.style.display = 'flex';
      if (gastoInfo) gastoInfo.style.display = 'flex';
    }
  };

  const handleVolverClick = () => {
    setProyectoSeleccionado(null);
    // Mostrar todos los proyectos y el botón crear
    const proyectos = document.querySelectorAll('.proyecto');
    const botonCrear = document.querySelector('.crear-proyecto');
    const botonVolver = document.querySelector('.volver-proyectos');
    const proyectoInfo = document.querySelectorAll('.proyecto-info');
    const botonesGasto = document.querySelectorAll('.boton-proyectos:not(.crear-proyecto)');
    const gastosInfo = document.querySelectorAll('.gasto');

    proyectos.forEach(proyecto => {
      proyecto.parentElement.style.display = 'flex';
    });

    botonCrear.style.display = 'flex';
    botonVolver.style.display = 'none';
    proyectoInfo.forEach(info => info.style.display = 'none');
    botonesGasto.forEach(boton => boton.style.display = 'none');
    gastosInfo.forEach(gasto => gasto.style.display = 'none');
  };

  return (
    <div className="proyectos-container">
      <div className="proyectos-subcontainer">
        <div className="proyectos-header">
            <h1>Proyectos</h1>
            <button className="boton-proyectos crear-proyecto">
              <FontAwesomeIcon icon={faCirclePlus} /> Crear proyecto
            </button>
        </div>

        <button className="volver-proyectos" onClick={handleVolverClick}>
          <FontAwesomeIcon icon={faArrowLeft} /> Volver al listado
        </button>

        {/* Proyecto 1 */}
        <div className="proyecto-box" id="proyecto-1">
            <div className="proyecto" onClick={() => handleProyectoClick(1)}>
                <div className="proyecto-titulo">
                    <h2>Nombre proyecto</h2>
                    <div className="estado-proyecto">Activo</div>
                </div>
                <p className="descripcion-proyecto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p className="fecha-inicio-proyecto">27/11/2024</p>
                <div className="proyecto-info">
                    <h3>Participantes</h3>
                    {/* Participante 1 */}
                    <div className="proyecto-participante" onClick={() => toggleDetalles(1)}>
                        <div className="proyecto-participante-nombre">Juan Pérez</div>
                        <div className="proyecto-participante-email">juanperez@gmail.com</div>
                    </div>
                    <div className={`proyecto-participante-detalles ${participanteVisible === 1 ? 'visible' : ''}`}>
                        <p className="proyecto-participante-deuda">Deuda total: $2.000</p>
                        <div className="proyecto-participante-gastos">
                            <p>Desglose de gastos:</p>
                            <ul>
                                <li>Lorem ipsum</li>
                                <li>Dolor sit amet</li>
                            </ul>
                        </div>
                    </div>
                    {/* Participante 2 */}
                    <div className="proyecto-participante" onClick={() => toggleDetalles(2)}>
                        <div className="proyecto-participante-nombre">María González</div>
                        <div className="proyecto-participante-email">mariagonzalez@gmail.com</div>
                    </div>
                    <div className={`proyecto-participante-detalles ${participanteVisible === 2 ? 'visible' : ''}`}>
                        <p className="proyecto-participante-deuda">Deuda total: $1.500</p>
                        <div className="proyecto-participante-gastos">
                            <p>Desglose de gastos:</p>
                            <ul>
                                <li>Lorem ipsum</li>
                                <li>Dolor sit amet</li>
                            </ul>
                        </div>
                    </div>
                    {/* fin participantes */}
                </div>
            </div>
            
            <button className="boton-proyectos">
                <FontAwesomeIcon icon={faCirclePlus} />
                Añadir gasto
            </button>

            <div className="gasto">
                <h2>Nombre gasto</h2>
                <p className="descripcion-gasto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p className="fecha-gasto">27/11/2024</p>
                <p className="acreedor-gasto">Nombre apellido</p>
                <p className="subtotal-gasto">10.000</p>

                <h2>Participantes</h2>
                <div className="tabla-grid">
                    <div className="tabla-header">
                        <div>Nombre</div>
                        <div>Porcentaje</div>
                        <div>Deuda</div>
                    </div>
                    
                    <div className="tabla-row">
                        <div>Juan Pérez</div>
                        <div>50%</div>
                        <div>$5.000</div>
                    </div>

                    <div className="tabla-row">
                        <div>María González</div>
                        <div>50%</div>
                        <div>$5.000</div>
                    </div>
                </div>
                
                <button className="añadir-ticket">
                    <FontAwesomeIcon icon={faFileImage} />
                    Añadir ticket
                </button>

                <div className="contenedor-imagenes">
                    <div className="caja-imagen">
                        <img src="/rutaimg" alt="ticket" />
                    </div>
                </div>

                {/*Progreso*/}


                <h3>Progreso</h3>
                <div className="barra-progreso">
                    <div className="barra-progreso-relleno"></div>
                </div>
                <p>5.000 de 10.000 saldado (50%).</p>


            </div>
        </div>



        {/* Proyecto 2 */}
        <div className="proyecto-box" id="proyecto-2">
            <div className="proyecto" onClick={() => handleProyectoClick(2)}>
                <div className="proyecto-titulo">
                    <h2>Nerea</h2>
                    <div className="estado-proyecto">Activo</div>
                </div>
                <p className="descripcion-proyecto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p className="fecha-inicio-proyecto">27/11/2024</p>
                <div className="proyecto-info">
                    <h3>Participantes</h3>
                    {/* Participante 1 */}
                    <div className="proyecto-participante" onClick={() => toggleDetalles(1)}>
                        <div className="proyecto-participante-nombre">Juan Pérez</div>
                        <div className="proyecto-participante-email">juanperez@gmail.com</div>
                    </div>
                    <div className={`proyecto-participante-detalles ${participanteVisible === 1 ? 'visible' : ''}`}>
                        <p className="proyecto-participante-deuda">Deuda total: $2.000</p>
                        <div className="proyecto-participante-gastos">
                            <p>Desglose de gastos:</p>
                            <ul>
                                <li>Lorem ipsum</li>
                                <li>Dolor sit amet</li>
                            </ul>
                        </div>
                    </div>
                    {/* Participante 2 */}
                    <div className="proyecto-participante" onClick={() => toggleDetalles(2)}>
                        <div className="proyecto-participante-nombre">María González</div>
                        <div className="proyecto-participante-email">mariagonzalez@gmail.com</div>
                    </div>
                    <div className={`proyecto-participante-detalles ${participanteVisible === 2 ? 'visible' : ''}`}>
                        <p className="proyecto-participante-deuda">Deuda total: $1.500</p>
                        <div className="proyecto-participante-gastos">
                            <p>Desglose de gastos:</p>
                            <ul>
                                <li>Lorem ipsum</li>
                                <li>Dolor sit amet</li>
                            </ul>
                        </div>
                    </div>
                    {/* fin participantes */}
                </div>
            </div>
            
            <button className="boton-proyectos">
                <FontAwesomeIcon icon={faCirclePlus} />
                Añadir gasto
            </button>

            <div className="gasto">
                <h2>Nombre gasto</h2>
                <p className="descripcion-gasto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p className="fecha-gasto">27/11/2024</p>
                <p className="acreedor-gasto">Nombre apellido</p>
                <p className="subtotal-gasto">10.000</p>

                <h2>Participantes</h2>
                <div className="tabla-grid">
                    <div className="tabla-header">
                        <div>Nombre</div>
                        <div>Porcentaje</div>
                        <div>Deuda</div>
                    </div>
                    
                    <div className="tabla-row">
                        <div>Juan Pérez</div>
                        <div>50%</div>
                        <div>$5.000</div>
                    </div>

                    <div className="tabla-row">
                        <div>María González</div>
                        <div>50%</div>
                        <div>$5.000</div>
                    </div>
                </div>
                
                <button className="añadir-ticket">
                    <FontAwesomeIcon icon={faFileImage} />
                    Añadir ticket
                </button>

                <div className="contenedor-imagenes">
                    <div className="caja-imagen">
                        <img src="/rutaimg" alt="ticket" />
                    </div>
                </div>

                {/*Progreso*/}


                <h3>Progreso</h3>
                <div className="barra-progreso">
                    <div className="barra-progreso-relleno"></div>
                </div>
                <p>5.000 de 10.000 saldado (50%).</p>


            </div>
        </div>



      </div>
    </div>
  );
}
