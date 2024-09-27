import { useState } from "react";

export default function Boton({className, type, title, action}) {
    
    return(
        <div>
            <button
            className={className}
            type={type}
            onClick={action}         
            >
                {title}
            </button>
        </div>
    )
}