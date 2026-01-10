import React, { useContext } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import Trash from "../../../assets/imgs/trash.png";
import TrashWhite from "../../../assets/imgs/trash-white.png";

const MeetOptions = ({ meet, onDelete, onDetails }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className="options"
      style={{
        backgroundColor: darkMode ? "#333" : "#f2f2f2",
        borderColor: darkMode ? "#555" : "lightgray",
        color: darkMode ? "#f2f2f2" : "#222",
      }}
    >
      <div
        className="details"
        onClick={() => onDetails(meet)}
        style={{
          borderColor: darkMode ? "#555" : "lightgray",
        }}
      >
        <span>Details</span>
      </div>
      <div
        className="delete"
        onClick={(e) => onDelete(e, meet)}
        style={{
          borderColor: darkMode ? "#555" : "lightgray",
        }}
      >
        <img src={darkMode ? TrashWhite : Trash} alt="delete" />
        <span>Delete</span>
      </div>
    </div>
  );
};

export default MeetOptions;
