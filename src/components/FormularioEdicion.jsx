import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function FormularioEdicion() {

    const [nombre, setNombre]=useState("");
    const[descripcion, setDescripcion]=useState("");

    return(
        <div>
            <Container
            maxWidth="sm">
                <Box
                sx={{display: "grid", gap:4,boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)",borderRadius:"10px", padding:4}}
                component="form"
                >
                    <Typography
                    variant="h5">Editar Proyecto</Typography>

                    <TextField
                    id="projectName"
                    label="Nombre del Proyecto"
                    type="text"
                    required
                    value={nombre}
                    onChange={((e)=>{setNombre(e.target.value)})}></TextField>

                    <TextField
                    id="start"
                    helperText="Fecha de Inicio"
                    type="date"></TextField>

                    
                    <TextField
                    id="end"
                    helperText="Fecha de Finalizacion"
                    type="date"></TextField>

                    <TextField></TextField>

                    <TextField
                    multiline
                    id="description"
                    label="Descripcion.."
                    type="text"
                    rows={4}
                    value={descripcion}
                    onChange={((e)=>{setDescripcion(e.target.value)})}>

                    </TextField>
                </Box>
            </Container>
            <Container>
                <Box>
                    <Typography variant="h5">Editar Miembros</Typography>
                    <div>
                        <Typography>Email</Typography>
                        <Typography>Participacion</Typography>
                        
                    </div>
                </Box>
            </Container>
            
        </div>
    )
}