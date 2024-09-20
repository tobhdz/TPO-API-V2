import { Box, Button, Container, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function FormularioContacto() {
  
  const[name, setName]=useState("")
  const[surname, setSurname]= useState("")
  const[email, setEmail]=useState("")
  return (
    <Container
        maxWidth="sm"
        sx={{display:"flex", justifyContent:"space-between", mt:3}}>
                  <Box
                  className="contactBox"
                  sx={{display: "grid", gap: 4,boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)",borderRadius:"10px", padding:4}}
                  component="form"
                  autoComplete="off"
                  >
                      <Typography variant="h4" sx={{mt:2, mb:2}}>Contactanos</Typography>
                      <TextField 
                      label="Nombre"
                      id="name"
                      variant="outlined"
                      size="small"
                      value={name}
                      required
                      onChange={((e)=>{setName(e.target.value)})}></TextField>
                      <TextField
                      label="Apellido"
                      id="surname"
                      variant="outlined"
                      size="small"
                      value={surname}
                      required
                      onChange={((e)=>{setSurname(e.target.value)})}></TextField>
                      <TextField
                      label="Email"
                      id="email"
                      variant="outlined"
                      size="small"
                      value={email}
                      required
                      onChange={((e)=>{setEmail(e.target.value)})}></TextField>
                      <TextareaAutosize
                      maxRows={5}></TextareaAutosize>
                      <Button 
                      type="submit"
                      variant="contained"
                      color= "primary"
                      maxWidth="xs"
                      
                      >Enviar</Button>
                  </Box>
      </Container>   
  )
}       
