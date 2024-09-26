import { useState } from "react";

export default function Boton({className, type, title}) {
    
    return(
        <div>
            <button
            className={className}
            type={type}
            
            >
                {title}
            </button>
        </div>
    )
}