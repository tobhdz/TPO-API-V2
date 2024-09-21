import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Registro from './pages/Registro';
import Contacto from './pages/Contacto';
import LandingNotLogged from './pages/LandingNotLogged';
import LoginIcon from '@mui/icons-material/Login';
import CambiarContrasenia from './pages/CambiarContrasenia';



const navLinks=[{
  title: "Contacto", path:"/contacto", icon:""
},
{
  title:"INGRESAR", path:"/ingresar", icon:<LoginIcon/>
},
{
  title:"REGISTRARME", path:"/registrarme", icon:""
}]

function App() {
  return (
    <div className="App">
      <NavBar navLinks={navLinks}/>
      <Routes>
        <Route path='/' element={<LandingNotLogged/>}></Route>
        <Route path="/ingresar" element={<Login/>}></Route>
        <Route path="/registrarme" element={<Registro/>}></Route>
        <Route path="/contacto" element={<Contacto/>}></Route>
        <Route path='/cambiarcontrasenia' element={<CambiarContrasenia/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
