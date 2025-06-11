import react from 'react'
import { useEffect, useState } from "react"
import '../styles/GameInfo.css'
import api from "../api"


function GameInfo({game, game_ID}) {
    const [average, setAverage] = useState(0)

    const getRatingColor = () => {
        const numValue = parseFloat(average)
                if (numValue <= 2.0){
                    return 'red'
                }
                else if (numValue > 2.0 && numValue <= 4.0){
                    return 'orange'
                }
                else if (numValue > 4.0 && numValue <= 6.0){
                    return 'D5B60A'
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