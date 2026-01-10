import React, { useContext, memo } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import { UserContext } from "../../../context/userContext";
import More from "../../../assets/imgs/more.png";
import MoreWhite from "../../../assets/imgs/more-white.png";
import moment from "moment";

const MeetCard = memo(({ meet, onJoin, onMore }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);

  const timeAgo = moment(meet.dateCreated_meeting).fromNow();
  const isOwner = meet.username_users === user.username;
  const spotsLeft = meet.maxNumber_meeting - meet.currentNumber;

  return (
    <div className="post" style={{ backgroundColor: darkMode ? "#222" : "white" }}>
      <div
        className="parteCima"
        style={{
          backgroundColor: darkMode ? "#222" : "white",
          borderColor: darkMode ? "#444" : "black",
          color: darkMode ? "#f2f2f2" : "#222",
        }}
      >
        <Link
          to={`/profile/${meet.username_users}`}
          style={{ textDecoration: "none", color: darkMode ? "#f2f2f2" : "#222" }}
        >
          <span className="username">{meet.username_users}</span>
        </Link>
        <span className="tempo">{timeAgo}</span>
      </div>

      <div
        className="parteMeio"
        style={{
          backgroundColor: darkMode ? "#222" : "white",
          borderColor: darkMode ? "#444" : "black",
          borderRight: darkMode ? "1px solid #444" : "1px solid black",
          color: darkMode ? "#f2f2f2" : "#222",
        }}
      >
        <div className="ladoEsquerdo">
          <div className="titulo">
            <h3>{meet.title_meeting}</h3>
          </div>
          <div className="descricao">
            <p>{meet.description_meeting}</p>
          </div>
        </div>
      </div>

      <div
        className="parteBaixo"
        style={{
          backgroundColor: darkMode ? "#222" : "white",
          borderColor: darkMode ? "#444" : "black",
          color: darkMode ? "#f2f2f2" : "#222",
        }}
      >
        <div className="pessoasBaixo">
          <div className="imagensPessoas">
            {meet.people.slice(0, 3).map((person, index) => (
              <Link
                key={person.username}
                to={`/profile/${person.username}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={person.profilePic}
                  alt={person.username}
                  className="userPic"
                  id={`f${index + 1}`}
                />
              </Link>
            ))}
            {meet.people.length > 3 && (
              <div
                id="f4"
                style={{
                  backgroundColor: darkMode ? "#444" : "rgb(238, 238, 238)",
                  color: darkMode ? "#f2f2f2" : "#222",
                }}
              >
                +{meet.people.length - 3}
              </div>
            )}
          </div>
          <span className="maximo">
            {meet.currentNumber}/{meet.maxNumber_meeting}
            {spotsLeft > 0 && ` (${spotsLeft} spots left)`}
          </span>
        </div>

        <div className="botaoM">
          {!isOwner && (
            <button
              className="juntar"
              onClick={(e) => onJoin(e, meet)}
              disabled={meet.currentNumber >= meet.maxNumber_meeting}
              style={{
                opacity: meet.currentNumber >= meet.maxNumber_meeting ? 0.5 : 1,
                cursor: meet.currentNumber >= meet.maxNumber_meeting ? "not-allowed" : "pointer",
              }}
            >
              {meet.currentNumber >= meet.maxNumber_meeting ? "Full" : "Join"}
            </button>
          )}
          <div className="more-div">
            <img
              src={darkMode ? MoreWhite : More}
              alt="more"
              className="more-img"
              onClick={() => onMore(meet.meetId_meeting)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

MeetCard.displayName = "MeetCard";

export default MeetCard;
