import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'; 
const BE_URL = import.meta.env.VITE_BE_URL;

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(BE_URL);
        try {
            const response = await fetch(`${BE_URL}auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                const { id } = result; 
                navigate(`/authenticated/${id}`);
            } else {
                setError(result.message || 'Signup failed. Please try again!');
            }
        } catch (error) {
            setError('Some server-side error occurred. try again!');
        }
    };

    return (
        <div className="login-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>} 

                <button type="submit" className="login-btn">Signup</button>
            </form>

            <div className="signup-link">
                <p>Already have an account? <Link id='Link' to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default SignupPage;
