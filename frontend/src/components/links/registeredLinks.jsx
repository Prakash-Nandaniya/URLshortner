import './registeredLinks.css';
import Linksheader from './linksHeader';
import OneLink from './link.jsx';
import React from 'react';

function RegisteredLinks({ registeredURLs, setRegisteredURLs, setStats }) {

    return (
        <>
            <div className="history-container-wrapper">
                <div className="history-container">
                    <Linksheader />
                    {registeredURLs.map((linkData) => (
                        <OneLink
                            key={linkData._id}
                            link={linkData}
                            setRegisteredURLs={setRegisteredURLs}
                            setStats={setStats}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default RegisteredLinks;
