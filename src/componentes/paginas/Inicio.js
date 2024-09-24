import React from 'react'
import Encabezado from '../Encabezado'
import './Inicio.css';
import Tarjeta from '../Tarjeta';

function Inicio() {
  return (
    <div>
      <Encabezado />
      <div className="seccion-inicio">
      <Tarjeta
        imageSrc="https://via.placeholder.com/800x335"
        title="Título"
        bodyText="Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda veniam repellat, explicabo id cum esse debitis eius est voluptatum earum dicta possimus, enim obcaecati rerum! Fugit sit sint quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda veniam repellat, explicabo id cum esse debitis eius est voluptatum earum dicta possimus, enim obcaecati rerum! Fugit sit sint quisquam."
      />
      </div>
    </div>
  )
}

export default Inicio

/* Replicar el modelo de seccion y tarjetas con
otros estilos.
Pensar más ideas para llenar la landing page */