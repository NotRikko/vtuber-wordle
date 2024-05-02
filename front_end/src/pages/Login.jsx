import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../UserProvder'
import Overlay from '../components/Overlay';
import Style from './Game.module.css'

function Login() {
    const navigate = useNavigate();
    const {isLoggedIn, handleLoginStatus , handleUser} = useUser();
    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
        remember_me: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3100/users/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: formData.user_name,
                password: formData.password
            }),
            });
            if(!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            console.log(data);
            if(data.authenticated) {
                localStorage.setItem('accesstoken', data.accessToken);
                localStorage.setItem('refreshtoken', data.refreshToken);
                handleLoginStatus();
                handleUser(data.user)
                navigate('/')
            } else {
                return
            }
        } catch(error) {
            console.error('Error:', error);
        }
        
    };

    if(isLoggedIn) {
        return <h1>Logged in</h1>
    }

    return (
        <div id={Style.signup_page}>
            <div id={Style.signup}>
                <div id={Style.signup_header}>
                    <h1>Join Vordle</h1>
                    <h2>Don't have an account? <Link exact to='/signup' style={{ color: 'rgb(155, 185, 177)' }}>Sign up.</Link></h2>
                </div>
                <form id={Style.signup_form} onSubmit={handleSubmit}>
                    <div className={Style.signup_sec}>
                        <label for='user_name'>Username</label>
                        <input 
                            type='text' 
                            name='user_name' 
                            required
                            value={formData.user_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='password'>Password</label>
                        <input 
                        type='password' 
                        name='password' 
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='remember_me'>Remember me</label>
                        <input
                            type='checkbox'
                            name='remember_me'
                            checked={formData.remember_me}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
                <div>
                    <p>Forgot your username? Click here.</p>
                    <p>Forgot your password? Click here.</p>
                </div>
            </div>
        </div>
    )
}

export default Login