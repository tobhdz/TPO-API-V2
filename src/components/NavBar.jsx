import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { Drawer } from '@mui/material';
import NavListDrawer from './NavListDrawer';
import '../App.css';

export default function NavBar({navLinks}) {

    const[open, setOpen]=useState(false);


    return(
        <>
            <Box >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            color="inherit"
                            sx={{display:{xs:"flex", sm:"none"}}}
                            onClick={()=>{setOpen(true)}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Box sx={{display:{xs: "none", sm:"block", justifyContent:"space-between"}, ml:4, mr:4 }}>
                            {
                                navLinks.map(item=>(
                                    <Button 
                                    className='btnNav'
                                    color="secondary" 
                                    variant='contained'
                                    key={item.title} 
                                    component={NavLink} 
                                    to={item.path} 
                                    >{item.title}</Button>
                                ))
                            }
                        </Box>
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer 
            open={open} 
            anchor="left" 
            onClose={()=>setOpen(()=>setOpen(false))}  
            sx={{display:{xs:"flex", sm:"none"}}}>
                <NavListDrawer 
                navLinks={navLinks} 
                NavLink={NavLink} setOpen={setOpen}/>
            </Drawer>
        </>
    )
}