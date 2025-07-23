import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
import AppHeader from "../components/AppHeader";
import api from "../api"
import Box from '@mui/material/Box';

function Home() {

    const [gameData, setGameData] = useState([])
    const [averages, setAverages] = useState({})
    const navigate = useNavigate()

    const getRatingColor = (average) => {
            const value = parseFloat(average)
                switch (true) {
                    case value <= 1.0:
                        return '#FD0101';
                    case value <= 2.0:
                        return '#FC3201';
                    case value <= 3.0:
                        return '#FC9901';
                    case value <= 4.0:
                        return '#CC9901';
                    case value <= 5.0:
                        return '#989901';
                    case value <= 6.0:
                        return '#669901';
                    case value <= 7.0:
                        return '#339901';
                    case value <= 8.0:
                        return '#119901';    
                    case value <= 9.0:
                        return '#017701';
                    case value > 9.0:
                        return '#005400'
                    default:
                        return 'black';
            }
    }
    
    //fetch the average rating for each game and set it linked to the game_ID it's linked to so we can print on the home screen
    const getAverage = async (game_ID) => {
        try{
            const res = await api.get(`/api/reviews/average-rating/${game_ID}/`)
            const data = res.data;
            setAverages(prev => ({
                ...prev,
                [game_ID]: data.avg ?? 7.00 //link average to the game id
            }));
        }catch (err){
            console.error(`Error fetching average for game ${game_ID}:`, err);
            //set default rating to 7 in case of error
            setAverages(prev => ({
                ...prev,
                [game_ID]: 7.00
            }));
        }
    }

    // retrieve games and sort them alphabetically by their game names
    useEffect(() => {
        fetch('../gameData.json')
        .then(res => res.json())
        .then(data => {
            const sortedGames = data.games.sort((a, b) => {
                const firstName = a.game_name.toLowerCase().trim();
                const secondName = b.game_name.toLowerCase().trim();

                if(firstName < secondName) return -1;
                if(firstName > secondName) return 1;
                return 0;
            });
            setGameData(sortedGames)
        })
    })

    //get the average for each game to display alongside title
    useEffect(() => {
        if(gameData.length > 0){
            gameData.forEach(game => {
                getAverage(game.game_id)
            });
        }
    }, [gameData])


    return <div className='page'>
        <AppHeader />
        <h1 className='home-header'>Click on any of the games below to be taken to their page!</h1>
        <Grid container direction = "row" spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            {gameData.map((game) => (
                <div>
                    <p className = 'game-titles'>{game.game_name}</p>
                    <Grid className = 'game-card' item key={game.game_id} 
                    sx={{ 
                        backgroundImage:`url(${game.game_cover})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "500px",
                        position: "relative",
                        margin: "1rem 2rem 2rem 2rem", //need margin for proper row spacing
                        borderRadius:'10px',
                        borderColor: 'white',
                        borderStyle: 'solid',
                        width: "300px"
                    }}>
                    {/* rating circle in top right */}
                    <Box
                        className='game-rating'
                        sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "60px",
                        height: "60px",
                        backgroundColor: getRatingColor(averages[game.game_id]), //change color based on rating number
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "2rem",
                        zIndex: 1 // Ensure it appears above background
                        }}
                    >
                        {/* display  average rating in circle*/}
                        {averages[game.game_id] ? averages[game.game_id].toFixed(1) : "?"}
                    </Box>
                    <button 
                        className = 'game-button'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/game/${game.game_id}`)}}>
                            VISIT PAGE
                        </button>
                    </Grid>
                </div>
            ))}
        </Grid>
    </div>
}

export default Home