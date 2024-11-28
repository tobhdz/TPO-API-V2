import React, { useState } from "react";
import './Proyectos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowLeft, faFileImage, faTimes } from '@fortawesome/free-solid-svg-icons';


export default function Proyectos() {
  const [participanteVisible, setParticipanteVisible] = React.useState(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = React.useState(null);
  const [mostrarFormularioProyecto, setMostrarFormularioProyecto] = useState(false);
  const [participantesLista, setParticipantesLista] = useState([]);
  const [participanteEmail, setParticipanteEmail] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [descripcionProyecto, setDescripcionProyecto] = useState('');
  
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
      const botonesGasto = proyectoActual.querySelector('.boton-agregar-gasto');
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
    const botonesGasto = document.querySelectorAll('.boton-agregar-gasto');
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

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay sesión activa. Por favor, inicie sesión nuevamente.');
      // Aquí podrías redirigir al login
      return;
    }

    if (!nombreProyecto.trim()) {
      alert('Por favor ingrese un nombre para el proyecto');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: nombreProyecto,
          descripcion: descripcionProyecto,
          fechaInicio: new Date().toISOString(),
          participantes: participantesLista
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMostrarFormularioProyecto(false);
        setNombreProyecto('');
        setDescripcionProyecto('');
        setParticipantesLista([]);
        alert('Proyecto creado exitosamente');
      } else if (response.status === 401) {
        alert('Sesión expirada. Por favor, inicie sesión nuevamente.');
        localStorage.removeItem('token');
        // Aquí podrías redirigir al login
      } else {
        alert(data.message || 'Error al crear el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el proyecto');
    }
  };

  const handleAgregarParticipante = () => {
    if (!participanteEmail) return;
    
    setParticipantesLista([
      ...participantesLista,
      { email: participanteEmail, porcentaje: 0 }
    ]);
    setParticipanteEmail('');
  };

  return (
    <div className="proyectos-container">
      <div className="proyectos-subcontainer">
        <div className="proyectos-header">
            <h1>Proyectos</h1>
            <button className="boton-proyectos crear-proyecto" onClick={() => setMostrarFormularioProyecto(true)}>
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
            
            <button className="boton-agregar-gasto">
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
            
            <button className="boton-agregar-gasto">
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
      {mostrarFormularioProyecto && (
        <div className="modal-overlay" onClick={() => setMostrarFormularioProyecto(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <FontAwesomeIcon 
              icon={faTimes} 
              className="cerrar-modal" 
              onClick={() => setMostrarFormularioProyecto(false)}
            />
            <h2>Crear Nuevo Proyecto</h2>
            <form onSubmit={handleCrearProyecto}>
              <input
                type="text"
                className="input-proyecto"
                placeholder="Nombre del proyecto"
                value={nombreProyecto}
                onChange={(e) => setNombreProyecto(e.target.value)}
                required
              />
              
              <textarea
                className="input-proyecto"
                placeholder="Descripción del proyecto"
                value={descripcionProyecto}
                onChange={(e) => setDescripcionProyecto(e.target.value)}
                required
              />

              <div className="participantes-proyecto">
                <h3>Participantes</h3>
                <div className="agregar-participante">
                  <input
                    type="email"
                    className="input-proyecto"
                    placeholder="Email del participante"
                    value={participanteEmail}
                    onChange={(e) => setParticipanteEmail(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="boton-agregar"
                    onClick={handleAgregarParticipante}
                  >
                    +
                  </button>
                </div>

                <div className="lista-participantes">
                  {participantesLista.map((participante, index) => (
                    <div key={index} className="participante-item">
                      <span>{participante.email}</span>
                      <FontAwesomeIcon 
                        icon={faTimes} 
                        onClick={() => {
                          setParticipantesLista(participantesLista.filter((_, i) => i !== index));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="boton-crear">
                Crear Proyecto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
