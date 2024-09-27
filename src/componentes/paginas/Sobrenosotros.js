import React, { useEffect } from 'react';
import './Sobrenosotros.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUserGroup, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Testimonial from '../Testimonial';
import { useLocation } from 'react-router-dom';

function Sobrenosotros() {
  const location = useLocation();

  // Este efecto se encargará de hacer scroll a la sección correspondiente
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
        
        <h3 id="que-es"><FontAwesomeIcon icon={faHandshake} /> ¿Qué es ShareBill?</h3>
        <p>
          ShareBill es una aplicación web diseñada para simplificar el proceso de compartir gastos en grupo. Los usuarios pueden subir tickets de compras y automáticamente calcular cuánto debe aportar cada integrante del grupo. Con ShareBill, despedite de los cálculos manuales y los malentendidos. Es una plataforma fácil de usar que garantiza que todos paguen lo justo de manera rápida y sencilla. Ideal para viajes, cenas, eventos o cualquier situación donde los gastos sean compartidos.
        </p>
        
        <h3 id="testimoniales"><FontAwesomeIcon icon={faUserGroup} /> Testimoniales</h3>
        <p>
          <Testimonial   
            frase="¡ShareBill hizo que nuestra cena de grupo fuera mucho más fácil! No más cálculos confusos ni discusiones. Todos sabemos exactamente cuánto debemos."   
            autor="Laura Martínez"   
            quien="Cliente satisfecha"  
          />  
          <Testimonial   
            frase="Usar ShareBill para gestionar los gastos de nuestro viaje fue una bendición. Cada vez que subía un ticket, la aplicación se encargaba del resto. ¡Recomendadísimo!"   
            autor="Carlos López"   
            quien="Viajero frecuente"  
          />  
          <Testimonial   
            frase="Como organizador de eventos, ShareBill ha simplificado mi vida. Ahora puedo centrarme en disfrutar, sabiendo que todos los gastos están bien divididos."   
            autor="Ana Torres"   
            quien="Organizadora de eventos"  
          />
        </p> 

        <h3 id="faqs"><FontAwesomeIcon icon={faCircleQuestion} /> FAQs</h3>
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
  );
}

export default Sobrenosotros;
