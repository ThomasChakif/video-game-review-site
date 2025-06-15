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
    const [userReview, setUserReview] = useState([])

    const getReviews = () => {
        api.get(`/api/reviews/${gameID}/`)
        .then((res) => res.data)
        .then((data) => {setReviews(data ?? [])})
        .catch((err) => alert(err))
    }

    const getUserReview = () => {
        api.get(`/api/reviews/reviewsByUser/${gameID}/`)
        .then((res) => res.data)
        .then((data) => {setUserReview(data ?? [])})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        if(gameID){
            getReviews()
            getUserReview()
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

    const getRatingColor = () => {
            const value = parseFloat(userReview[0].rating)
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

    return (
    <div>
        <AppHeader />
        <GameInfo game={game} game_ID={gameID} key={game.game_id}/>
        <div className='header-flex'>
            <div>
                <h1 className='review-header'>Reviews</h1>
            </div>
            <div>
                <div>
                    {(userReview.length === 0) && (
                        <button className='review-button'>LEAVE A REVIEW</button>
                    )}
                </div>
                <div className='review-info'>
                    {(userReview.length > 0) && (
                        <p>Your rating: <span style={{color: getRatingColor()}}>{userReview[0].rating}.0</span></p>
                    )}
                </div>
            </div>
        </div>
            {(reviews.length === 0) && (
                <p className='review-header'>No reviews for this game.</p>
            )}
            {(reviews.length > 0) && (
                reviews.map((review) => (
                    <Review review={review}key={review.id}/>
                ))
            )}
    </div>
    )
}

export default Game