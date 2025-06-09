import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"
import '../styles/Game.css'


function Game() {

    const {gameID} = useParams()
    const [gameData, setGameData] = useState([])
    const [game, setGame] = useState(null)
    const [reviews, setReviews] = useState([])
    const [average, setAverage] = useState(0)


    const getAverage = () => {
        api.get(`/api/reviews/average-rating/${gameID}/`)
        .then((res) => res.data)
        .then((data) => {setAverage(data.avg)})
        .catch((err) => alert(err))
    }


    const getReviews = () => {
        api.get(`/api/reviews/${gameID}/`)
        .then((res) => res.data)
        .then((data) => {setReviews(data)})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        if(gameID){
            getReviews()
            getAverage()
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

    <div className="page-wrap">
        <nav className="page-nav">
            {game.game_name}
        </nav>
        <main className="page-main">
            <p>{game.game_description}</p>
        </main>
        <div className='page-rating'>
            {average.toFixed(2)}
        </div>
            <div className='page-publisher'>
            {game.publisher}
        </div>
        <aside className="page-sidebar">
            Aside
        </aside>
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