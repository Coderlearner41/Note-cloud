import React, { useState } from 'react';
import './LoginSignUp.css';
import user from '../Assets/user.png';
import padlock from '../Assets/padlock.png';
import mail from '../Assets/mail.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrorName(null);
        setErrorEmail(null);
        setErrorPassword(null);
        setError(null);

        // Simple client-side validation
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedName) {
            setErrorName("Name is required");
            return;
        }
        if (!trimmedEmail) {
            setErrorEmail("Email is required");
            return;
        }
        if (!trimmedPassword) {
            setErrorPassword("Password is required");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/Sign-Up', { name: trimmedName, Email: trimmedEmail, Password: trimmedPassword });
            console.log(response.data);
            navigate("/Login");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.message === "Name is required") {
                    setErrorName("Name is required");
                } else if (err.response.data.message === "Email is required") {
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
                <div className="header">Sign-Up</div>
                {error && <div className="error-message">{error}</div>}
                <div className="input">
                    <img src={user} alt="" />
                    <input type="text" placeholder='Enter name' onChange={(e) => setName(e.target.value)} />
                </div>
                {errorName && <div className="error-message">{errorName}</div>}
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
                <div className="button">
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
                <div className="change" onClick={() => navigate("/Login")}>Already have an account? <span>Login</span></div>
            </div>
        </div>
    );
};

export default SignUp;
