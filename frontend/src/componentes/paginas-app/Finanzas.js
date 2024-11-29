import { useState, useEffect } from "react";
import './Finanzas.css';
import '../CardGastos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function Finanzas() {
    const [finanzas, setFinanzas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerFinanzas = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:4000/api/finanzas', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener finanzas');
                }

                const data = await response.json();
                setFinanzas(data);
            } catch (error) {
                setError(error.message);
            }
        };

        obtenerFinanzas();
    }, []);

    return (
        <div className="finanzas-container">
            
            <div className="finanzas-box">
                <h1>Finanzas</h1>
                {error && <p className="error">{error}</p>}
                
                <div className="card-container">
                    <h2>Cuentas por pagar</h2>
                    {finanzas.map((gasto) => (
                        <div 
                            key={gasto.GastoId} 
                            className={`finanzas-card ${gasto.EstadoDeuda ? 'saldada' : 'pendiente'}`}
                        >
                            <div className="finanzas-info">
                                <h5>{gasto.Nombre}</h5>
                                <div className="finanzas-detalles">
                                    <span>Proyecto: {gasto.NombreProyecto}</span>
                                    <span>Acreedor: {gasto.AcreedorNombre} {gasto.AcreedorApellido}</span>
                                </div>
                                <p className="subtotal-card">
                                    ${(gasto.MontoTotal * gasto.PorcentajeDeuda / 100).toFixed(2)}
                                </p>
                            </div>
                            {!gasto.EstadoDeuda && (
                                <div className="finanzas-botones">
                                    <button>Pagar</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}