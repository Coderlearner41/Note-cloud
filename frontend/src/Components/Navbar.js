import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const handleClick=()=>{
    localStorage.removeItem('token');
    window.location.href = '/Login';
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-dark">
      <div className="container-fluid">
        {/* Use NavLink instead of a for consistent SPA behavior */}
        <NavLink className="navbar-brand" to="/">iNotebook</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                to="/About"
              >
                About
              </NavLink>
            </li>
            {!localStorage.getItem('token')?<form className="d-flex" style={{marginLeft:"70vw"}}>
              <NavLink className='btn btn-primary mx-2' role="button" to="/Login">Login</NavLink>
              <NavLink className='btn btn-primary mx-2' role="button" to="/SignUp">SignUp</NavLink>
            </form>:<form className="d-flex" style={{marginLeft:"70vw"}}>
              <button className='btn btn-primary mx-2' role="button" onClick={handleClick}>Log out</button>
            </form>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
