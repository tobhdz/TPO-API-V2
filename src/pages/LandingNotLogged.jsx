import { Box, Card, Container, Typography,CardActionArea, CardActions, CardContent, CardMedia } from "@mui/material";
import '../App.css';
import Hero from "../components/Hero";

export default function Home() {
    return(
        <div className="landing">
            <Hero></Hero>
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

//las cards creo podrian pasarse x props y realizarse mediante un map como es en el caso de los bootnes de la barra de navegacion