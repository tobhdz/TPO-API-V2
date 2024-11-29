import { useState, useEffect, useContext } from "react";
import './Finanzas.css';
import '../CardGastos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexto/UserContext';

export default function Finanzas() {
    const [finanzas, setFinanzas] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
    const { updateUser, balance } = useContext(UserContext);
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

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

    useEffect(() => {
        obtenerFinanzas();
    }, []);

    const handlePagar = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/finanzas/pagar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    gastoId: gastoSeleccionado.GastoId
                })
            });

            const data = await response.json();

            if (response.ok) {
                updateUser({ newBalance: data.nuevoBalance });
                await obtenerFinanzas();
                setMostrarConfirmacion(false);
                setGastoSeleccionado(null);
                setMostrarNotificacion(true);
                setTimeout(() => setMostrarNotificacion(false), 3000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar el pago');
        }
    };

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
                                    <button onClick={() => {
                                        setGastoSeleccionado(gasto);
                                        setMostrarConfirmacion(true);
                                    }}>Pagar</button>
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
            {mostrarConfirmacion && gastoSeleccionado && (
                <div className="modal-overlay" onClick={() => setMostrarConfirmacion(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            className="cerrar-modal" 
                            onClick={() => setMostrarConfirmacion(false)}
                        />
                        <h3>Confirmar Pago</h3>
                        <p>¿Estás seguro que deseas pagar este gasto?</p>
                        <div className="detalles-pago">
                            <p><strong>Gasto:</strong> {gastoSeleccionado.Nombre}</p>
                            <p><strong>Proyecto:</strong> {gastoSeleccionado.NombreProyecto}</p>
                            <p><strong>Monto a pagar:</strong> ${(gastoSeleccionado.MontoTotal * gastoSeleccionado.PorcentajeDeuda / 100).toFixed(2)}</p>
                            <p className="saldo-actual"><strong>Saldo actual:</strong> ${balance.toFixed(2)}</p>
                        </div>
                        <div className="botones-confirmacion">
                            <button onClick={handlePagar}>Confirmar</button>
                            <button onClick={() => setMostrarConfirmacion(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {mostrarNotificacion && (
                <div className="notificacion">
                    ¡Pago exitoso!
                </div>
            )}
        </div>
    );
}