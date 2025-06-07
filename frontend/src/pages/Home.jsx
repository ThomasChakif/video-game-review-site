import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
import massEffect2Cover from '../img/MassEffect2_cover.PNG';

function Home() {

    const [gameData, setGameData] = useState([])
    const navigate = useNavigate()

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
                <div>
                <p className = 'game-titles' 
                    style={{
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bolder',
                        margin: 0,
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        marginTop: '1rem',
                    }}>{game.game_name}
                </p>
                <Grid className = 'test' item key={game.game_id} 
                sx={{ 
                    backgroundImage:`url(${imageMap[game.game_id]})`,
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
                    onClick={() => navigate(`/game/${game.game_id}`)}
                />
                </Grid>
                 </div>
            ))}
        </Grid>
    </div>
}

export default Home