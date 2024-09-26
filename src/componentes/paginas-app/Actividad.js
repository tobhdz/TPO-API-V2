import React from 'react';
import './Configuracion.css';

function Actividad() {
  return (
    <div className="actividad-container">
      <p>Saldo disponible: $5000</p>
      <div className="metodos-pago">
        <p>Tarjeta 1: **** **** **** 1234</p>
        <p>Tarjeta 2: **** **** **** 5678</p>
        <button className="boton">Añadir método de pago</button>
      </div>
      <div className="movimientos">
        <p>Movimiento 1: Compra - $50</p>
        <p>Movimiento 2: Depósito - $100</p>
      </div>
    </div>
  );
}

export default Actividad;
