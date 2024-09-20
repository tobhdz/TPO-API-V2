import { Box, Button, Container, IconButton, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useState } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FormularioContacto from "./FormularioContacto";

export default function Contacto() {
    

    
    
    return(
            <Container
            maxWidth="lg"
            sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <FormularioContacto
                    maxWidth="lg"></FormularioContacto>
                    <Box sx={{display:"grid"}}>
                        <IconButton><WhatsAppIcon fontSize="large"/></IconButton>
                        <Typography variant="h6">Nombre Empresa</Typography>
                        <Typography variant="p">direccion</Typography>
                    </Box>
                    
            </Container>
                    

            

    )
}