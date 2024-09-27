import React from 'react'
import Encabezado from '../Encabezado'
import './Inicio.css';
import Tarjeta from '../Tarjeta';

function Inicio() {
  return (
    <div className='inicio-container'>
      <Encabezado />
      <div className="inicio-body">
        <div className="seccion-inicio">
        <Tarjeta
          imageSrc="/img/landing1.png"
          title="Gastos claros, cuentas justas"
          bodyText="En la vida cotidiana, los gastos compartidos pueden llevar a confusiones y malentendidos. Con Sharebill venimos a transformamor la forma en que manejas tus finanzas en grupo."

          bodyText2="Con Sharebill, compartir gastos nunca ha sido tan fácil y claro. Únete hoy y comienza a disfrutar de una experiencia sin complicaciones en tus actividades sociales. ¡Simplifica tus gastos compartidos y ahorra tiempo para lo que realmente importa!"/>
        </div>
        <div className="seccion-inicio">
        <Tarjeta
          bodyText="Sube tus Tickets. Captura y carga fácilmente los tickets de compras, ya sea desde cenas, viajes o eventos."

          bodyText2="Calcula Contribuciones. Sharebill automáticamente reparte los gastos entre los miembros del grupo, asegurando que todos contribuyan de manera justa."
          
          bodyText3="Mantente Organizado. Lleva un registro de todos los gastos compartidos y visualiza la deuda de cada integrante con un solo clic."/>
        </div>
      </div>
    </div>
  )
}

export default Inicio