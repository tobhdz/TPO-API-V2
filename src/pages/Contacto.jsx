import FormularioContacto from "../components/contact/FormularioContacto";
import Datos from "../components/contact/Datos";
import { Container } from "@mui/material";

export default function Contacto() {
    

    
    
    return(
            <Container
            maxWidth="lg"
            sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <FormularioContacto
                    maxWidth="lg"></FormularioContacto>
                    
            <Datos></Datos>        
            </Container>    

    )
}