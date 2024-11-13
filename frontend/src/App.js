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
import Proyectos from './componentes/paginas-app/Proyectos.js';
import Configuracion from './componentes/paginas-app/Configuracion.js';
import { UserProvider } from './contexto/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBell, faWallet, faCommentsDollar, faHandHoldingDollar, faGear } from '@fortawesome/free-solid-svg-icons';
import EditarGasto from './componentes/paginas-app/EditarGasto.js';
import Notificaciones from './componentes/paginas-app/Notificaciones.js';
import Registrado from './componentes/paginas/Registrado.js';


// Rutas visibles en el navbar
const menuLinks=[
  {title:"Inicio ", path:"/"},
  {title:"Sobre nosotros ", path:"/sobrenosotros"},
  {title:"Contacto ", path:"/contacto"},
  {title:"Ingresar ", path:"/ingresar"},
];

const menuAppLinks = [
  { title: <><FontAwesomeIcon icon={faHouse} /> Inicio</>, path: "/app" },
  { title: <><FontAwesomeIcon icon={faBell} /> Notificaciones</>, path: "/notificaciones" },
  { title: <><FontAwesomeIcon icon={faWallet} /> Finanzas</>, path: "/finanzas" },
  { title: <><FontAwesomeIcon icon={faCommentsDollar} /> Proyectos</>, path: "/proyectos" },
  { title: <><FontAwesomeIcon icon={faHandHoldingDollar} /> Crear gasto</>, path: "/creargasto" },
  { title: <><FontAwesomeIcon icon={faGear} /> Configuración</>, path: "/configuracion" },
];

// Links para la condición de visibilidad del nav
const menuVisibleLinks = ["/", "/sobrenosotros", "/contacto", "/ingresar", "/registrarse", "/registrado"];
const menuAppVisibleLinks = ["/app", "/notificaciones", "/finanzas", "/creargasto", "/proyectos", "/configuracion", "/configuracion", "/editargasto"];

function App() {
  const location = useLocation();

  const isMenuAppLink = menuAppVisibleLinks.includes(location.pathname);
  const isMenuLink = menuVisibleLinks.includes(location.pathname);


  return (
    <UserProvider>
      <div className="App">
        {isMenuAppLink ? <NavbarApp links={menuAppLinks} /> : isMenuLink ? <Navbar links={menuLinks} /> : null}
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="/sobrenosotros" element={<Sobrenosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/registrado" element={<Registrado />} />
        </Routes>
        <div className="app-container">
          <Routes>
            <Route path="/app" element={<Sharebill />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path='/finanzas' element={<Finanzas/>}/>
            <Route path='/creargasto' element={<CrearGasto/>}/>
            <Route path='/proyectos' element={<Proyectos/>}/>
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path='/editargasto' element={<EditarGasto/>}/>
          </Routes>
        </div>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;