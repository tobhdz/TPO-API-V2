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
          bodyText="En la vida cotidiana, los gastos compartidos pueden llevar a confusiones y malentendidos. Con Sharebill venimos a transformamor la forma en que manejás tus finanzas en grupo."

          bodyText2="Con nosotros, compartir gastos nunca ha sido tan fácil y claro. Unite hoy y empezá a disfrutar de una experiencia sin complicaciones en tus actividades sociales. ¡Simplificá tus gastos compartidos y ahorrá tiempo para lo que realmente importa!"/>
        </div>
        <div className="seccion-inicio">
        <Tarjeta
          bodyText="Subí tus tickets. Capturá y cargá fácilmente los tickets de compras, ya sea desde cenás, viajes o eventos."

          bodyText2="Calculá contribuciones. Sharebill automáticamente reparte los gastos entre los miembros del grupo, asegurando que todos contribuyan de manera justa."
          
          bodyText3="Mantenete organizado. Llevá un registro de todos los gastos compartidos y visualizá la deuda de cada integrante con un solo clic."/>
        </div>
      </div>
    </div>
  )
}

export default Inicio