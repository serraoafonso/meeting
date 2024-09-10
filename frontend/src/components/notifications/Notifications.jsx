import React, { useEffect, useState, useContext } from "react";
import "./notifications.css";
import X from "../../assets/imgs/x.png";
import Guy from "../../assets/imgs/guy.jpg";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";


function Notifications() {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    getRequests();
  }, [accepted]);

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sessionExpired) navigate("/login");
    setSessionExpired(false);
  }

  async function acceptFriend(idSend, idReceive) {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/friends/acceptRequest`,
        {
          credentials: "include",
          headers: { "Content-type": "application/json" },
          method: "put",
          body: JSON.stringify({ idSend, idReceive }),
        }
      );
      if (res.status == 400) {
        setSessionExpired(true);
        setTextoaviso("Session expired");
        setAviso(true);
        setLoading(false);
      } else if (res.status != 200) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
        setLoading(false);
      } else {
        setAccepted(true);
        setTextoaviso("You have just made a new friend!");
        setAviso(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setTextoaviso("Error");
      setAviso(true);
      setLoading(false);
    }
    setAccepted(true);
  }

  async function getRequests() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/friends/getRequests/${user.id}`,
        {
          credentials: "include",
        }
      );

      if (res.status != 200) {
        console.log(err);
      } else {
        const dt = await res.json();
        setData(dt);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteRequest(idSend, idReceive) {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/friends/deleteRequest`,
        {
          credentials: "include",
          headers: { "Content-type": "application/json" },
          method: "delete",
          body: JSON.stringify({ idSend, idReceive }),
        }
      );
      if (res.status == 400) {
        setSessionExpired(true);
        setTextoaviso("Session expired");
        setAviso(true);
        setLoading(false);
      } else if (res.status != 200) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
        setLoading(false);
      } else {
        setLoading(false);
        getRequests();
      }
    } catch (err) {
      console.log(err);
      setTextoaviso("Error");
      setAviso(true);
      setLoading(false);
    }
  }

  return (
    <div className='notifications'>
      <div className='notContainer'>
        {data.map((request) => {
          return (
            <div className='friendDiv'>
              <Link to={`/profile/${request.user.username_users}`}>
              <img
                src={request.user.profilePic_users}
                className='profileAmigo'
              />
              </Link>
              <span>
               <Link to={`/profile/${request.user.username_users}`}> {request.user.username_users} </Link> has sent you a friend request
              </span>
              <button
                className='acceptBtn'
                onMouseUp={() =>
                  acceptFriend(request.idSendRequest, request.idReceiveRequest)
                }
                style={{
                  backgroundColor: accepted && "white",
                  color: accepted && "darkgray",
                }}
              >
                {loading ? (
                  <span className='carregando'></span>
                ) : accepted ? (
                  "Friends"
                ) : (
                  "Accept"
                )}
              </button>
              <img src={X} alt='' className='xPequeno' onMouseUp={()=>deleteRequest(request.idSendRequest, request.idReceiveRequest)}/>
            </div>
          );
        })}
      </div>
      {aviso && (
        <div className='warning'>
          <span>{textoAviso}</span>
          <button className='warningBtn' onMouseUp={clickOk}>
            Ok
          </button>
        </div>
      )}
    </div>
  );
}

export default Notifications;
