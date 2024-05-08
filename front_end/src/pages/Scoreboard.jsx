import Overlay from '../components/Overlay'
import Style from './Scoreboard.module.css'
import { useState, useEffect} from 'react'

function Scoreboard () {
    const [topUsers, setTopUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3100/users', { mode: 'cors' });
                if (!response.ok) {
                    throw new Error('Issue with network response');
                }
                const topUsersData = await response.json();
                console.log(topUsersData);
                setTopUsers(topUsersData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); 
            }
        };
        fetchData(); 
    }, []);

    if(isLoading) {
        return <h1 id={Style.loading}>Loading...</h1>
    }
    
    return (
        <div id={Style.main}>
            <Overlay />
            <h1>Leaderboard</h1>
            <div>
                <div id={Style.header}>
                    <p>Rank</p>
                    <p>User</p>
                    <p>Score</p>
                </div>
                <div>
                    {topUsers.map((user, index) => {
                        const rank = index + 1;
                        return <div key={index} className={Style.cardboard_card}>
                            <p>{rank}</p>
                            <div className={Style.user_info}>
                                <img src= {user.image}/>
                                <p>{user.user_name}</p>
                            </div>
                            <p>{user.high_score}</p>
                        </div>
                    })}
                </div>
            </div>
        
        </div>
    )
}

export default Scoreboard