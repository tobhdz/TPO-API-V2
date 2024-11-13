// Testimonial.js  
import React from 'react';  
import './Testimonial.css';  

const Testimonial = ({ frase, autor, quien }) => {  
    return (  
        <div className="testimonial-container">  
            <p className="frase">"{frase}"</p>  
            <p className="autor">{autor}</p>  
            <p className="quien">{quien}</p>  
        </div>  
    );  
};  

export default Testimonial;