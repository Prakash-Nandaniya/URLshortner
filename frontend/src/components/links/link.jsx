import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BE_URL = import.meta.env.VITE_BE_URL;

function OneLink({ link, setRegisteredURLs, setStats }) {
  const [faviconUrl, setFaviconUrl] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { short_url = "", url = "", clicks_count = 0, _id } = link;
  const [totalClicks, setTotalClicks] = useState(clicks_count);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaviconData = async () => {
      const favicon = await fetchFavicon(url);
      setFaviconUrl(favicon);
    };

    fetchFaviconData();
  }, [url]);

  function copyToClipboard(buttonElement) {
    const shortUrlElement = buttonElement.closest('.history-shorturl-container').querySelector('.history-shorturl');
    const shortUrlText = shortUrlElement.textContent.trim();
    navigator.clipboard.writeText(shortUrlText);
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this link?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`${BE_URL}user/url/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        const url_clicks = await response.json();
        setRegisteredURLs((prevURLs) => prevURLs.filter((item) => item._id !== _id));

        setStats((prevStats) => ({
          ...prevStats,
          totalRegisteredLinks: prevStats.totalRegisteredLinks - 1,
          totalClicks: prevStats.totalClicks - url_clicks,
        }));
      } else {
        console.error("Failed to delete the link. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting the link:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShortUrlClick = () => {
    setTotalClicks((prevTotal) => prevTotal + 1);
    setStats((prevStats) => ({
      ...prevStats,
      totalClicks: prevStats.totalClicks + 1,
    }));
  };

  const handleInfoClick = () => {
    navigate(`/info/${_id}`);
  };

  if (!link) {
    return null;
  }

  return (
    <div className={`history-row-container ${isDeleting ? "deleting" : ""}`}>
      <div className="history-shorturl-container">
        <a
          className="history-shorturl"
          href={short_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleShortUrlClick}
        >
          {short_url}
        </a>
        <button
          className="history-row-copy-button"
          onClick={(e) => copyToClipboard(e.target)}
          disabled={isDeleting}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect className="copySVGreact" width="35" height="35" rx="17.5" fill="#65676b" fillOpacity="0.69" />
            <path
              d="M23.125 21.625H17.5C16.4453 21.625 15.625 20.8047 15.625 19.75V12.25C15.625 11.2246 16.4453 10.375 17.5 10.375H21.6016C21.9531 10.375 22.334 10.5508 22.5977 10.8145L24.5605 12.7773C24.8242 13.041 25 13.4219 25 13.7734V19.75C25 20.8047 24.1504 21.625 23.125 21.625ZM11.875 14.125H14.6875V15.5312H11.875C11.6113 15.5312 11.4062 15.7656 11.4062 16V23.5C11.4062 23.7637 11.6113 23.9688 11.875 23.9688H17.5C17.7344 23.9688 17.9688 23.7637 17.9688 23.5V22.5625H19.375V23.5C19.375 24.5547 18.5254 25.375 17.5 25.375H11.875C10.8203 25.375 10 24.5547 10 23.5V16C10 14.9746 10.8203 14.125 11.875 14.125Z"
              fill="#C9CED6"
            />
          </svg>
        </button>
      </div>
      <div className="history-originalurl-container">
        <img
          className="history-originalurl-image"
          src={faviconUrl || "https://cdn.oaistatic.com/assets/favicon-o20kmmos.svg"}
          alt="favicon"
        />
        <a className="history-originalurl" href={url} target="_blank" rel="noopener noreferrer">
          {url.length > 40 ? `${url.substring(0, 40)}...` : url}
        </a>
      </div>
      <div className="history-clicks">
        <h5>{totalClicks}</h5>
      </div>
      <div className="history-info-button">
        <button onClick={handleInfoClick} disabled={isDeleting}>
          Info
        </button>
      </div>
      <div className="history-delete-button">
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      <div className='glow-bottom' ></div>
    </div>
  );
}

export default OneLink;
