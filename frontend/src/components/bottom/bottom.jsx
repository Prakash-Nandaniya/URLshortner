import React from 'react';
import './bottom.css';

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return Math.round(num / 1000000000) + 'B+'; 
  } else if (num >= 1000000) {
    return Math.round(num / 1000000) + 'M+'; 
  } else if (num >= 1000) {
    return Math.round(num / 1000) + 'K+'; 
  } else {
    return num; 
  }
};

function Bottom({ stats }) {
  return (
    <div className="stats-container">
      <div className="stat">
        <h2 className="stat-value">{formatNumber(stats.totalRegisteredLinks)}</h2>
        <p className="stat-label">Registered Links</p>
      </div>
      <div className="stat">
        <h2 className="stat-value">{formatNumber(stats.totalClicks)}</h2>
        <p className="stat-label">Clicks</p>
      </div>
    </div>
  );
}

export default Bottom;
