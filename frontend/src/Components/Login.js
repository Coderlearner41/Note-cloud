import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  const [email, setemail] = useState(" ");
  const [password, setPassword] = useState("")
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,password }),
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if(json.success){
        // redirect
        localStorage.setItem('token', json.token);
        history("/")
        props.showAlert("Loged In Successfully","success")
      }else{
        props.showAlert("Invalid Credentials","danger")
      }
    } catch (error) {
      props.showAlert("Invalid Credentials","danger")
    }
  };
  return (
    <div>
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
