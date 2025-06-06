import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"

function Game() {

    const {gameID} = useParams()
    const [gameData, setGameData] = useState([])
    const [game, setGame] = useState(null)
    const [reviews, setReviews] = useState([])


    const getReviews = () => {
        api.get("/api/reviews/")
        .then((res) => res.data)
        .then((data) => {setReviews(data)})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        getReviews()
    }, [])
    

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
            <h1>{game.game_name}</h1>
            {reviews.map((review) => {
               return <p>{review.review_content}</p>
            })}
        </div>
    )
}

export default Game