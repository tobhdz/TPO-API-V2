import { Link } from "react-router-dom";
import './Boton.css';

export default function Boton({ className, type, title, link, action }) {
  return (
    <>
      {link ? (
        <Link to={link} className={className}>
          {title}
        </Link>
      ) : (
        <button 
          className={className} 
          type={type} 
          // Verifica si `action` existe, si no, no ejecuta nada.
          onClick={action ? action : null} 
        >
          {title}
        </button>
      )}
    </>
  );
}


// "type" va a ser button si es un botón común o submit para un formulario
