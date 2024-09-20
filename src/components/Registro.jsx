import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Registro() {

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (validateEmail(email)){
          setError({
            error: false,
            message:""
          })
          console.log("email correcto");
          
        }else{
          setError({
            error: true,
            message: "Formato de Email incorrecto"
          })
        }
    }

    const[name, setName]=useState("")
    const[surname, setSurname]= useState("")
    const[email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const[error, setError]= useState({
        error: false,
        message:"Ingrese un mail valido"
      });

    const validateEmail=(email)=>{
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
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
                onSubmit={handleSubmit}>
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
                    helperText={error.message}
                    error={error.error}
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
                    color="primary"
                    onClick={handleSubmit}>
                        REGISTRARME
                    </Button>


                </Box>

            </Container>
        </>
    )
}