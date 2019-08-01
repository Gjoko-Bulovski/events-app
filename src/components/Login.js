import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [rightPanelActive, setrightPanelActive] = useState(false);
    const [fireRedirect, setfireRedirect] = useState(false);
    const switchClass = () => {
        setrightPanelActive(!rightPanelActive);
    }
    const submitForm = e => {
        e.preventDefault();
        localStorage.setItem("login", true);
        setfireRedirect(true);
    }
    return (
            <div className={rightPanelActive ? 'right-panel-active' : "" } id="containerLogin">
                <div className="form-container sign-up-container">
                    <form onSubmit={submitForm} id="form-login-sign-up">
                        <h1>Create Account</h1>
                        <div className="social-container-login">
                            <a href="" className="social-login"><i className="fab fa-facebook-f"></i></a>
                            <a href="" className="social-login"><i className="fab fa-google-plus-g"></i></a>
                            <a href="" className="social-login"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input className="input-login" type="text" placeholder="First Name" required/>
                        <input className="input-login" type="text" placeholder="Last Name" required/>
                        <input className="input-login" type="text" placeholder="User Name" required/>
                        <input className="input-login" type="email" placeholder="Email" required/>
                        <input className="input-login" type="phone" placeholder="Phone" required/>
                        <button className='button' type="submit">Sign Up</button>
                    </form>
                    {fireRedirect ? <Redirect to="/event" /> : ''} 
                </div>
                <div className="form-container sign-in-container">
                    <form id="form-login" onSubmit={submitForm}>
                        <h1>Sign in</h1>
                        <div className="social-container-login">
                            <a href="" className="social-login"><i className="fab fa-facebook-f"></i></a>
                            <a href="" className="social-login"><i className="fab fa-google-plus-g"></i></a>
                            <a href="" className="social-login"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input className="input-login" type="text" placeholder="User Name" required/>
                        <input className="input-login" type="password" placeholder="Password" required/>
                        <a href="">Forgot your password?</a>
                        <button className='button' type="submit">Sign In</button>
                    </form>
                    {fireRedirect ? <Redirect to="/event" /> : ''} 
                </div>
                <div className="overlay-container-login">
                    <div className="overlay-login">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="button ghost" id="signIn" onClick={switchClass}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start a journey with us</p>
                            <button className="button ghost" id="signUp" onClick={switchClass}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login;