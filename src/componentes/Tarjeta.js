import React from 'react';  
import './Tarjeta.css';  

function Tarjeta({ imageSrc, title, bodyText, bodyText2, bodyText3 }) {  
    return (  
        <div className="tarjeta">  
            {imageSrc ? (  
                <img src={imageSrc} alt={title} className="tarjeta-imagen" />  
            ) : null}  
            <div className="tarjeta-contenido">  
                {title ? (
                <h2 className="tarjeta-titulo">{title}</h2>) : null}  
                <p className="tarjeta-cuerpo">{bodyText}</p>  
                <p className="tarjeta-cuerpo">{bodyText2}</p>
                {bodyText3 ? (<p className="tarjeta-cuerpo">{bodyText3}</p>) : null}
            </div>  
        </div>  
    );  
}  

export default Tarjeta;