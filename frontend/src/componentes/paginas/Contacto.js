import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contacto.css'

export default function Contacto() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('default_service', 'template_1ldbdz9', form.current, 'qTXQlRmnrHS5PFhz-')
      .then((result) => {
          alert('Tu correo se ha enviado exitosamente.');
      }, (error) => {
          alert(JSON.stringify(error));
      });
  };

  return (
    <div className='contacto-container'>

      <div className="contacto-header">
        <h2>Contacto</h2>
        <ul className="datos">
          <li>Teléfono: +54 (11) 1234-5678</li>
          <li>Email: sharebill@gmail.com</li>
          <li> Av. Juan B. Justo 9200, Cdad. Autónoma de Buenos Aires</li>
        </ul>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className="field">
          <input type="text" placeholder="Nombre" name="from_name" id="from_name" required />
        </div>
        <div className="field">
          <input type="email" placeholder="Correo" name="email_id" id="email_id" required />
        </div>
        <div className="field">
          <textarea name="message" placeholder="Escribe aquí tu mensaje..." id="message" required />
        </div>
        <input type="submit" value="Enviar Correo" />
      </form>
    </div>
  );
}
