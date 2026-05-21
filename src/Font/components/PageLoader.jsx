import React from "react";
import "./PageLoader.css";

const PageLoader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-card">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay"></div>
                <div className="pulse-ring delay2"></div>
                <h4 className="loader-text">Loading...</h4>
            </div>
        </div>
    );
};

export default PageLoader;
