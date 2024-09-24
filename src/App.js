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
import Finanzas from './componentes/paginas-app/Finanzas.js';
import NavbarApp from './componentes/NavbarApp.js';
import CrearGasto from './componentes/paginas-app/CrearGasto.js';
import Gastos from './componentes/paginas-app/Gastos.js';

const menuLinks=[
  {title:"Inicio ", path:"/"},
  {title:"Sobre Nosotros ", path:"/sobrenosotros"},
  {title:"Contacto ", path:"/contacto"},
  {title:"Ingresar ", path:"/ingresar"},

]

const menuAppLinks=[
  {title:"Inicio ", path:"/app"},
  {title:"Finanzas ", path:"/finanzas"},
  {title:"Crear gasto ", path:"/creargasto"},
  {title:"Gastos ", path:"/gastos"},

]

function App() {
  const location = useLocation();

  const isMenuAppLink = menuAppLinks.some(link => link.path === location.pathname);
  const isMenuLink = menuLinks.some(link => link.path === location.pathname);

  return (
    <div className="App">
      {isMenuAppLink ? <NavbarApp links={menuAppLinks} /> : isMenuLink ? <Navbar links={menuLinks} /> : null}
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="/sobrenosotros" element={<Sobrenosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/registrarse" element={<Registrarse />} />
        </Routes>
        <div className="app-container">
        <Routes>
          <Route path="/app" element={<Sharebill />} />
          <Route path='/finanzas' element={<Finanzas/>}/>
          <Route path='/creargasto' element={<CrearGasto/>}/>
          <Route path='/gastos' element={<Gastos/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
