import Style from './Game.module.css'

function SignUp() {
    return (
        <div id={Style.signup_page}>
            <div id={Style.signup}>
                <div id={Style.signup_header}>
                    <h1>Join Vordle</h1>
                    <h2>Keep track of your scores</h2>
                    <h2>Already have an account? <a href='' style={{ color: 'rgb(155, 185, 177)' }}>Log in.</a></h2>
                </div>
                <form id={Style.signup_form} action='/signup'>
                    <div className={Style.signup_sec}>
                        <label for='user_name'>Username</label>
                        <input type='text' name='user_name'/>
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='email'>Email</label>
                        <input type='email' name='email'/>
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='password'>Password</label>
                        <input type='password' name='password'/>
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='confirm_password'>Confirm Password</label>
                        <input type='password' name='confirm_password'/>
                    </div>
                    <button type='submit'>Create Account</button>
                </form>
                <p>Thank you for joining and supporting the Vordle community.</p>
            </div>
        </div>
    )
}

export default SignUp