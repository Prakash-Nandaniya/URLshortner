import './unauthenticated.css';
import Navbar from '../../components/navbar/loggedoutNavbar.jsx';
import Searchbox from '../../components/searchbox/searchbox.jsx';
import Bottom from '../../components/bottom/bottom.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BE_URL = import.meta.env.VITE_BE_URL;

function Unauthenticated() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(BE_URL);
                setStats(response.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) { return <div>Loading...</div>; }
    if (error) { return <div>{error}</div>; }

    return (
        <>
            <div className="page-container">
                <Navbar />
                <Searchbox />
                <hr style={{"margin-top":"1rem", "width":"70%","margin-left":"15%"}} />
                <h1 className='servicetext'>Signup and get following services in free</h1>
                <div className="services-section">
                    <div className="mainpagecard mainpagecard-1">
                        <img src="/images/links.png" alt="Service 1" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Sign up to shorten multiple URLs for free</p>
                        </div>
                    </div>
                    <div className="mainpagecard mainpagecard-2">
                        <img src="/images/piechart.png" alt="Service 2" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Analyze your audience with insightful pie charts</p>
                        </div>
                    </div>
                    <div className="mainpagecard mainpagecard-3">
                        <img src="/images/plot.png" alt="Service 3" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Track URL visit trends with detailed plots</p>
                        </div>
                    </div>
                    <div className="mainpagecard mainpagecard-4">
                        <img src="/images/map.png" alt="Service 4" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Map your traffic sources geographically</p>
                        </div>
                    </div>
                </div>
                <Bottom stats={stats} />
            </div>
        </>
    );
}

export default Unauthenticated;