import './searchbox.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
const BE_URL = import.meta.env.VITE_BE_URL;

function Searchbox({ setRegisteredURLs, setStats }) {
    const [inputURL, setInputURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    async function handleShorten()  {
        if (!inputURL) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BE_URL}user/url/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: inputURL }),
                credentials: 'include', 
            });                           
            console.log(response.status);
            if (response.status === 201) {
                const newURL = await response.json(); 
                console.log("hi hello " + JSON.stringify(newURL)); 
                setRegisteredURLs((prevURLs) => [...prevURLs, newURL]); 
                setStats((prevStats) => ({
                    ...prevStats,
                    totalRegisteredLinks: prevStats.totalRegisteredLinks + 1, 
                    totalClicks: prevStats.totalClicks + 1,
                }));
            } 
            else if (response.status === 401) {
                navigate('/login'); 
                return;
            }
            else{
                console.error("Failed to shorten the URL. Please try again.");
            }
        } catch (error) {
            console.error("Error shortening the URL:", error);
        } finally {
            setIsLoading(false);
            setInputURL(""); 
        }
    };

    return (
        <div className="urlInputContainerwrapper">
            <div className="urlInputContainer">
                <h1>Shorten Your Loooong Links :)</h1>
                <div className="quote">
                    <p>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online
                        experience.</p>
                </div>
                <div className="input-container">
                    <div className="icon-container">
                        <span>&#128279;</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Enter the link here" 
                        value={inputURL} 
                        onChange={(e) => setInputURL(e.target.value)} 
                        disabled={isLoading} 
                    />
                    <button onClick={handleShorten} disabled={isLoading}>
                        {isLoading ? "Shortening..." : "Shorten Now!"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Searchbox;
