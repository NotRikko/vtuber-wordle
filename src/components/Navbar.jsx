import Style from './Navbar.module.css'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

function Navbar() {
    return (
        <nav className={Style.nav}>
            <ul className={Style.header}>
                <li><MenuRoundedIcon /></li>
                <li style={ {fontSize: "1.4rem" }}>Vordle</li>
                <div className={Style.rightHeader}>
                    <li><LightModeRoundedIcon /></li>
                    <li><SettingsRoundedIcon /></li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar