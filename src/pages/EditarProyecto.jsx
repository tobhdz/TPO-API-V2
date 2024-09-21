import { Typography } from "@mui/material";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FormularioEdicion from "../components/FormularioEdicion";

export default function EditarProyecto() {
    return(
        <div className="edicion">
            <div className="titular-edicion">
            <EditNoteOutlinedIcon fontSize="large"/>
            <Typography variant="h4">Editar Proyecto</Typography>
            </div>

            <FormularioEdicion></FormularioEdicion>
           
        </div>
    )
}