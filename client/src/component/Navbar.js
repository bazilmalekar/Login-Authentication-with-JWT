import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {showLogin, showLogout} from "../Redux/action/index";

const Navbar = () => {
    let myState = useSelector((state) => state.toggleMenu);

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">MERN Stack</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <NavLink className="nav-link" to="/Login-Authentication-with-JWT">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                    {myState ? null : <NavLink className="nav-link" to="/login">Login</NavLink>}
                    </li>
                    <li className="nav-item">
                    {myState ? null : <NavLink className="nav-link" to="/signup">Register</NavLink>}   
                    </li>
                    <li className="nav-item">
                    {myState ? <NavLink className="nav-link" to="/logout">Logout</NavLink> : null}
                    </li>
                </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;