import FormularioContacto from "./FormularioContacto";
import Datos from "./Datos";
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