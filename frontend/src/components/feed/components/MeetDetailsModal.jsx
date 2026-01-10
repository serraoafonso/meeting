import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import { UserContext } from "../../../context/userContext";
import X from "../../../assets/imgs/x.png";
import XWhite from "../../../assets/imgs/x-white.png";

const MeetDetailsModal = ({ meetDetails, onClose, onDeletePerson }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);

  if (!meetDetails) return null;

  const data = new Date(meetDetails.dateEnd_meeting);
  const dateLegivel = data.toLocaleString();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="detalhesMeet"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: darkMode ? "#222" : "rgb(235, 235, 235)",
          borderColor: darkMode ? "#444" : "lightgrey",
          color: darkMode ? "#f2f2f2" : "#222",
        }}
      >
        <div
          className="cimaDetalhes"
          style={{
            borderColor: darkMode ? "#444" : "lightgray",
          }}
        >
          <span>{meetDetails.title_meeting}</span>
          <img
            src={darkMode ? XWhite : X}
            alt="close"
            className="x-post"
            onClick={onClose}
          />
        </div>

        <div className="meioDetalhes">
          {meetDetails.people.length < 1 ? (
            <span style={{ marginTop: "8vh" }}>
              There is no one in the meeting
            </span>
          ) : (
            meetDetails.people.map((person) => (
              <div
                key={person.username}
                className="someoneDiv"
                style={{
                  borderColor: darkMode ? "#444" : "lightgray",
                }}
              >
                <div className="userDetails">
                  <Link
                    to={`/profile/${person.username}`}
                    style={{
                      textDecoration: "none",
                      color: darkMode ? "#f2f2f2" : "#222",
                    }}
                  >
                    <img src={person.profilePic} alt="" className="homem" />
                    <span>{person.username}</span>
                  </Link>
                </div>
                <div className="canDelete">
                  {meetDetails.username_users === user.username && (
                    <span
                      onClick={(e) =>
                        onDeletePerson(
                          e,
                          person.username,
                          meetDetails.meetId_meeting,
                          person.profilePic
                        )
                      }
                    >
                      delete
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="baixoDetalhes"
          style={{
            borderColor: darkMode ? "#444" : "lightgray",
          }}
        >
          <span>Ends at: {dateLegivel}</span>
        </div>
      </div>
    </div>
  );
};

export default MeetDetailsModal;
