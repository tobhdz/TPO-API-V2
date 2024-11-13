import React, { useState } from 'react';
import './AgregarGasto.css';

const AgregarGasto = ({ participantes, onGuardarGasto }) => {
    const [subtitulo, setSubtitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState(0);
    const [distribucion, setDistribucion] = useState(participantes.map(part => ({
        ...part, porcentaje: 0
    })));

    const handleDistribucionChange = (index, porcentaje) => {
        const nuevaDistribucion = [...distribucion];
        nuevaDistribucion[index].porcentaje = porcentaje;
        setDistribucion(nuevaDistribucion);
    };

    const calcularMontos = () => {
        return distribucion.map(part => ({
            ...part,
            montoAPagar: (monto * part.porcentaje) / 100
        }));
    };

    const guardarGasto = () => {
        if (distribucion.reduce((acc, part) => acc + part.porcentaje, 0) !== 100) {
            alert("La suma de los porcentajes debe ser igual a 100%.");
            return;
        }
        onGuardarGasto({
            subtitulo,
            descripcion,
            monto,
            distribucion: calcularMontos()
        });
    };

    return (
        <div className="agregar-gasto">
            <h2>Añadir Gasto</h2>
            <input value={subtitulo} onChange={e => setSubtitulo(e.target.value)} placeholder="Subtítulo" />
            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />
            <input type="number" value={monto} onChange={e => setMonto(Number(e.target.value))} placeholder="Monto" />

            <h3>Distribuir gasto</h3>
            {distribucion.map((part, index) => (
                <div key={part.email} className="participante">
                    <span>{part.nombre}</span>
                    <input
                        type="number"
                        value={part.porcentaje}
                        onChange={e => handleDistribucionChange(index, Number(e.target.value))}
                        placeholder="%"
                    />
                    <span>Monto: ${((monto * part.porcentaje) / 100).toFixed(2)}</span>
                </div>
            ))}
            <button onClick={guardarGasto}>Guardar Gasto</button>
        </div>
    );
};

export default AgregarGasto;
