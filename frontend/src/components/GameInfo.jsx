import react from 'react'
import { useEffect, useState } from "react"
import '../styles/GameInfo.css'
import api from "../api"


function GameInfo({game, game_ID}) {
    const [average, setAverage] = useState(0)


    const getAverage = () => {
        api.get(`/api/reviews/average-rating/${game_ID}/`)
        .then((res) => res.data)
        .then((data) => {setAverage(data.avg ?? 0.00)})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        if(game_ID){
            getAverage()
        }
    }, [game_ID])


    return (
        <div className="page-wrap">
            <nav className="page-name">
                {game.game_name}
            </nav>
            <main className="page-description">
                {game.game_description}
            </main>
            <div className='page-developer'>
                Developed by {game.developer}
                <p></p>
                Released on {game.release_date}
                <p></p>
                Average rating: {average.toFixed(2)} / 5.0
            </div>
            <div className="page-photo" 
                style={{
                    backgroundImage:`url(${game.game_cover})`,
                }}>
            </div>
        </div>
    )
}

export default GameInfo