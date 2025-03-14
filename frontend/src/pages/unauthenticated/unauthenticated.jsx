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
                <hr style={{"margin-top":"100px", "width":"60%","margin-left":"20%"}} />
                <h1 className='servicetext'>Signup and get following services in free</h1>
                <div className="services-section">
                    <div className="mainpagecard mainpagecard-1">
                        <img src="https://s3.ap-south-1.amazonaws.com/touristsite.moreimages/more_images/Screenshot+from+2025-03-09+19-15-55.png" alt="Service 1" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Sign up to shorten multiple URLs for free</p>
                        </div>
                    </div>
                    <div className="mainpagecard mainpagecard-2">
                        <img src="https://s3.ap-south-1.amazonaws.com/touristsite.moreimages/more_images/Screenshot+from+2025-03-09+19-12-42.png" alt="Service 2" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Analyze your audience with insightful pie charts</p>
                        </div>
                    </div>
                    <div className="mainpagecard mainpagecard-3">
                        <img src="https://s3.ap-south-1.amazonaws.com/touristsite.moreimages/more_images/Screenshot+from+2025-03-09+19-11-38.png" alt="Service 3" className="mainpagecard-image" />
                        <div className="mainpagecard-overlay">
                            <p>Track URL visit trends with detailed plots</p>
                        </div>
                    </div>
                    <div className="mainpagecard mainpagecard-4">
                        <img src="https://s3.ap-south-1.amazonaws.com/touristsite.moreimages/more_images/Screenshot+from+2025-03-09+19-12-01.png" alt="Service 4" className="mainpagecard-image" />
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