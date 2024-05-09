import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Add from "../../assets/imgs/add.png";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MessengerWhite from "../../assets/imgs/messenger-white.png";
import Guy from "../../assets/imgs/guy.jpg";
import X from "../../assets/imgs/x.png";
import XWhite from "../../assets/imgs/x-white.png";
import More from "../../assets/imgs/more.png";
import MoreWhite from "../../assets/imgs/more-white.png";
import Trash from "../../assets/imgs/trash.png";
import TrashWhite from "../../assets/imgs/trash-white.png";
import Report from "../../assets/imgs/report.png";
import ReportWhite from "../../assets/imgs/report-white.png";
import "./feed.css";
import { UserContext } from "../../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export default function Feed() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto, user } = useContext(UserContext);
  const [descAberta, setDescAberta] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [meetsOrdered, setMeetsOrdered] = useState([]);
  const [more, setMore] = useState(false);
  const [meetMexido, setMeetMexido] = useState();
  const [meetDetails, setMeetDetails] = useState("");

  const [post, setPost] = useState({
    title: "",
    description: "",
    max: "",
    duration: "2 hours",
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["meeting"],
    queryFn: getData,
  });

  useEffect(() => {
    orderMeets();
  }, [data]);


  async function handleChange(e) {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sucesso) setCreatePost(false);
    if (sessionExpired) navigate("/login");
    setSessionExpired(false);
  }

  function handleMore(idMeet) {
    setMore(!more);
    setMeetMexido(idMeet);
    setMeetDetails("");
  }

  function handleX() {
    setMore(false);
    setMeetDetails("");
  }

  function muda() {
    setChatAberto(true);
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
                    <img src={username.profilePic} alt='' className='homem' />
                    <span>{username.username}</span>
                  </div>
                  <div className='canDelete'>
                    {meetDetails.username_users == user.username && (
                      <span onMouseUp={(e)=>handleDeletePeopleinMeet(e, username.username, meetDetails.meetId_meeting, username.profilePic)}>delete</span>
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

  function calculaSegundos() {
    let duration = post.duration;
    let segundos;

    switch (duration) {
      case "2 hours":
        segundos = 2 * 60 * 60 * 1000;
        break;
      case "8 hours":
        segundos = 8 * 60 * 60 * 1000;
        break;
      case "1 day":
        segundos = 24 * 60 * 60 * 1000;
        break;
      case "3 days":
        segundos = 3 * 24 * 60 * 60 * 1000;
        break;
      case "1 week":
        segundos = 7 * 24 * 60 * 60 * 1000;
        break;
      case "2 weeks":
        segundos = 14 * 24 * 60 * 60 * 1000;
        break;
      case "1 month":
        segundos = 30 * 24 * 60 * 60 * 1000; // 30 dias
        break;
      case "3 months":
        segundos = 3 * 30 * 24 * 60 * 60 * 1000; //  90 dias
        break;
      default:
        segundos = 0; // Valor padrão caso não corresponda a nenhum dos casos
        break;
    }

    return segundos;
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

  async function handleDeletePeopleinMeet(e, username, meetId, profilePic) {
    e.preventDefault();
    let id;
    try {
      const data = await fetch(
        `http://localhost:3000/api/user/getUser/${username}`,
        {
          credentials: "include",
        }
      );
      if(data.status != 200) console.log(data)
      let json = await data.json()
      id = json.id_users;
    } catch (err) {
      console.log(err);
    }
    deletePeopleinMutation.mutate({meetId, id, username, profilePic})

  }


  async function handleDelete(e, meet) {
    e.preventDefault();
    setMore(false);

    if (meet.username_users == user.username) {
      deleteMutation.mutate(meet.meetId_meeting);
    } else {
      setTextoaviso("Only the owner can delete the meeting!");
      setAviso(true);
      setReady(true);
    }
  }

  async function handleJoinMeet(e, meet) {
    e.preventDefault();

    let passou = true;

    if (meet.username_users == user.username) {
      setTextoaviso("The creater can't participate in its own meeting");
      setAviso(true);
      setReady(true);
      passou = false;
    } else if (meet.currentNumber >= meet.maxNumber) {
      setTextoaviso("Number of participants exceeded");
      setAviso(true);
      setReady(true);
      passou = false;
    }

    if (passou == true) {
      for (let i = 0; i < meet.currentNumber; i++) {
        if (meet.people[i].username == user.username) {
          setTextoaviso("You have already joined this meeting");
          setAviso(true);
          setReady(true);
          passou = false;
        }
      }
    }

    if (passou == true) {
      joinMutation.mutate(meet.meetId_meeting);
    }
  }

  const deletePeopleinMutation = useMutation({
    mutationFn: async({meetId, id, username, profilePic}) =>{
      try{
        setReady(false);
        const res = await fetch(`http://localhost:3000/api/meets/deleteUser/${meetId}`,{
          method: "delete",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({userId: id})
        })
        console.log(res)
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
          console.log(res);
        } else {
          if(id == user.id) setTextoaviso("You leaved the meet with success!");
          setTextoaviso("Removed with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
          let i = meetDetails.people.indexOf({
            username,
            profilePic
          })
          meetDetails.people.splice(i, 1)
          //setMeetDetails(meetDetails)
        }
      }catch(err){
        console.log(err);
        setTextoaviso("Error");
          setAviso(true);
          setReady(true);
      }
    },onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: 'meeting'})
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (meetId) => {
      try {
        setReady(false);
        const res = await fetch(
          `http://localhost:3000/api/meets/delete/${meetId}`,
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
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
          console.log(res);
        } else {
          setTextoaviso("Meet deleted with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
          setAviso(true);
          setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "meeting" });
    },
  });

  const joinMutation = useMutation({
    mutationFn: async (meetId) => {
      let dateJoined = Date.now();

      try {
        setReady(false);
        const res = await fetch(
          `http://localhost:3000/api/meets/join/${user.id}`,
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
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
          console.log(res);
        } else {
          setTextoaviso("Joined with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
        setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  async function getData() {
    try {
      const res = await fetch("http://localhost:3000/api/meets/getAll", {
        credentials: "include",
      });
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

  function handleCreateMeeting(e) {
    e.preventDefault();

    let segundos = calculaSegundos();
    let dateCreated = Date.now();
    let dateEnd = dateCreated + segundos;

    const data = {
      maxNumber: post.max,
      title: post.title,
      description: post.description,
      dateCreated,
      dateEnd,
    };
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        setReady(false);
        const res = await fetch(
          `http://localhost:3000/api/meets/create/${user.id}`,
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
        } else {
          setTextoaviso("Post create with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Email already registered");
        setAviso(true);
        setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  return (
    <div
      className='principalDiv'
      style={{ borderColor: darkMode ? "lightgray" : "black" }}
    >
      <div className='posts'>
        {isLoading ? (
          <div class='three-body'>
            <div class='three-body__dot'></div>
            <div class='three-body__dot'></div>
            <div class='three-body__dot'></div>
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
                ><Link to={`/profile/${meet.username_users}`} style={{textDecoration: 'none', color: darkMode ? "#f2f2f2" : "#222"}}>
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
                        <div className='options' style={{backgroundColor: darkMode && '#222'}}>
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
      <div className='divAbs'>
        <img
          src={AddWhite}
          alt=''
          className='abs'
          id='add'
          onClick={() => setCreatePost(true)}
        />
        {!chatAberto && (
          <img src={Messenger} alt='' className='abs' id='msg' onClick={muda} />
        )}
      </div>
      <div
        className='createPost'
        style={{
          display: createPost ? "block" : "none",
          backgroundColor: darkMode ? "#2b2b2b" : "#f2f2f2",
        }}
      >
        <img
          src={darkMode ? XWhite : X}
          alt=''
          className='x-post'
          onMouseUp={() => setCreatePost(false)}
        />
        <div className='tituloDiv'>
          <label>Title:</label>
          <input
            type='text'
            name='title'
            value={post.title}
            onChange={handleChange}
            placeholder='Your title'
            style={{
              backgroundColor: darkMode && "#3c3c3c",
              color: darkMode && "#f2f2f2",
            }}
          />
        </div>
        <div className='descDiv'>
          <label>Description: </label>
          <textarea
            type='text'
            name='description'
            value={post.description}
            onChange={handleChange}
            rows='2'
            placeholder='Your description'
            style={{
              backgroundColor: darkMode && "#3c3c3c",
              color: darkMode && "#f2f2f2",
            }}
          />
        </div>
        <div className='maxPeople'>
          <label>Max people: </label>
          <input
            type='number'
            name='max'
            value={post.max}
            onChange={handleChange}
            min='0'
            step='1'
            placeholder='Maximum'
            style={{
              backgroundColor: darkMode && "#3c3c3c",
              color: darkMode && "#f2f2f2",
            }}
          />
        </div>
        <div className='selectDuration'>
          <label>Duration: </label>
          <select
            name='duration'
            id='duration'
            className='duration'
            value={post.duration}
            onChange={handleChange}
            style={{
              backgroundColor: darkMode && "#3c3c3c",
              color: darkMode && "#f2f2f2",
            }}
          >
            <option value='2 hours'>2 hours</option>
            <option value='8 hours'>8 hours</option>
            <option value='1 day'>1 day</option>
            <option value='3 days'>3 days</option>
            <option value='1 week'>1 week</option>
            <option value='2 weeks'>2 weeks</option>
            <option value='1 month'>1 month</option>
            <option value='3 months'>3 months</option>
          </select>
        </div>
        <button className='postMeeting' onMouseUp={handleCreateMeeting}>
          Post meeting
        </button>
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
