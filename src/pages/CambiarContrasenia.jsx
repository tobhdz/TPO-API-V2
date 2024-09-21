import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function CambiarContrasenia() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const [error, setError]=useState({
        error: false,
        message:"Ingrese un mail valido"
    });

    const [passwordError, setPasswordError]=useState({
        passwordError: false,
        passwordMessage: "Ingrese una contraseña valida"
    })

    const validateEmail=(email)=>{
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
    }

    const [visibility, setVisibility]=useState(false);

    const handleVisibility=()=>{
        setVisibility(!visibility);
    }


    return(
        <div>
            <Container
             maxWidth="sm"
             sx={{display: "grid", gap:4, mt: 3}}>
                <Box
                
                maxWidth="sm"
                sx={{display:"grid", gap:4, boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)",borderRadius:"10px", padding:4}}
                component="form"
                autoComplete="off">
                    <Typography variant="h4" sx={{mt:2, mb:2,}} textAlign={"center"}>Cambiar Contraseña</Typography>
                    <TextField
                    id="email"
                    labeL="Email"
                    type="email"
                    onChange={((e)=>{setEmail(e.target.value)})}
                    variant="outlined"
                    size="small"
                    value={email}
                    required
                    error={error.error}
                    helperText={error.message}></TextField>

                    <TextField
                    id="password"
                    label="Contraseña"
                    type={visibility ? "text":"password"}
                    onChange={((e)=>{setPassword(e.target.value)})}
                    variant="outlined"
                    size="small"
                    value={password}
                    required
                    error={passwordError.passwordError}
                    helperText={passwordError.passwordMessage}></TextField>
                    <IconButton onClick={handleVisibility}><VisibilityIcon/></IconButton>

                    <Button
                    variant="contained"
                    color="primary"

                    >Cambiar</Button>

                </Box>
            </Container>
           
        </div>
    )
}