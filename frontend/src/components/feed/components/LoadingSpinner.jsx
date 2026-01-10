import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
      <p className="loading-text">Loading meetings...</p>
    </div>
  );
};

export default LoadingSpinner;
