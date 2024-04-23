import Style from './Navbar.module.css'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

function Navbar() {
    return (
        <nav className={Style.nav}>
            <li className={Style.leftHeader}><MenuRoundedIcon /></li>
            <li className={Style.logo}>Vordle</li>
            <ul className={Style.rightHeader}>
                <li><BarChartRoundedIcon /></li>
                <li><LightModeRoundedIcon /></li>
                <li><SettingsRoundedIcon /></li>
            </ul>
        </nav>
    )
}

export default Navbar