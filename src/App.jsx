import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Registro from './components/Registro';
import Contacto from './components/Contacto';
import Home from './components/Home';



const navLinks=[{
  title: "Contacto", path:"/contacto", icon:""
},
{
  title:"INGRESAR", path:"/ingresar", icon:""
},
{
  title:"REGISTRARME", path:"/registrarme", icon:""
}]

function App() {
  return (
    <div className="App">
      <NavBar navLinks={navLinks}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/ingresar" element={<Login/>}></Route>
        <Route path="/registrarme" element={<Registro/>}></Route>
        <Route path="/contacto" element={<Contacto/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
