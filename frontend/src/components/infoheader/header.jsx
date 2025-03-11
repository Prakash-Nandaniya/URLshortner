import React from "react";
import "./header.css";

const Header = (props) => {
    console.log(props.headerInfo)
    return (
        <>
            <h1 className="url-info-header">URL Information</h1>
            <div className="mainurls">
                <div className="card">
                    <h2 className="label">Original URL</h2>
                    <div className="url">
                        <a href={props.headerInfo.original_url} target="_blank" rel="noopener noreferrer">{props.headerInfo.original_url}</a>
                    </div>
                </div>
                <div className="card">
                    <h2 className="label">Short URL</h2>
                    <div className="url">
                        <a href={props.headerInfo.short_url} target="_blank" rel="noopener noreferrer">{props.headerInfo.short_url}</a>
                    </div>
                </div>
            </div>
            <div className="clicks">
                <p className="value">{props.headerInfo.clicks_count}</p>
                <p className="label">Clicks</p>
            </div>
        </>
    );
};

export default Header;

