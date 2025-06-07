import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"

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
        <div style={{marginLeft: '1rem'}}>
            <h1>{game.game_name}</h1>
            <h2>Publisher: {game.publisher}</h2>
            <h2>Released on {game.release_date}</h2>
            <h3>{game.game_description}</h3>
            {reviews.map((review) => {
               return (
                <div>
                    <p>Author: {review.author}</p>
                    <p>Content: {review.review_content}</p>
                    <p>Rating: {review.rating}.0 / 5.0</p>
                    <p>---------------------</p>
                </div>
               )
            })}
        </div>
    )
}

export default Game