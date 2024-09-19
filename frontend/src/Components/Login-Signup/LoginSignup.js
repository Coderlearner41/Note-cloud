import React, { useState, useEffect } from 'react';
import './LoginSignUp.css';
import user from './Assests/user.png'
import padlock from './Assests/padlock.png'
import mail from './Assests/mail.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const  LoginSignUp =()=>{
    const navigate = useNavigate();
    const [name,setName]= useState(" ");
    const [email,setEmail]= useState(" ");
    const [password,setPassword]= useState(" ");
    const [errorName,setErrorName] = useState(null);
    const [errorEmail,setErrorEmail] = useState(null);
    const [errorPassword,setErrorPassword] = useState(null);
    const [error,setError] = useState(null);
    const [heading,setHeading] = useState("Login")


    useEffect(() => {
        // Reset form fields and errors when heading changes
        setName("");
        setEmail("");
        setPassword("");
        setErrorName(null);
        setErrorEmail(null);
        setErrorPassword(null);
        setError(null);
    }, [heading]);

    const [ask,setAsk]=useState("Don't have account- ")
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
            handleClick();
            const response = await axios.post('http://localhost:8000/Sign-Up', { name, Email: email, Password: password });
            console.log(response.data);
            
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
            // setHeading("Login");
            // setAsk("Already have account- ")
            // setName(" ");
            // setEmail(" ");
            // setPassword(" ");
            // navigate("/Login");
        }
    };
    const handleClick=()=>{
        setName(" ");
        setEmail(" ");
        setPassword(" ");
        if(heading==="Login"){
            setHeading("Sign-Up");
            navigate("/Sign-Up");
            setAsk("Don't have account-")
        }else{
            setHeading("Login");
            navigate("/Login");
            setAsk("Already have account- ")
        }
    }
    return(
        <div>
            <div className="container">
            <div className="header">{heading}</div>
            {error && <div className="error-message">{error}</div>}
               {heading==="Login"?<div></div>:<div className="input">
                    <img src={user} alt="" />
                    <input type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
                </div>}
                {errorName && <div className="error-message">{errorName}</div>} {/* Display error message */} 
                <div className="input">
                    <img src={mail} alt="" />
                    <input type="text" placeholder='Enter mail'  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                {errorEmail && <div className="error-message">{errorEmail}</div>} {/* Display error message */} 
                <div className="input">
                    <img src={padlock} alt="" />
                    <input type="text" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />
                </div>
                {errorPassword && <div className="error-message">{errorPassword}</div>} {/* Display error message */} 
                {heading==="Sign-Up"?<div></div>: 
                <div className="forgot-password">Lost Password <span>Click Here!</span>
                </div>}
                <div className="button">
                    <button disabled={heading === "Login"} onClick={handleSignUp} >Sign Up</button>

                    <button disabled={heading === "Sign-Up"} > Login</button>
                </div>
                <div className="change" onClick={()=>handleClick()}>{ask}<span>{heading==="Login"?"Sign-Up":"Login"}</span></div>
            </div>
        </div>
    );
};

export default LoginSignUp;