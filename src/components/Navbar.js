import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const API = process.env.REACT_APP_API;

export const Navbar = () => {
  const history= useHistory();
  const handleClick= async (e) =>{
        
    const res = await fetch(`${API}/logout`)
    const data = await res.text();
    console.log(data)
    if(data==='Logout'){
        history.push("/")
    }        
}
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Signup">Signup</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger btn-sm btn-block" onClick={handleClick} aria-current="page">Logout</button>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>

)}