import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {
  let history = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    userName: "",
    password: "",
    cPassword: "",
  });
  const onChange=(e)=>{
    setCreator({...creator,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:creator.name,email: creator.userName,password:creator.password }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      console.log(json.success)
      if(json.success){
        // redirect
        localStorage.setItem('tokken', json.authToken);
        history("/")
        props.showAlert("Account created Successfully","success")
      }else{
        props.showAlert("Invalid Credentials","danger")
      }
    } catch (error) {
      console.error("Failed to get user data:", error);
    }
  };
  return (
    <>
    <h2>Create an account to use iNotebook</h2>
    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="container">
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="validationCustom01"
            value={creator.name}
            onChange={onChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Username
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              value={creator.userName}
              name="userName"
              onChange={onChange}
              required
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom05" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationCustom05"
            value={creator.password}
            name="password"
            onChange={onChange}
            minLength={8}
            required
          />
          <div className="invalid-feedback">
            Please provide a min 8 char password.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom06" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={creator.cPassword}
            name="cPassword"
            onChange={onChange}
            id="validationCustom06"
            required
          />
          <div className="invalid-feedback">Please write same password.</div>
        </div>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            Agree to terms and conditions
          </label>
          <div className="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </div>
    </form>
    </>
  );
};

export default SignUp;
