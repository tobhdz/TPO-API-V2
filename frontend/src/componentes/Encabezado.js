import React, { useEffect } from 'react';  
import './Encabezado.css';  
import { Link } from 'react-router-dom';  
import { createNoise3D } from 'simplex-noise'; // Importa la función de creación del ruido  

function Encabezado() {  
  useEffect(() => {  
    const noise3D = createNoise3D();  
    const canvas = document.getElementById('c');  
    const ctx = canvas.getContext('2d');  
    const imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);  
    const data = imgdata.data;  
    let t = 0;  
    
    const colorFactors = {
      red: { x: 110, y: 300, t: 100 },
      green: { x: 140, y: 300, t: 100 },
      blue: { x: 130, y: 330, t: 130 }
    };
    
    const interval = setInterval(() => {  
      for (let x = 0; x < 256; x++) {  
        for (let y = 0; y < 256; y++) {  
          const r = noise3D(x / colorFactors.red.x, y / colorFactors.red.y, t / colorFactors.red.t);  
          const g = noise3D(x / colorFactors.green.x, y / colorFactors.green.y, t / colorFactors.green.t);  
          const b = noise3D(x / colorFactors.blue.x, y / colorFactors.blue.y, t / colorFactors.blue.t);  
          data[(x + y * 256) * 4 + 0] = (b) * 255 / 3;  
          data[(x + y * 256) * 4 + 1] = (b) * 255 / 5;  
          data[(x + y * 256) * 4 + 2] = (b) * 255 / 2;  
          data[(x + y * 256) * 4 + 3] = 255;  
        }  
      }  
      t++;  
      ctx.putImageData(imgdata, 0, 0);  
    }, 30);  

    return () => clearInterval(interval);  
  }, []);  

  return (  
    <div className="encabezado-container">  
      <div className="hero-section">  
        <div className="filtro-canvas">  
          <canvas id="c" width={256} height={256} style={{ width: '100%', height: '100%' }}></canvas>  
        </div>  
        <div className="overlay">  
          <div className="elementos-hero">  
            <h1>Gestionar tus gastos nunca fue tan fácil</h1>  
            <p>Descubre una nueva forma de compartir y olvídate de las discusiones y los malentendidos. Con nuestra app, la gestión de gastos compartidos se convierte en una experiencia sin complicaciones. Simplifica el proceso y disfruta de cada momento sin preocupaciones.</p>  
            <div className="botones">  
              <Link to='/ingresar' className='boton'>  
                Iniciar sesión  
              </Link>  
              <Link to='/registrarse' className='boton'>  
                Registrarse  
              </Link>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default Encabezado;

