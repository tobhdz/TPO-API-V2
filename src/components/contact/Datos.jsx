import { Box, IconButton, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


export default function Datos() {
    return(
        <Box sx={{display:"grid"}}>
                        <IconButton><WhatsAppIcon fontSize="large"/></IconButton>
                        <Typography variant="h6">Nombre Empresa</Typography>
                        <Typography variant="p">direccion</Typography>
        </Box>
    )
}