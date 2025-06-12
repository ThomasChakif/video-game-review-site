import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"
import GameInfo from '../components/GameInfo'
import Review from '../components/Review'
import '../styles/Game.css'
import AppHeader from "../components/AppHeader";


function Game() {

    const {gameID} = useParams()
    const [gameData, setGameData] = useState([])
    const [game, setGame] = useState(null)
    const [reviews, setReviews] = useState([])

    const getReviews = () => {
        api.get(`/api/reviews/${gameID}/`)
        .then((res) => res.data)
        .then((data) => {setReviews(data)})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        if(gameID){
            getReviews()
        }
    }, [gameID])
    

    useEffect(() => {
        fetch('../gameData.json')
        .then(res => res.json())
        .then(data => setGameData(data.games))
    }, [])

    //find the game that matches the ID
    useEffect(() => {
        if(gameID) {
            const foundGame = gameData.find((game) => game.game_id === gameID)
            setGame(foundGame)
        }
    }, [gameData, gameID])

    // added an additional loading check to ensure data loads when clicking on page 
    // otherwise, page will think you are trying to access null.game_name
    if (!game) {
        return <div>Loading...</div>
    }

    return (
    <div>
        <AppHeader />
        <GameInfo game={game} game_ID={gameID} key={game.game_id}/>
            <p className='review-header'>Reviews</p>
            {reviews.map((review) => (
                <Review review={review}key={review.id}/>
            ))}
    </div>
    )
}

export default Game