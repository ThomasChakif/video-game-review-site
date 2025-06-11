import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
import AppHeader from "../components/AppHeader";

function Home() {

    const [gameData, setGameData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('../gameData.json')
        .then(res => res.json())
        .then(data => setGameData(data.games))
    })

    return <div className='page'>
        <AppHeader />
        <Grid container direction = "row" spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            {gameData.map((game) => (
                <div>
                <p className = 'game-titles'>{game.game_name}
                </p>
                <Grid className = 'game-card' item key={game.game_id} 
                sx={{ 
                    backgroundImage:`url(${game.game_cover})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "500px",
                    postition: "relative",
                    margin: "1rem 2rem 2rem 2rem", //need margin for proper row spacing
                    borderRadius:'10px',
                    borderColor: 'white',
                    borderStyle: 'solid',
                    width: "300px"
                }}>
                <button 
                    className = 'game-button'
                    onClick={() => navigate(`/game/${game.game_id}`)}>
                        VISIT PAGE
                    </button>
                </Grid>
                 </div>
            ))}
        </Grid>
    </div>
}

export default Home