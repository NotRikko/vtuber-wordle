import Style from './UserCard.module.css'
import { useUser } from '../UserProvder'


function UserCard () {
    const {user, handleLogout} = useUser();
    return (
        <div id={Style.user_card}>
            <img src={user.image} />
            <div>
                <h1>{user.user_name}</h1>
                <h2>High Score: {user.high_score}</h2>
                <h2>Current Score: {user.current_score}</h2>
            </div>
            <div style={{ fontSize: '1rem', marginTop: '10%'}}>
                <h2>Change profile picture</h2>
                <h2>Change username</h2>
                <h2>Change password</h2>
                <h2 onClick={handleLogout}>Log out</h2>
            </div>
        </div>
    )
}

export default UserCard