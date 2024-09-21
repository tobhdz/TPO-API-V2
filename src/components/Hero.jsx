import { Container, Typography } from "@mui/material";

export default function Hero() {
    return(
        <div className="landing-hero">
                <Container
                maxWidth="md"
                >
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
    )
}
