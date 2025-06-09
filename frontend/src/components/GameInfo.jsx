import react from 'react'
import { useEffect, useState } from "react"
import '../styles/GameInfo.css'
import api from "../api"


function GameInfo({game, game_ID}) {
    const [average, setAverage] = useState(0)


    const getAverage = () => {
        api.get(`/api/reviews/average-rating/${game_ID}/`)
        .then((res) => res.data)
        .then((data) => {setAverage(data.avg)})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        if(game_ID){
            getAverage()
        }
    }, [game_ID])


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
    </div>
    )
}

export default GameInfo