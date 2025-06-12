import react from 'react'
import { useEffect, useState } from "react"
import '../styles/UserReview.css'

function UserReview({review, onDelete}) {
    const formattedDate = new Date(review.created_at).toLocaleDateString('en-US')
    const [gameData, setGameData] = useState([])
    const [game, setGame] = useState(null)

    useEffect(() => {
            fetch('../gameData.json')
            .then(res => res.json())
            .then(data => setGameData(data.games))
    }, [])


    useEffect(() => {
        if(review.game_id) {
            const foundGame = gameData.find((game) => game.game_id === review.game_id)
            setGame(foundGame)
        }
    }, [gameData, review.game_id])
    

        const getRatingColor = () => {
        const numValue = parseFloat(review.rating)
                if (numValue <= 2.0){
                    return 'red'
                }
                else if (numValue > 2.0 && numValue <= 4.0){
                    return 'orange'
                }
                else if (numValue > 4.0 && numValue <= 6.0){
                    return '#D5B60A'
                }
                else if(numValue > 6.0 && numValue <= 8.0){
                    return '#00ab41'
                }
                else if(numValue > 8.0){
                    return 'green'
                }
                else{
                    return 'black'
                }
    }

    return <div className='review-container'>
        <p className ='review-author'>{review.author}</p>
        <p className ='review-game'>{game ? game.game_name : 'Loading game...'}</p>
        <p className = 'review-content'>[<span style={{color: getRatingColor()}}>{review.rating}.0</span>] - {review.review_content}</p>
        <p className='review-date'>{formattedDate}</p>
        <button className='delete-button' onClick={() => onDelete(review.id)}>Delete Review</button>
    </div>
}

export default UserReview