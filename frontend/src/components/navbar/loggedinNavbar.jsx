import './navbar.css'
import React from 'react';

function navbar({ userProfile }) {
    return (
        <div className="navbar">
            <h4 id="sitename">
                URLshortner
            </h4>
            <div className="profile">
                <div className="custom-dropdown">
                    <span className="custom-dropdown-welcome">Welcome</span>
                    <span className="custom-dropdown-name">{userProfile.username}</span>
                </div>
            </div>
        </div>
    );
}

export default navbar;