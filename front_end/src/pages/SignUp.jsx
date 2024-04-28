import Style from './Game.module.css'

function SignUp() {
    return (
        <div id={Style.signup_page}>
            <div id={Style.signup}>
                <div>
                    <h1>Join Vordle</h1>
                    <h2>Keep track of your scores</h2>
                    <h3>Already have an account? <a href='' style={{ color: 'blue' }}>Log in.</a></h3>
                </div>
                <form id={Style.signup_form} action='/signup'>
                    <div className={Style.signup_sec}>
                        <label for='user_name'>Username</label>
                        <input type='text' name='user_name'/>
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='password'>Password</label>
                        <input type='password' name='password'/>
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='confirm_password'>Confirm Password</label>
                        <input type='password' name='confirm_password'/>
                    </div>
                    <div className={Style.signup_sec}>
                        <label for='email'>Email</label>
                        <input type='email' name='email'/>
                    </div>
                    <button type='submit'>Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp