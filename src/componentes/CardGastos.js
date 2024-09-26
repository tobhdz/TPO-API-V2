import './CardGastos.css';

export default function CardGastos({title, tipo, className}) {

  
    let suma=0;
    for (let i=0; i<tipo.length; i++){
        suma+= parseFloat(tipo[i].monto);
    }
   

    return(
        <div className="card-container">
            <div className="info-container">
                <h5 className="card-title">{title}</h5>
                <p className="card-sum">Total: ${suma}</p>
                <p className="card-description">Gastos: {tipo.length}</p>
            </div>
            <div className="cardgastos-container">
                {tipo.length==0 && <p>No hay gastos pendientes</p>}
                {
                    tipo.map(item=>(
                        <div 
                        key={item.name}
                        className="gasto-item">
                            <div className='item-info'>
                                <p>{item.name}</p>
                                <p>${item.monto}</p>
                            </div>
                            <div className='item-info'>
                                <p>{item.descripcion}</p>
                                <p>{item.fechaVto}</p>
                            </div>     
                        </div>
                    ))
                }
            </div>
        </div>
    )
}