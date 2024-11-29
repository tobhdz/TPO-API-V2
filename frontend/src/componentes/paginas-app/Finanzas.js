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

    // Separar las finanzas en pendientes y saldadas
    const cuentasPendientes = finanzas.filter(gasto => !gasto.EstadoDeuda);
    const cuentasSaldadas = finanzas.filter(gasto => gasto.EstadoDeuda);

    return (
        <div className="finanzas-container">
            <div className="finanzas-box">
                <h1>Finanzas</h1>
                {error && <p className="error">{error}</p>}
                
                <div className="card-container">
                    <h2>Cuentas por pagar</h2>
                    {cuentasPendientes.length === 0 ? (
                        <p className="no-gastos">No hay cuentas pendientes</p>
                    ) : (
                        cuentasPendientes.map((gasto) => (
                            <div key={gasto.GastoId} className="finanzas-card pendiente">
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
                                <div className="finanzas-botones">
                                    <button>Pagar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="card-container">
                    <h2>Cuentas saldadas</h2>
                    {cuentasSaldadas.length === 0 ? (
                        <p className="no-gastos">No hay cuentas saldadas</p>
                    ) : (
                        cuentasSaldadas.map((gasto) => (
                            <div key={gasto.GastoId} className="finanzas-card saldada">
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
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}