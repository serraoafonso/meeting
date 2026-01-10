import React, { useContext } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";

const AlertModal = ({ message, isSuccess, onClose }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="alert-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: darkMode ? "#222" : "white",
          borderColor: darkMode ? "#444" : "lightgray",
          color: darkMode ? "#f2f2f2" : "#222",
        }}
      >
        <div className="alert-content">
          <div
            className={`alert-icon ${isSuccess ? "success" : "error"}`}
            style={{
              color: isSuccess ? "#00bf62" : "#fe0044",
            }}
          >
            {isSuccess ? "✓" : "⚠"}
          </div>
          <p className="alert-message">{message}</p>
          <button
            className="alert-button"
            onClick={onClose}
            style={{
              backgroundColor: isSuccess ? "#00bf62" : "#5a5cde",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
