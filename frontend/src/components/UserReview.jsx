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
            const value = parseFloat(review.rating)
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

    return <div className='review-container'>
        <p className ='review-author'>{review.author}</p>
        <p className ='review-game'>{game ? game.game_name : 'Loading game...'}</p>
        <p className = 'review-content'>[<span style={{color: getRatingColor()}}>{review.rating}.0</span>] - {review.review_content}</p>
        <p className='review-date'>{formattedDate}</p>
        <button className='delete-button' onClick={() => onDelete(review.id)}>Delete Review</button>
    </div>
}

export default UserReview