import { Box, Card, Container, Typography,CardActionArea, CardActions, CardContent, CardMedia } from "@mui/material";
import '../App.css';

export default function Home() {
    return(
        <div >
            <div className="landingNL">
                <Container
                maxWidth="md">
                    <Typography
                    variant="h2"
                    >Gestionar tus gastos nunca fue tan fácil</Typography>
                    <Typography
                    variant="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis commodi sed, doloribus ad quam mollitia est! Ea rerum eveniet necessitatibus voluptatibus nulla ad voluptate, libero dolores modi quis tenetur sit.</Typography>
                </Container>
                <Container>
                    <Typography>img</Typography>
                </Container>
            </div>
            
            <div className="caracteristicas">
                <Container
                maxWidth="xs">
                <Card
                    sx={{
                    transition: "0.2",
                    "&:hover": {
                        transform: "scale(1.05)"
                    },
                    }}>

                    <CardActionArea>
                        <CardMedia component="img" 
                        image="https://via.placeholder.com/200" 
                        height="100" 
                        width="100"
                        alt="img"
                        ></CardMedia>

                        <CardContent>
                            <Typography variant="h5">Card Title</Typography>
                            <Typography component="p" variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Typography>
                        </CardContent>
                    </CardActionArea>

                </Card>
                </Container>
                
                <Container
                maxWidth="xs">
                    
                    <Card
                       
                        sx={{
                        transition: "0.2",
                        "&:hover": {
                            transform: "scale(1.05)"
                        },
                        maxWidth:"xs"}}>
                        <CardActionArea>
                            <CardMedia component="img" 
                            image="https://via.placeholder.com/200" 
                            height="100" 
                            width="100"
                            alt="img"></CardMedia>

                            <CardContent>
                                <Typography variant="h5">Card Title</Typography>
                                <Typography component="p" variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Container>
                
                <Container>
                    <Card
                       
                        sx={{
                        transition: "0.2",
                        "&:hover": {
                            transform: "scale(1.05)"
                        },
                        maxWidth:"xs"}}>

                        <CardActionArea>
                            <CardMedia component="img" 
                            image="https://via.placeholder.com/200" 
                            height="100" 
                            width="100"
                            alt="img"></CardMedia>

                            <CardContent>
                                <Typography variant="h5">Card Title</Typography>
                                <Typography component="p" variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Container>
                
            </div>
            

        </div>
    )
}