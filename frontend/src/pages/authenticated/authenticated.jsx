import './authenticated.css';
import Navbar from '../../components/navbar/loggedinNavbar.jsx';
import Searchbox from '../../components/searchbox/searchbox.jsx';
import RegisteredLinks from '../../components/links/registeredLinks.jsx';
import Bottom from '../../components/bottom/bottom.jsx';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const BE_URL = import.meta.env.VITE_BE_URL;

function Authenticated() {
    const { id } = useParams();
    const [stats, setStats] = useState({ totalClicks: 0, totalRegisteredLinks: 0 });
    const [userProfile, setUserProfile] = useState(null);
    const [registeredURLs, setRegisteredURLs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BE_URL}user/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                      },
                    credentials: 'include',
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        console.log('User not authenticated, redirecting to login');
                        navigate('/login');
                        return;
                    }
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                setStats({
                    totalClicks: data.total_url_visites,
                    totalRegisteredLinks: data.total_registered_url,
                });
                setUserProfile(data.user_profile);
                setRegisteredURLs(data.registered_urls);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, navigate]);

    return (
        <>
            {userProfile ? (
                <>
                    <Navbar userProfile={userProfile} />
                    <Searchbox  setRegisteredURLs={setRegisteredURLs} setStats={setStats} />
                    <RegisteredLinks 
                        registeredURLs={registeredURLs} 
                        setRegisteredURLs={setRegisteredURLs} 
                        setStats={setStats} 
                    />
                    <Bottom stats={stats} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default Authenticated;
