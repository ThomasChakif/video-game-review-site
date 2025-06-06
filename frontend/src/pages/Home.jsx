import { useState, useEffect } from "react"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import '../styles/Home.css'
import massEffect2Cover from '../img/MassEffect2_cover.PNG';

function Home() {

    const [gameData, setGameData] = useState([])

    const imageMap = {
        "1": massEffect2Cover
    };


    useEffect(() => {
        fetch('../gameData.json')
        .then(res => res.json())
        .then(data => setGameData(data.games))
    })

    return <div className='page'>
        <Grid container direction = "row" spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            {gameData.map((game) => (
                <Grid className = 'test' item key={game.game_id} 
                sx={{ 
                    backgroundImage:`url(${imageMap[game.game_id]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "500px",
                    postition: "relative",
                    margin: "6rem", //need margin for proper row spacing
                    borderRadius:'20px',
                    borderColor: 'white',
                    borderStyle: 'solid',
                    width: "300px"
                }}> <p style={{
                        color: 'black',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        margin: 0,
                        letterSpacing: '0.5px',
                        background: 'white',
                        borderRadius:'20px',
                        borderColor: 'white',
                        borderStyle: 'solid',
                        textAlign: 'center'
                    }}>{game.game_name}
                    </p>
                </Grid>
            ))}
        </Grid>
    </div>
}

export default Home