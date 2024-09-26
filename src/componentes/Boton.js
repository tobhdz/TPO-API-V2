import { Link } from "react-router-dom";
import './Boton.css';

export default function Boton({ className, type, title, link }) {
  return (
    <>
      {link ? (
        <Link to={link} className={className}>
          {title}
        </Link>
      ) : (
        <button className={className} type={type}>
          {title}
        </button>
      )}
    </>
  );
}

// "type" va a ser button si es un botón común o submit para un formulario
