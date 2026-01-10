import React, { useContext } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import X from "../../../assets/imgs/x.png";
import XWhite from "../../../assets/imgs/x-white.png";

const CreateMeetModal = ({ post, onChange, onSubmit, onClose, ready }) => {
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="createPost"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: darkMode ? "#222" : "#fbfcfe",
          borderColor: darkMode ? "#444" : "darkgray",
          color: darkMode ? "#f2f2f2" : "#222",
        }}
      >
        <img
          src={darkMode ? XWhite : X}
          alt="close"
          className="x-post"
          onClick={onClose}
        />
        <form onSubmit={handleSubmit}>
          <div className="tituloDiv">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Meeting title..."
              value={post.title}
              onChange={onChange}
              maxLength={55}
              style={{
                backgroundColor: darkMode ? "#333" : "white",
                color: darkMode ? "#f2f2f2" : "#222",
                borderColor: darkMode ? "#555" : "lightgray",
              }}
            />
          </div>

          <div className="descDiv">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              placeholder="Describe your meeting..."
              value={post.description}
              onChange={onChange}
              maxLength={255}
              style={{
                backgroundColor: darkMode ? "#333" : "white",
                color: darkMode ? "#f2f2f2" : "#222",
                borderColor: darkMode ? "#555" : "lightgray",
              }}
            />
          </div>

          <div className="maxPeople">
            <label htmlFor="max">Maximum number of people</label>
            <input
              type="number"
              name="max"
              id="max"
              min="1"
              max="100"
              placeholder="Max participants..."
              value={post.max}
              onChange={onChange}
              style={{
                backgroundColor: darkMode ? "#333" : "white",
                color: darkMode ? "#f2f2f2" : "#222",
                borderColor: darkMode ? "#555" : "lightgray",
              }}
            />
          </div>

          <div className="selectDuration">
            <label htmlFor="duration">Duration</label>
            <select
              name="duration"
              id="duration"
              className="duration"
              value={post.duration}
              onChange={onChange}
              style={{
                backgroundColor: darkMode ? "#333" : "white",
                color: darkMode ? "#f2f2f2" : "#222",
                borderColor: darkMode ? "#555" : "lightgray",
              }}
            >
              <option value="2 hours">2 hours</option>
              <option value="8 hours">8 hours</option>
              <option value="1 day">1 day</option>
              <option value="3 days">3 days</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
            </select>
          </div>

          <button
            type="submit"
            className="postMeeting"
            disabled={!ready}
            style={{
              opacity: ready ? 1 : 0.5,
              cursor: ready ? "pointer" : "not-allowed",
            }}
          >
            {ready ? "Create Meeting" : "Creating..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetModal;
