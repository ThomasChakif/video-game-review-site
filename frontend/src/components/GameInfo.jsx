import react from 'react'
import { useEffect, useState } from "react"
import '../styles/GameInfo.css'
import api from "../api"


function GameInfo({game, game_ID}) {
    const [average, setAverage] = useState(0)

    const getRatingColor = () => {
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

    const getRatingGlow = () => {
        const color = getRatingColor()
        return `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`
    }


    const getAverage = () => {
        api.get(`/api/reviews/average-rating/${game_ID}/`)
        .then((res) => res.data)
        .then((data) => {setAverage(data.avg ?? 7.00)})
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
                <div>
                    Developed by {game.developer}
                </div>
                <div>
                    Released on {game.release_date}
                </div>
                <div className='average' style={{fontSize: "5rem", color: getRatingColor(), textShadow: getRatingGlow()}}>
                    {average.toFixed(2)}
                </div>
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