import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import '../App.css';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import LandingLogged from "./LandingLogged";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CambiarContrasenia from "./CambiarContrasenia";

export default function Login() {

    const [user, setUser]=useState("");
    const [password, setPassword]= useState("");
    const[visibility, setVisibility]=useState(false);
    
    const handleSubmit=()=>{
        <LandingLogged/>
    }
    const handleVisibility=()=>{
        setVisibility(!visibility)
    }

    return(
        <div>
            <Container
            className="loginContainer"
            maxWidth="xs"
            sx={{display: "grid", gap:4, mt: 3}}
            >
                <Box
                className="loginBox"
                sx={{display:"grid", gap:4,  boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)",borderRadius:"10px", padding:4}}
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}>
                    <Box
                    sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center", }}>
                    <PersonIcon fontSize="large"/>
                    <Typography variant="h4" sx={{mt:2, mb:2}} textAlign={"center"}>Iniciar Sesion</Typography>
                    </Box>
                    
                    <TextField
                        label="Usuario o email"
                        id="user"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        onChange={((e)=>{setUser(e.target.value)})}
                        value={user}>
                    </TextField>
                    
                    <TextField
                    label="Contraseña"
                    id="password"
                    variant="outlined"
                    size="small"
                    type={visibility ? "text":"password"}
                    required
                    fullWidth
                    onChange={((e)=>{setPassword(e.target.value)})}
                    value={password}>  
                    <IconButton onClick={handleVisibility}><VisibilityIcon/></IconButton>                          
                    </TextField>
                    

                    <Link
                    variant="p"
                    >Olvidaste tu contraseña? Cambiar contraseña</Link>

                    <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    onClick={handleSubmit}>
                        INGRESAR
                    </Button>


                </Box>

            </Container>
        </div>
    )
}