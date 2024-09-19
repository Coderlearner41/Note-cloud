import React, { useState } from 'react';
import './LoginSignUp.css';
import padlock from './Assets/padlock.png';
import mail from './Assets/mail.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrorEmail(null);
        setErrorPassword(null);
        setError(null);

        // Simple client-side validation
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail) {
            setErrorEmail("Email is required");
            return;
        }
        if (!trimmedPassword) {
            setErrorPassword("Password is required");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/Login', { Email: trimmedEmail, Password: trimmedPassword });
            console.log(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.message === "Email is required") {
                    setErrorEmail("Email is required");
                } else if (err.response.data.message === "Password is required") {
                    setErrorPassword("Password is required");
                } else {
                    setError(err.response.data.message);
                }
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div>
            <div className="container">
                <div className="header">Login</div>
                {error && <div className="error-message">{error}</div>}
                <div className="input">
                    <img src={mail} alt="" />
                    <input type="text" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                {errorEmail && <div className="error-message">{errorEmail}</div>}
                <div className="input">
                    <img src={padlock} alt="" />
                    <input type="text" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errorPassword && <div className="error-message">{errorPassword}</div>}
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
                <div className="button">
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className="change" onClick={() => navigate("/Sign-Up")}>Don't have an account? <span>Sign-Up</span></div>
            </div>
        </div>
    );
};

export default Login;
