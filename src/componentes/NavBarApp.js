import { Link } from "react-router-dom";
import './NavBarApp.css'
import Finanzas from "./paginas-app/Finanzas";


export default function NavBarApp() {
    return(
        <nav className="navBar">

            <ul className="menu">
                <li className="menu-item">
                    <Link to='/finanzas' className="menu-link">Finanzas</Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-link">Algo</Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-link">Algo</Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-link">Configuración</Link>
                </li>
            </ul>
        
        </nav>
    )
}