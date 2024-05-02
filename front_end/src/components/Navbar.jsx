import Style from './Navbar.module.css'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { NavLink } from 'react-router-dom';

function Navbar({handleVisible}) {
    return (
        <nav className={Style.nav}>
            <NavLink exact to='/'><HomeRoundedIcon id={Style.home} /></NavLink>
            <li className={Style.logo}>Vordle</li>
            <ul className={Style.rightHeader}>
                <NavLink exact to ='/leaderboard'><li><BarChartRoundedIcon /></li></NavLink>
                <NavLink><li><LightModeRoundedIcon /></li></NavLink>
                <li><button style={{padding:'0', border: 'none', backgroundColor: 'white'}}onClick={handleVisible}><SettingsRoundedIcon /></button></li>
            </ul>
        </nav>
    )
}

export default Navbar