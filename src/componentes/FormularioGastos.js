import React, { useContext, useState, useEffect } from 'react';
import './FormularioGastos.css';
import Boton from './Boton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono de "x"
import { UserContext } from '../contexto/UserContext';

export default function FormularioGastos() {
  const { user, gastos, addGasto } = useContext(UserContext);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [presupuesto, setPresupuesto] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Estado para manejar los participantes
  const [participantes, setParticipantes] = useState([]);
  const [emailParticipante, setEmailParticipante] = useState('');
  const [porcentajeParticipante, setPorcentajeParticipante] = useState(0);
  const [porcentajeTotal, setPorcentajeTotal] = useState(0); // Mantener el total de los porcentajes añadidos

  // Validación de email usando una expresión regular
  const emailValido = (email) => /\S+@\S+\.\S+/.test(email);

  // Validación para asegurarse de que la fecha límite no es anterior a la fecha de inicio
  const fechasValidas = fechaInicio && fechaVencimiento && new Date(fechaVencimiento) >= new Date(fechaInicio);

  // Validar que el presupuesto solo admita números
  const presupuestoValido = !isNaN(presupuesto) && presupuesto > 0;

  // Recalcular el monto de pago de cada participante cuando el presupuesto cambie
  useEffect(() => {
    const actualizarPagosParticipantes = () => {
      const participantesActualizados = participantes.map((p) => ({
        ...p,
        pago: presupuesto > 0 ? (parseFloat(p.porcentaje) * parseFloat(presupuesto)) / 100 : 0, // Si el presupuesto es 0, el pago será 0
      }));
      setParticipantes(participantesActualizados);
    };
    actualizarPagosParticipantes();
  }, [presupuesto, participantes]); // Ejecuta cuando el presupuesto o los participantes cambian

  // Función para manejar el submit del formulario y crear un objeto "gasto"
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fechasValidas) {
      alert('La fecha límite no puede ser anterior a la fecha de inicio');
      return;
    }

    if (!presupuestoValido) {
      alert('El presupuesto debe ser un número mayor a 0');
      return;
    }

    const gasto = {
      nombre: nombreProyecto,
      descripcion: descripcion,
      monto: parseFloat(presupuesto),
      fechaInicio: fechaInicio,
      fechaVencimiento: fechaVencimiento,
      participantes: participantes,
    };

    if (!user.gastos) {
      user.gastos = [];
    }
    addGasto(gasto);
  };

  // Función para añadir un participante al array de participantes
  const handleAgregarParticipante = (e) => {
    e.preventDefault();

    if (!emailValido(emailParticipante)) {
      alert('Por favor ingrese un email válido.');
      return;
    }

    const nuevoPorcentajeTotal = porcentajeTotal + parseFloat(porcentajeParticipante);

    if (nuevoPorcentajeTotal > 100) {
      alert('La suma de los porcentajes no puede superar el 100%.');
      return;
    }

    const nuevoParticipante = {
      email: emailParticipante,
      porcentaje: parseFloat(porcentajeParticipante),
      pago: presupuesto > 0 ? (parseFloat(presupuesto) * parseFloat(porcentajeParticipante)) / 100 : 0, // Cálculo inicial
    };

    setParticipantes([...participantes, nuevoParticipante]);
    setPorcentajeTotal(nuevoPorcentajeTotal); // Actualizar el total de porcentajes
    setEmailParticipante('');
    setPorcentajeParticipante(0);
  };

  // Función para eliminar un participante de la lista
  const handleEliminarParticipante = (index) => {
    const participanteAEliminar = participantes[index];
    const nuevoPorcentajeTotal = porcentajeTotal - participanteAEliminar.porcentaje;

    const nuevosParticipantes = participantes.filter((_, i) => i !== index);

    setParticipantes(nuevosParticipantes);
    setPorcentajeTotal(nuevoPorcentajeTotal); // Actualizar el total de porcentajes
  };

  const handleReset = () => {
    setNombreProyecto('');
    setPresupuesto(0);
    setDescripcion('');
    setFechaInicio('');
    setFechaVencimiento('');
    setParticipantes([]);
    setPorcentajeTotal(0); // Reiniciar el porcentaje total
  };

  return (
    <div className='gastos-form-container'>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            id='nombre-proyecto'
            placeholder='Nombre del Proyecto'
            required
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
          />

          <div>
            <label className='form-label'>Fecha Inicio</label>
            <input
              type='date'
              id='start-date'
              required
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div>
            <label className='form-label'>Fecha Límite</label>
            <input
              type='date'
              id='end-date'
              required
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
            />
          </div>

          <div>
            <label className='form-label'>Monto del gasto</label>
            <input
              type='number'
              id='presupuesto'
              required
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
            />
          </div>

          <textarea
            placeholder='Deje una descripción aquí...'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {/* Formulario de Participantes */}
          <div className='participantes-section'>
            <h4>Añadir participantes</h4>

            <div className='participantes-form'>
              <input
                type='email'
                placeholder='Email del participante'
                value={emailParticipante}
                onChange={(e) => setEmailParticipante(e.target.value)}
              />
              <input
                type='number'
                placeholder='Porcentaje de participación'
                value={porcentajeParticipante}
                onChange={(e) => setPorcentajeParticipante(e.target.value)}
                min="0"
                max="100"
              />
              <button onClick={handleAgregarParticipante}>Añadir</button>
            </div>

            {/* Mostrar lista de participantes añadidos */}
            <ul>
              {participantes.map((p, index) => (
                <li key={index}>
                  {p.email} - {p.porcentaje}% (Debe pagar: ${p.pago.toFixed(2)})
                  <FontAwesomeIcon
                    icon={faTimes} // Usamos el icono de "x"
                    className='eliminar-icono'
                    onClick={() => handleEliminarParticipante(index)} // Eliminar participante
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </li>
              ))}
            </ul>
            <p className='participantes-sub'>Porcentaje total de participación: {porcentajeTotal}%</p>
          </div>

          <div className='form-botones'>
            <Boton className='boton2' type='submit' title='Agregar Gasto' />
            <Boton className='boton2' type='button' title='Reestablecer' onClick={handleReset} />
          </div>
        </form>
      </div>
    </div>
  );
}
