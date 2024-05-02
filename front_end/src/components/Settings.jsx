import { NavLink } from 'react-router-dom';
import Style from './Settings.module.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useUser } from '../UserProvder'
import UserCard from './UserCard'

function Settings ({handleVisible}) {
    const {isLoggedIn} = useUser();

    return (
        <div id={Style.settings}>
            <button onClick={handleVisible} style={{position: 'absolute', right:'0', margin: '3%', border: 'none', backgroundColor: 'white'}}><ClearRoundedIcon color='white' /></button>
            {isLoggedIn ? <UserCard /> 
            :
            <ul>
                <NavLink exact to='/login'><li>Sign in</li></NavLink>
                <NavLink exact to='/signup'><li>Sign up</li></NavLink>
                <li></li>
            </ul>
            
            }
        </div>
    )
}

export default Settings