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
  const [mostrarFormularioGasto, setMostrarFormularioGasto] = useState(false);
  const [nombreGasto, setNombreGasto] = useState('');
  const [descripcionGasto, setDescripcionGasto] = useState('');
  const [montoGasto, setMontoGasto] = useState('');
  const [participantesGasto, setParticipantesGasto] = useState([]);
  const [proyectoActual, setProyectoActual] = useState(null);
  const [acreedorId, setAcreedorId] = useState(null);

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

    // Obtener el email del usuario actual del token
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const creadorEmail = tokenData.email;

    // Asegurarse de que el creador esté en la lista de participantes
    if (!participantesLista.some(p => p.email === creadorEmail)) {
      participantesLista.push({ email: creadorEmail });
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

  const handlePorcentajeChange = (usuarioId, porcentaje) => {
    const nuevoParticipante = {
      usuarioId,
      porcentajeDeuda: parseFloat(porcentaje)
    };

    const participantesActualizados = participantesGasto.filter(p => p.usuarioId !== usuarioId);
    setParticipantesGasto([...participantesActualizados, nuevoParticipante]);
  };

  const handleParticipanteGastoChange = (usuarioId, checked) => {
    if (checked) {
      setParticipantesGasto([...participantesGasto, { usuarioId, porcentajeDeuda: 0 }]);
    } else {
      setParticipantesGasto(participantesGasto.filter(p => p.usuarioId !== usuarioId));
    }
  };

  const handleSubmitGasto = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay sesión activa');
      return;
    }

    // Validar que los porcentajes sumen 100
    const totalPorcentaje = participantesGasto.reduce((sum, p) => sum + p.porcentajeDeuda, 0);
    if (totalPorcentaje !== 100) {
      alert('Los porcentajes deben sumar 100%');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/gastos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          proyectoId: proyectoSeleccionado,
          nombre: nombreGasto,
          descripcion: descripcionGasto,
          montoTotal: parseFloat(montoGasto),
          fecha: new Date().toISOString(),
          participantes: participantesGasto
        })
      });

      if (response.ok) {
        setMostrarFormularioGasto(false);
        setNombreGasto('');
        setDescripcionGasto('');
        setMontoGasto('');
        setParticipantesGasto([]);
        cargarProyectos(); // Recargar los proyectos para ver el nuevo gasto
        alert('Gasto creado exitosamente');
      } else {
        const data = await response.json();
        alert(data.message || 'Error al crear el gasto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el gasto');
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
            
            <button className="boton-agregar-gasto" onClick={() => {
              setProyectoActual(proyecto);
              setProyectoSeleccionado(proyecto.ProyectoId);
              setMostrarFormularioGasto(true);
            }}>
              <FontAwesomeIcon icon={faCirclePlus} />
              Añadir gasto
            </button>

            {proyecto.Gastos && (() => {
              try {
                const gastosData = typeof proyecto.Gastos === 'string' ? 
                  JSON.parse(proyecto.Gastos) : 
                  proyecto.Gastos;
                
                return gastosData.map(gasto => (
                  <div className="gasto" key={gasto.GastoId}>
                    <h2>{gasto.Nombre}</h2>
                    <p className="descripcion-gasto">{gasto.Descripcion}</p>
                    <p className="fecha-gasto">{new Date(gasto.Fecha).toLocaleDateString()}</p>
                    <p className="acreedor-gasto">{`${gasto.AcreedorNombre} ${gasto.AcreedorApellido}`}</p>
                    <p className="subtotal-gasto">{gasto.MontoTotal}</p>

                    <h2>Participantes</h2>
                    <div className="tabla-grid">
                      <div className="tabla-header">
                        <div>Nombre</div>
                        <div>Porcentaje</div>
                        <div>Deuda</div>
                      </div>
                      
                      {(() => {
                        try {
                          const participantesData = typeof gasto.ParticipantesGasto === 'string' ? 
                            JSON.parse(gasto.ParticipantesGasto) : 
                            gasto.ParticipantesGasto;

                          return participantesData.map(participante => (
                            <div className="tabla-row" key={participante.UsuarioId}>
                              <div>{`${participante.Nombre} ${participante.Apellido}`}</div>
                              <div>{`${participante.PorcentajeDeuda}%`}</div>
                              <div>${(gasto.MontoTotal * participante.PorcentajeDeuda / 100).toFixed(2)}</div>
                            </div>
                          ));
                        } catch (error) {
                          console.error('Error al parsear participantes:', error);
                          return null;
                        }
                      })()}
                    </div>
                  </div>
                ));
              } catch (error) {
                console.error('Error al parsear gastos:', error);
                return null;
              }
            })()}
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

        {mostrarFormularioGasto && proyectoActual && (
          <div className="modal-overlay" onClick={() => {
            setMostrarFormularioGasto(false);
            setProyectoActual(null);
          }}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <FontAwesomeIcon 
                icon={faTimes} 
                className="cerrar-modal" 
                onClick={() => {
                  setMostrarFormularioGasto(false);
                  setProyectoActual(null);
                }}
              />
              <h2>Crear Nuevo Gasto</h2>
              <form onSubmit={handleSubmitGasto}>
                <input
                  type="text"
                  className="input-proyecto"
                  placeholder="Nombre del gasto"
                  value={nombreGasto}
                  onChange={(e) => setNombreGasto(e.target.value)}
                  required
                />
                
                <textarea
                  className="input-proyecto"
                  placeholder="Descripción del gasto"
                  value={descripcionGasto}
                  onChange={(e) => setDescripcionGasto(e.target.value)}
                  required
                />

                <input
                  type="number"
                  className="input-proyecto"
                  placeholder="Monto total"
                  value={montoGasto}
                  onChange={(e) => setMontoGasto(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />

                <div className="select-acreedor">
                  <h3>¿Quién pagó el gasto?</h3>
                  <select 
                    className="input-proyecto"
                    required
                    onChange={(e) => setAcreedorId(parseInt(e.target.value))}
                  >
                    <option value="">Seleccione quien pagó</option>
                    {proyectoActual.Participantes?.map((participante) => (
                      <option key={participante.UsuarioId} value={participante.UsuarioId}>
                        {`${participante.Nombre} ${participante.Apellido}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="participantes-gasto">
                  <h3>Participantes del Gasto</h3>
                  {proyectoActual.Participantes?.map((participante) => (
                    <div key={participante.UsuarioId} className="participante-gasto-item">
                      <div className="participante-info">
                        <input
                          type="checkbox"
                          onChange={(e) => handleParticipanteGastoChange(participante.UsuarioId, e.target.checked)}
                        />
                        <span>{`${participante.Nombre} ${participante.Apellido}`}</span>
                      </div>
                      <input
                        type="number"
                        placeholder="Porcentaje"
                        min="0"
                        max="100"
                        disabled={!participantesGasto.some(p => p.usuarioId === participante.UsuarioId)}
                        onChange={(e) => handlePorcentajeChange(participante.UsuarioId, e.target.value)}
                      />
                    </div>
                  ))}
                  {participantesGasto.length > 0 && (
                    <div className="total-porcentaje">
                      Total: {participantesGasto.reduce((sum, p) => sum + (parseFloat(p.porcentajeDeuda) || 0), 0)}%
                    </div>
                  )}
                </div>

                <button type="submit" className="boton-crear">
                  Crear Gasto
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
