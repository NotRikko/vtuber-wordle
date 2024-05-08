import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Style from './Game.module.css'

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: '',
    });

    const [errorData, setErrorData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        setErrorData(null);
        try {
            const response = await fetch('http://localhost:3100/users', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData),
            });
            if(!response.ok) {
                throw new Error('Network response was not ok.');s
            }
            const data = await response.json();
            console.log(data);
            if(data.created === false) {
                setErrorData(data.errors)
            } else if(data.created === true){
                navigate('/login')
            }
        } catch(error) {
            console.error('Error:', error);
        }
        
    };

    return (
        <div id={Style.signup_page}>
            <div id={Style.signup}>
                <div id={Style.signup_header}>
                    <h1>Join Vordle</h1>
                    <h2>Keep track of your scores</h2>
                    <h2>Already have an account? <Link exact to='/login' style={{ color: 'rgb(155, 185, 177)' }}>Log in.</Link></h2>
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
                        {errorData && (
                        errorData.map((error) => {
                        if (error.path === 'user_name') {
                            return <p  className={Style.error_msg} key={error.path}>{error.msg}</p>;
                        }
                        return null;
                         })
                        )}
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='email'>Email</label>
                        <input 
                        type='email' 
                        name='email' 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        />
                        {errorData && (
                        errorData.map((error) => {
                        if (error.path === 'email') {
                            return <p className={Style.error_msg} key={error.path}>{error.msg}</p>;
                        }
                        return null;
                         })
                        )}
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
                        {errorData && (
                        errorData.map((error) => {
                        if (error.path === 'password') {
                            return <p className={Style.error_msg} key={error.path}>{error.msg}</p>;
                        }
                        return null;
                         })
                        )}
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='confirm_password'>Confirm Password</label>
                        <input type='password' name='confirm_password' required/>
                    </div>
                    <button type='submit'>Create Account</button>
                </form>
                <p>Thank you for joining and supporting the Vordle community.</p>
            </div>
        </div>
    )
}

export default SignUp