import React, { useState, useEffect } from "react";
import './Proyectos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowLeft, faFileImage, faTimes } from '@fortawesome/free-solid-svg-icons';


export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [participanteVisible, setParticipanteVisible] = useState(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [mostrarFormularioProyecto, setMostrarFormularioProyecto] = useState(false);
  const [participantesLista, setParticipantesLista] = useState([]);
  const [participanteEmail, setParticipanteEmail] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [descripcionProyecto, setDescripcionProyecto] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay sesión activa');
        return;
      }

      const response = await fetch('http://localhost:4000/api/proyectos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }

      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los proyectos');
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay sesión activa. Por favor, inicie sesión nuevamente.');
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
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        setMostrarFormularioProyecto(false);
        setNombreProyecto('');
        setDescripcionProyecto('');
        setParticipantesLista([]);
        cargarProyectos();
        alert('Proyecto creado exitosamente');
      } else {
        alert(data.message || 'Error al crear el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el proyecto');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const handleAgregarParticipante = async () => {
    if (!participanteEmail) return;
    
    if (!validateEmail(participanteEmail)) {
      alert('Por favor ingrese un email válido');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay sesión activa');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: participanteEmail })
      });

      if (!response.ok) {
        throw new Error('Error al verificar el email');
      }

      const data = await response.json();

      if (!data.exists) {
        alert('El email ingresado no corresponde a ningún usuario registrado');
        return;
      }

      // Verificar que el participante no esté ya en la lista
      if (participantesLista.some(p => p.email === participanteEmail)) {
        alert('Este participante ya ha sido agregado');
        return;
      }

      setParticipantesLista([
        ...participantesLista,
        { email: participanteEmail }
      ]);
      setParticipanteEmail('');

    } catch (error) {
      console.error('Error:', error);
      alert('Error al verificar el email');
    }
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

        {proyectos.map(proyecto => (
          <div className="proyecto-box" key={proyecto.ProyectoId} id={`proyecto-${proyecto.ProyectoId}`}>
            <div className="proyecto" onClick={() => handleProyectoClick(proyecto.ProyectoId)}>
              <div className="proyecto-titulo">
                <h2>{proyecto.Nombre}</h2>
                <div className="estado-proyecto">
                  {proyecto.Estado ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              <p className="descripcion-proyecto">{proyecto.Descripcion}</p>
              <p className="fecha-inicio-proyecto">
                {new Date(proyecto.FechaInicio).toLocaleDateString()}
              </p>
              
              <div className="proyecto-info">
                <h3>Participantes</h3>
                {proyecto.Participantes && proyecto.Participantes.map((participante) => (
                  <div 
                    key={participante.UsuarioId} 
                    className="proyecto-participante" 
                    onClick={() => toggleDetalles(participante.UsuarioId)}
                  >
                    <div className="proyecto-participante-nombre">
                      {`${participante.Nombre} ${participante.Apellido}`}
                    </div>
                    <div className="proyecto-participante-email">{participante.Email}</div>
                  </div>
                ))}
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
        ))}

        {mostrarFormularioProyecto && (
          <div className="modal-overlay" onClick={() => setMostrarFormularioProyecto(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <FontAwesomeIcon 
                icon={faTimes} 
                className="cerrar-modal" 
                onClick={() => setMostrarFormularioProyecto(false)}
              />
              <h2>Crear Nuevo Proyecto</h2>
              <form onSubmit={handleSubmit}>
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
    </div>
  );
}
