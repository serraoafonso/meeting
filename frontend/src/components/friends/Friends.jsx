import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import More from "../../assets/imgs/more.png";
import MoreWhite from "../../assets/imgs/more-white.png";
import Trash from "../../assets/imgs/trash.png";
import TrashWhite from "../../assets/imgs/trash-white.png";
import Report from "../../assets/imgs/report.png";
import ReportWhite from "../../assets/imgs/report-white.png";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import X from "../../assets/imgs/x.png";
import moment from "moment";
export default function Friends() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const [more, setMore] = useState(false);
  const [meetMexido, setMeetMexido] = useState();
  const [meetDetails, setMeetDetails] = useState("");
  const [meetsOrdered, setMeetsOrdered] = useState([]);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["meeting"],
    queryFn: getData,
  });

  useEffect(() => {
    orderMeets();
  }, [data]);

  function handleX() {
    setMore(false);
    setMeetDetails("");
  }

  function handleMore(idMeet) {
    setMore(!more);
    setMeetMexido(idMeet);
    setMeetDetails("");
  }

  async function handleJoinMeet(e, meet) {
    e.preventDefault();

    let passou = true;

    if (meet.username_users == user.username) {
      setTextoaviso("The creator can't participate in its own meeting");
      setAviso(true);
      passou = false;
    } else if (meet.currentNumber >= meet.maxNumber) {
      setTextoaviso("Number of participants exceeded");
      setAviso(true);
      passou = false;
    }

    if (passou == true) {
      for (let i = 0; i < meet.currentNumber; i++) {
        if (meet.people[i].username == user.username) {
          setTextoaviso("You have already joined this meeting");
          setAviso(true);
          passou = false;
        }
      }
    }

    if (passou == true) {
      joinMutation.mutate(meet.meetId_meeting);
    }
  }

  const joinMutation = useMutation({
    mutationFn: async (meetId) => {
      let dateJoined = Date.now();

      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/meets/join/${user.id}`,
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ meetId, dateJoined }),
            credentials: "include",
          }
        );
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          console.log(res);
        } else {
          setTextoaviso("Joined with success!");
          setAviso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  async function handleDelete(e, meet) {
    e.preventDefault();
    setMore(false);

    if (meet.username_users == user.username) {
      deleteMutation.mutate(meet.meetId_meeting);
    } else {
      setTextoaviso("Only the owner can delete the meeting!");
      setAviso(true);
    }
  }

  const deleteMutation = useMutation({
    mutationFn: async (meetId) => {
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/meets/delete/${meetId}`,
          {
            method: "delete",
            headers: { "Content-type": "application/json" },
            credentials: "include",
          }
        );
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          console.log(res);
        } else {
          setTextoaviso("Meet deleted with success!");
          setAviso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "meeting" });
    },
  });

  async function getData() {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/meets/getMeetsFriends/${user.username}`,
        {
          credentials: "include",
        }
      );
      if (res.status != 200) {
        console.log(res);
      } else {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function orderMeets() {
    if (data?.length !== 0) {
      const upcomingMeetings = data?.filter(
        (meeting) => meeting.dateEnd_meeting > Date.now()
      );
      upcomingMeetings?.sort((a, b) => {
        const maxDiff =
          b.maxNumber_meeting -
          b.currentNumber -
          (a.maxNumber_meeting - a.currentNumber);
        if (maxDiff !== 0) {
          return maxDiff;
        }

        const popularityDiff = b.currentNumber - a.currentNumber;
        if (popularityDiff !== 0) {
          return popularityDiff;
        }

        return b.dateCreated_meeting - a.dateCreated_meeting;
      });
      setMeetsOrdered(upcomingMeetings);
    } else {
      setMeetsOrdered([]);
    }
  }

  function detalhesMeet() {
    let data = new Date(meetDetails.dateEnd_meeting);
    let dateLegivel = data.toLocaleString();

    //a div principal chama-se detalhesMeet
    return (
      <>
        <div className='cimaDetalhes'>
          <span>{meetDetails.title_meeting}</span>
          <img
            src={darkMode ? XWhite : X}
            alt=''
            className='x-post'
            onMouseUp={() => handleX()}
          />
        </div>
        <div className='meioDetalhes'>
          {meetDetails.people.length < 1 ? (
            <span style={{ marginTop: "8vh" }}>
              There is no one in the meeting
            </span>
          ) : (
            meetDetails.people.map((username) => {
              return (
                <div className='someoneDiv' key={username.username}>
                  <div className='userDetails'>
                    <Link
                      to={`/profile/${username.username}`}
                      style={{
                        textDecoration: "none",
                        color: darkMode ? "#f2f2f2" : "#222",
                      }}
                    >
                      <img src={username.profilePic} alt='' className='homem' />
                      <span>{username.username}</span>
                    </Link>
                  </div>
                  <div className='canDelete'>
                    {meetDetails.username_users == user.username && (
                      <span
                        onMouseUp={(e) =>
                          handleDeletePeopleinMeet(
                            e,
                            username.username,
                            meetDetails.meetId_meeting,
                            username.profilePic
                          )
                        }
                      >
                        delete
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className='baixoDetalhes'>
          <span>Ends at: {dateLegivel}</span>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className='posts'>
        {isLoading ? (
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        ) : error ? (
          <span>erro</span>
        ) : (
          meetsOrdered?.map((meet) => {
            return (
              <div className='post' key={meet.meetId_meeting}>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <Link
                    to={`/profile/${meet.username_users}`}
                    style={{
                      textDecoration: "none",
                      color: darkMode ? "#f2f2f2" : "#222",
                    }}
                  >
                    <img
                      src={meet.profilePic_meeting}
                      alt=''
                      className='userPic'
                    />
                    <span className='username'>{meet.username_users}</span>
                  </Link>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    {moment(meet?.dateCreated_meeting).fromNow()}
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>{meet.title_meeting}</h3>
                    </div>
                    <div className='descricao'>
                      <p>{meet.description_meeting}</p>
                    </div>
                  </div>
                  <div
                    className='googleMaps'
                    style={{ borderColor: darkMode ? "lightgray" : "black" }}
                  ></div>
                </div>
                <div
                  className='parteBaixo'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='pessoasBaixo'>
                    <div className='imagensPessoas'>
                      {meet?.people?.length < 1 ? (
                        ""
                      ) : meet?.people?.length == 1 ? (
                        <>
                          <img
                            src={meet?.people[0]?.profilePic}
                            alt=''
                            className='homem'
                            id='f1'
                            title={meet.people[0].username}
                          />
                        </>
                      ) : meet?.people?.length == 2 ? (
                        <>
                          <img
                            src={meet?.people[0]?.profilePic}
                            alt=''
                            className='homem'
                            id='f1'
                            title={meet.people[0].username}
                          />
                          <img
                            src={meet?.people[1]?.profilePic}
                            alt=''
                            className='homem'
                            id='f2'
                            title={meet.people[1].username}
                          />
                        </>
                      ) : meet?.people?.length == 3 ? (
                        <>
                          <img
                            src={meet?.people[0]?.profilePic}
                            alt=''
                            className='homem'
                            id='f1'
                            title={meet.people[0].username}
                          />
                          <img
                            src={meet?.people[1]?.profilePic}
                            alt=''
                            className='homem'
                            id='f2'
                            title={meet.people[1].username}
                          />
                          <img
                            src={meet?.people[2]?.profilePic}
                            alt=''
                            className='homem'
                            id='f3'
                            title={meet.people[2].username}
                          />
                        </>
                      ) : (
                        meet?.people?.length > 3 && (
                          <>
                            <img
                              src={meet?.people[0]?.profilePic}
                              alt=''
                              className='homem'
                              id='f1'
                              title={meet.people[0].username}
                            />
                            <img
                              src={meet?.people[1]?.profilePic}
                              alt=''
                              className='homem'
                              id='f2'
                              title={meet.people[1].username}
                            />
                            <img
                              src={meet?.people[2]?.profilePic}
                              alt=''
                              className='homem'
                              id='f3'
                              title={meet.people[2].username}
                            />
                            <div
                              className='maisQuantos'
                              id='f4'
                              style={{
                                color: darkMode ? "#3a3a3b" : "black",
                                backgroundColor: darkMode && "lightgrey",
                              }}
                            >
                              +{meet?.people?.length - 3}
                            </div>
                          </>
                        )
                      )}
                    </div>
                    <span className='maximo'>
                      {meet.people.length}/{meet.maxNumber_meeting}
                    </span>
                  </div>
                  <div className='botaoM'>
                    <button
                      className='juntar'
                      onMouseUp={(e) => handleJoinMeet(e, meet)}
                    >
                      Juntar-se!
                    </button>
                  </div>
                  <div className='more-div'>
                    <img
                      src={darkMode ? MoreWhite : More}
                      className='more-img'
                      onMouseUp={() => handleMore(meet.meetId_meeting)}
                    />
                    {more &&
                      meetMexido == meet.meetId_meeting &&
                      (user.username == meet.username_users ? (
                        <div
                          className='options'
                          style={{ backgroundColor: darkMode && "#222" }}
                        >
                          <div
                            className='details'
                            onMouseUp={() => setMeetDetails(meet)}
                          >
                            {/*<img src={darkMode ? TrashWhite : Trash} alt='' />*/}
                            <span>Details</span>
                          </div>
                          <div
                            className='delete'
                            onMouseUp={(e) => handleDelete(e, meet)}
                          >
                            <img src={darkMode ? TrashWhite : Trash} alt='' />
                            <span>Delete</span>
                          </div>
                          <div className='report'>
                            <img src={darkMode ? ReportWhite : Report} alt='' />
                            <span> Report</span>
                          </div>
                        </div>
                      ) : (
                        <div className='options'>
                          <div
                            className='details'
                            onMouseUp={() => setMeetDetails(meet)}
                          >
                            {/*<img src={darkMode ? TrashWhite : Trash} alt='' />*/}
                            <span>Details</span>
                          </div>
                          <div className='report'>
                            <img src={darkMode ? ReportWhite : Report} alt='' />
                            <span> Report</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {aviso && (
        <div className='warning'>
          <span>{textoAviso}</span>
          <button className='warningBtn' onMouseUp={clickOk}>
            Ok
          </button>
        </div>
      )}
      {meetDetails != "" && (
        <div className='detalhesMeet'>
          {meetDetails != "" && detalhesMeet()}
        </div>
      )}
    </div>
  );
}
