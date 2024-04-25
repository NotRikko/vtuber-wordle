import Navbar from '../components/Navbar'
import Style from './Scoreboard.module.css'

function Scoreboard () {
    const topUsers = [
        {
            name: "Biboo",
            rank: "1",
            score: "5",
        },
        {
            name: "Pebble",
            rank: "2",
            score: "3",
        },
        {
            name: "Pebble",
            rank: "3",
            score: "2",
        },
    ]
    return (
        <div id={Style.main}>
            <Navbar />
            <h1>Leaderboard</h1>
            <div>
                <div id={Style.header}>
                    <p>Rank</p>
                    <p>User</p>
                    <p>Score</p>
                </div>
                <div>
                    {topUsers.map((user, index) => {
                        return <div key={index} className={Style.cardboard_card}>
                            <p>{user.rank}</p>
                            <p>{user.name}</p>
                            <p>{user.score}</p>
                        </div>
                    })}
                </div>
            </div>
        
        </div>
    )
}

export default Scoreboard