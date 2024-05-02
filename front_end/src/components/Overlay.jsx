import { useState } from 'react'
import Navbar from './Navbar'
import Settings from './Settings'



function Overlay() {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisibleChange = () => {
        setIsVisible(!isVisible)
    }
    return (
        <div>
            <Navbar handleVisible={handleVisibleChange}/>
            {isVisible ? <Settings handleVisible={handleVisibleChange}/> : null}
        </div>
    )
}
 
export default Overlay