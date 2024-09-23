import React from 'react';
import './App.css';
import Navbar from './componentes/Navbar.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import Inicio from './componentes/paginas/Inicio.js';
import Sobrenosotros from './componentes/paginas/Sobrenosotros.js';
import Contacto from './componentes/paginas/Contacto.js';
import Ingresar from './componentes/paginas/Ingresar.js';
import Footer from './componentes/Footer.js';
import Sharebill from './componentes/paginas-app/Sharebill.js';
import Registrarse from './componentes/paginas/Registrarse.js';

function App() {
  const location = useLocation(); // Obtiene la ubicación actual

  return (
    <div className="App">
      {location.pathname !== "/app" && <Navbar />}
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="/sobrenosotros" element={<Sobrenosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/app" element={<Sharebill />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
