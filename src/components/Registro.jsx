import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Registro() {

    const[name, setName]=useState("")
    const[surname, setSurname]= useState("")
    const[email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    const onSubmit=()=>{

    }


    return(
        <>
         <Container
            className=""
            maxWidth="xs"
            sx={{display: "grid", gap:4, mt: 3}}>
                <Box
                className=""
                sx={{display:"grid", gap:4, boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)",borderRadius:"10px", padding:4}}
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}>
                    <Typography variant="h4" sx={{mt:2, mb:2,}} textAlign={"center"}>Registrarme</Typography>
                
                    <TextField
                    label="Nombre"
                    id="name"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    onChange={((e)=>{setName(e.target.value)})}
                    value={name}>
                    </TextField>

                    <TextField
                    label="Apellido"
                    id="surname"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    onChange={((e)=>{setSurname(e.target.value)})}
                    value={surname}>
                    </TextField>

                    <TextField
                    label="Email"
                    id="email"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    onChange={((e)=>{setEmail(e.target.value)})}
                    value={email}>
                    </TextField>

                    <TextField
                    label="Contraseña"
                    id="password"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    onChange={((e)=>{setPassword(e.target.value)})}
                    value={password}>
                    </TextField>

                    <Button
                    type="submit" 
                    variant="contained" 
                    color="primary">
                        REGISTRARME
                    </Button>


                </Box>

            </Container>
        </>
    )
}