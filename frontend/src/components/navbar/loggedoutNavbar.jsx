import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <h4 id="sitename">
                URLshortner
            </h4>
            <div className="authbuttons">
                <Link to="/login">
                    <button id="login">Login <img src="/svgs/login.svg" alt="login" /></button>
                </Link>
                <Link to="/signup">
                    <button id="signup">Register Now</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
