import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Style from './Game.module.css'

function Login() {
    
    const [formData, setFormData] = useState({
        user_name: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/user_create_get', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData),
            });
            if(!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            console.log(data);
        } catch(error) {
            console.error('Error:', error);
        }
        
    };

    return (
        <div id={Style.signup_page}>
            <div id={Style.signup}>
                <div id={Style.signup_header}>
                    <h1>Join Vordle</h1>
                    <h2>Don't have ann account? <a href='' style={{ color: 'rgb(155, 185, 177)' }}>Log in.</a></h2>
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