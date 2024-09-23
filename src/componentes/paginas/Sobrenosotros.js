import React from 'react'
import './Sobrenosotros.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUserGroup, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';



function Sobrenosotros() {
  return (
    <div className="sn-container">
      <div className="sn-h-container">
        <div className="sn-header">
          <h2>Sobre nosotros</h2>
          <p>Gastos claros, cuentas justas</p>
        </div>
      </div>
      <div className="sn-cuerpo">
        <p>
          En ShareBill, nos apasiona simplificar la gestión de los gastos compartidos. Sabemos que organizar los pagos entre amigos, familiares o compañeros de trabajo puede ser una tarea engorrosa. Por eso, creamos una solución fácil y rápida que elimina el caos de dividir cuentas. Nuestro equipo está dedicado a brindar una experiencia sin complicaciones, transparente y eficiente, para que puedas disfrutar del tiempo con tus seres queridos en lugar de preocuparte por los números.
          </p>
        <h3><FontAwesomeIcon icon={faHandshake} /> ¿Qué es ShareBill?</h3>
        <p>
          ShareBill es una aplicación web diseñada para simplificar el proceso de compartir gastos en grupo. Los usuarios pueden subir tickets de compras y automáticamente calcular cuánto debe aportar cada integrante del grupo. Con ShareBill, despedite de los cálculos manuales y los malentendidos. Es una plataforma fácil de usar que garantiza que todos paguen lo justo de manera rápida y sencilla. Ideal para viajes, cenas, eventos o cualquier situación donde los gastos sean compartidos.
          </p>
        <h3><FontAwesomeIcon icon={faUserGroup} /> Testimoniales</h3>
        <p>
          "Organizar un viaje con amigos siempre era un dolor de cabeza, pero desde que usamos ShareBill, ¡todo es mucho más fácil! Cada uno paga lo que debe sin problemas." – Mariana R.
          "No puedo creer lo rápido que se calculan los gastos. Antes solía tomarme horas dividir las cuentas del departamento. Ahora solo subo el ticket y listo." – Lucas M.
          "Usamos ShareBill para todas nuestras salidas grupales. Es justo, rápido y evita cualquier malentendido." – Carla P.
        </p>
        <h3><FontAwesomeIcon icon={faCircleQuestion} /> FAQs</h3>
        <p>
          <b>¿Cómo funciona ShareBill?</b>
          <p>Es muy sencillo. Sube una foto o archivo del ticket de compra, asigná a cada miembro del grupo los ítems que pagó y ShareBill calculará automáticamente cuánto debe aportar cada persona.</p>

          <b>¿Es necesario registrarse para usar ShareBill?</b>
          <p>Sí, necesitarás crear una cuenta para guardar tus grupos y tickets, pero el proceso de registro es rápido y sencillo.</p>
          
          <b>¿Qué tipos de gastos puedo dividir en ShareBill?</b>
          <p>Podés dividir cualquier tipo de gasto en grupo: desde cenas y salidas hasta alquileres o compras grandes compartidas.</p>

          <b>¿Es seguro usar ShareBill?</b>
          <p>Absolutamente. Protegemos tus datos con tecnología de encriptación avanzada y no compartimos tu información personal con terceros.</p>

          <b>¿Tiene algún costo usar ShareBill?</b>
          <p>Podés usar ShareBill de forma gratuita con opciones básicas. También ofrecemos planes premium con funciones adicionales para usuarios que deseen más herramientas.</p>
        </p>
        </div>
    </div>
  )
}

export default Sobrenosotros


/* Cambiarle el estilo a los testimoniales
Linkear los subtitulos de la página al footer */