import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import '../App.css';

export default function Login() {

    const [user, setUser]=useState("");
    const [password, setPassword]= useState("");

    const onSubmit=()=>{

    }

    return(
        <>
            <Container
            className="loginContainer"
            maxWidth="xs"
            sx={{display: "grid", gap:4, mt: 3}}>
                <Box
                className="loginBox"
                sx={{display:"grid", gap:4, borderStyle:"outset",borderRadius:"10px", padding:4}}
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}>
                    <Typography variant="h4" sx={{mt:2, mb:2}} textAlign={"center"}>Ingresar</Typography>
                
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
                    required
                    fullWidth
                    onChange={((e)=>{setPassword(e.target.value)})}
                    value={password}>
                    </TextField>

                    <Button
                    type="submit" 
                    variant="contained" 
                    color="inherit">
                        INGRESAR
                    </Button>


                </Box>

            </Container>
        </>
    )
}