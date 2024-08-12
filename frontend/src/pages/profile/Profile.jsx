import React, { useContext, useEffect, useState } from "react";
import Arrow from "../../assets/imgs/left.png";
import ArrowWhite from "../../assets/imgs/left-white.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import Guy from "../../assets/imgs/guy.jpg";
import Check from "../../assets/imgs/check.png";
import CheckPurple from "../../assets/imgs/check-purple.png";
import More from "../../assets/imgs/more.png";
import MoreWhite from "../../assets/imgs/more-white.png";
import Trash from "../../assets/imgs/trash.png";
import TrashWhite from "../../assets/imgs/trash-white.png";
import Report from "../../assets/imgs/report.png";
import ReportWhite from "../../assets/imgs/report-white.png";
import X from "../../assets/imgs/x.png";
import XWhite from "../../assets/imgs/x-white.png";
import "./profile.css";
import { UserContext } from "../../context/userContext";
import Default from "../../assets/imgs/user.png";
import Edit from "../../assets/imgs/edit.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const { darkMode } = useContext(DarkModeContext);
  const { user, changeUser } = useContext(UserContext);
  const [meuProfile, setMeuProfile] = useState(true);
  const [menu, setMenu] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [ready, setReady] = useState(true);
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [meetsOrdered, setMeetsOrdered] = useState([]);
  const [more, setMore] = useState(false);
  const [meetMexido, setMeetMexido] = useState();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [meetDetails, setMeetDetails] = useState("");
  const [donoProfile, setDonoProfile] = useState("");
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [myFriend, setMyFriend] = useState(false);


  const navigate = useNavigate();

  let username = useLocation().pathname.split("/")[2];

  useEffect(() => {
    if (username == user.username) {
      setMeuProfile(true);
      setDonoProfile(user?.username);
    } else {
      setMeuProfile(false);
      setDonoProfile(username);
    }
  }, [username]);
  
  useEffect(() => { 
    if(donoProfile != "" && donoProfile != null){
      getUser();
    }
    
  }, [donoProfile]);


  const [dados, setDados] = useState({
    age: "",
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePic: '',
    friends: '',
    id: ''
  });

  function handleMore(idMeet) {
    setMore(!more);
    setMeetMexido(idMeet);
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["meeting"],
    queryFn: getMeetData,
    enabled: userDataLoaded
  });

  useEffect(() => {
    orderMeets();
  }, [data]);

  useEffect(() => {
    if (file) {
        editUser();
    }
}, [file]);

  function handleX() {
    setMore(false);
    setMeetDetails("");
  }

  async function sendRequest(){
    setReady(false);
    try{
      const res = await fetch('http://localhost:3000/api/friends/sendRequest',{
        method: 'post',
        credentials: 'include',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({idSend: user.id, idReceive: dados.id})
      })
      if (res.status == 400) {
        setSessionExpired(true);
        setTextoaviso("Session expired");
        setAviso(true);
        setReady(true);
      } else if (res.status != 200) {
        setTextoaviso("Error")
        setAviso(true);
        setReady(true);
        console.log(res);
      }else{
        setTextoaviso("Success")
        setAviso(true);
        setReady(true);
        setRequestSent(true);
      }
    }catch(err){
      console.log(err);
      setTextoaviso("Error")
        setAviso(true);
        setReady(true);
    }
  }

  function detalhesMeet() {
    let data = new Date(meetDetails.dateEnd_meeting);
    let dateLegivel = data.toLocaleString();

    console.log(meetDetails);

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
                      <span>delete</span>
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

  async function getMeetData() {
    if(dados.id !=""){
      try {
        const res = await fetch(
          `http://localhost:3000/api/meets/get/${dados.id}`,
          {
            credentials: "include",
          }
        );
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          console.log(res);
        } else {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    }
    
  }

  function handleChange(e) {
    setDados((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sessionExpired) navigate("/login");
    setSessionExpired(false);
  }

  async function upload() {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "post",
        body: formData,
      });
      const data = await res.json(); // Parse the response data as JSON
      console.log("Uploaded image URL:", data); // Log the URL to check if it's correct
      return data; // Return the URL received from the server
    } catch (err) {
      console.log(err);
    }
  }

  async function getUser() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/getUser/${donoProfile}`,
        {
          credentials: "include",
        }
      );
      if (res.status != 200) {
        console.log("Erro: ", res);
      } else {
        const data = await res.json();
        setDados({
          age: data.age_users == null ? 0 : data.age_users,
          name: data.name_users,
          username: data.username_users,
          email: data.email_users,
          bio: data.bio_users == null ? "" : data.bio_users,
          profilePic: data.profilePic_users == null ? "" : data.profilePic_users,
          id: data.id_users,
          friends: data.total_friends
        });
        
        for( let i = 0; i < data.friends?.length; i++ ){
          if(data.friends[i] == user.username){
            setMyFriend(true);
          }
        }
        setUserDataLoaded(true);
        //console.log(data)
      }
      
    } catch (err) {
      console.log(err);
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

    if (passou == true) joinMutation.mutate(meet.meetId_meeting);
  }

  const joinMutation = useMutation({
    mutationFn: async (meetId) => {
      try {
        setReady(false);
        const res = await fetch(
          `http://localhost:3000/api/meets/join/${user.id}`,
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ meetId }),
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

  async function editUser() {
    let imgUrl = "";
    if (file != "") {
      imgUrl = await upload();
    }

    let img;
    if (imgUrl !== "") {
      
      img = {
        profilePic: `http://localhost:5173/uploads/${imgUrl}`, // Replace "uploads" with the folder where images are stored on the server.
      };
    } else {
      img = {
        profilePic: user.profilePic,
      };
    }


    try {
      setReady(false);

      const data = {
        ...dados,
        ...img,
      };

      console.log(data);

      const res = await fetch(
        `http://localhost:3000/api/user/edit/${user?.id}`,
        {
          method: "put",
          credentials: "include",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json" },
        }
      );
      if (res.status != 200) {
        console.log(res);
        setTextoaviso("Error!");
        setAviso(true);
        setReady(true);
      } else {
        changeUser({
          email: dados.email,
          name: dados.name,
          username: dados.username,
          profilePic: img.profilePic,
          id: user?.id,
        });
        setTextoaviso("Changes submited!");
        setAviso(true);
        setReady(true);
      }
    } catch (err) {
      console.log(err);
      setTextoaviso("Error!");
      setAviso(true);
      setReady(true);
    }
  }

  function handleFile(e) {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setLink(URL.createObjectURL(selectedFile));
  }

  return (
    <div className='profileDivA' style={{display: 'flex', flexDirection: 'column'}}>
      <div className='parteCimatoda' style={{flex: 1, paddingBottom: 50}}>
        <div className='arrowLeft'>
          <Link to='/'>
            <img src={darkMode ? ArrowWhite : Arrow} alt='' />
          </Link>
          <h3 className='nomeProfile'>{dados.name}</h3>
          <span className='usernameSpan'>@{dados.username}</span>
          <div className='parteCimaProfile'>
            <div className='imagemPerfil'>
              <img
                src={
                  meuProfile ? (file
                    ? URL.createObjectURL(file)
                    : user?.profilePic == ""
                    ? Default
                    : user?.profilePic) : (
                      dados?.profilePic
                    )
                }
                alt=''
              />
            </div>
            {
              meuProfile && <button className='mudaFoto'>
              <span className='long'>
                Change profile picture
                <input
                  type='file'
                  className='chooseFile'
                  id='file'
                  name='file'
                  onChange={(e) => handleFile(e)}
                />
              </span>
              <span className='short'>
                <img src={Edit} className='imgShort' />
              </span>
            </button>
            }
            
            <div className='amigos'>
              <span className='numberOfFriends'>{dados.friends} friends</span>
              {!meuProfile && (
  myFriend ? (
    <div
      className='amizade'
      style={{
        backgroundColor: !darkMode ? "#f2f2f2" : "#5a5cde",
        border: !darkMode && "1px solid lightgray",
      }}
    >
      <button style={{ color: darkMode ? "#f2f2f2" : "black" }}>
        Amigo
      </button>
      <img src={!darkMode ? CheckPurple : Check} alt='' />
    </div>
  ) : (
    !requestSent ? (
      <div
        className='amizade'
        style={{
          backgroundColor: !darkMode ? "#f2f2f2" : "#5a5cde",
          border: !darkMode && "1px solid lightgray",
        }}
      >
        <button style={{ color: darkMode ? "#f2f2f2" : "black" }} onClick={sendRequest}>
         {ready ? 'Send friend Request' : <span className='carregando'></span>}
        </button>
      </div>
    ) : (
      <div
        className='amizade'
        style={{
          backgroundColor: !darkMode ? "#f2f2f2" : "#5a5cde",
          border: !darkMode && "1px solid lightgray",
        }}
      >
        <button style={{ color: darkMode ? "#f2f2f2" : "black" }}>
          Sent
        </button>
        <img src={!darkMode ? CheckPurple : Check} alt='' />
      </div>
    )
  )
)}

              
              <div className='detalhes'>
                <span>{dados.bio}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='baixoProfile' style={{flex: 1}}>
        <div className='menuProfile'>
          {meuProfile ? (
            <>
              <span
                className='spanPosts'
                style={{
                  textDecoration: menu && "underline",
                  color: menu && "#5a5cde",
                }}
                onClick={() => setMenu(true)}
              >
                Posts
              </span>
              <span
                className='spanProfile'
                style={{
                  textDecoration: !menu && "underline",
                  color: !menu && "#5a5cde",
                }}
                onClick={() => setMenu(false)}
              >
                Edit Profile
              </span>
            </>
          ) : (
            <span className='spanPosts'>Posts</span>
          )}
        </div>
        
        {menu ? (
          <div className='ultimosPosts'>
            {isLoading ? (
              <span className='carregando'></span>
            ) : error ? (
              <span>There are no meetings</span>
            ) : (
              meetsOrdered?.map((meet) => {
                return (
                  <div className='postProfile' key={meet.meetId_meeting}>
                    <div
                      className='parteCima'
                      style={{
                        borderColor: darkMode ? "lightgray" : "black",
                      }}
                    >
                      <img
                        src={meet.profilePic_meeting}
                        alt=''
                        className='userPic'
                        style={{ width: "4vh", height: "4vh" }}
                      />
                      <span className='username'>{meet.username_users}</span>
                      <span
                        className='tempo'
                        tyle={{ color: darkMode ? "lightgray" : "gray" }}
                      >
                        {moment(meet?.dateCreated_meeting).fromNow()}
                      </span>
                    </div>
                    <div
                      className='parteMeio'
                      style={{
                        borderColor: darkMode ? "lightgray" : "black",
                      }}
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
                        style={{
                          borderColor: darkMode ? "lightgray" : "black",
                        }}
                      ></div>
                    </div>
                    <div
                      className='parteBaixo'
                      style={{
                        borderColor: darkMode ? "lightgray" : "black",
                      }}
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
                          {meet.currentNumber}/{meet.maxNumber_meeting}
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
                        {more && (
                          <div className='options'>
                            {meetMexido == meet.meetId_meeting &&
                              (user.username == meet.username_users ? (
                                <>
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
                                    <img
                                      src={darkMode ? TrashWhite : Trash}
                                      alt=''
                                    />
                                    <span>Delete</span>
                                  </div>

                                  <div className='report'>
                                    <img
                                      src={darkMode ? ReportWhite : Report}
                                      alt=''
                                    />
                                    <span> Report</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className='details'
                                    onMouseUp={() => setMeetDetails(meet)}
                                  >
                                    {/*<img src={darkMode ? TrashWhite : Trash} alt='' />*/}
                                    <span>Details</span>
                                  </div>
                                  <div className='report'>
                                    <img
                                      src={darkMode ? ReportWhite : Report}
                                      alt=''
                                    />
                                    <span> Report</span>
                                  </div>
                                </>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className='editProfile'>
            <input
              type='text'
              name='name'
              value={dados.name}
              onChange={handleChange}
              placeholder='Name'
              style={{
                backgroundColor: darkMode && "#222",
                borderColor: darkMode && "#5a5cde",
              }}
            />
            <input
              type='text'
              name='username'
              value={dados.username}
              onChange={handleChange}
              placeholder='Username'
              style={{
                backgroundColor: darkMode && "#222",
                borderColor: darkMode && "#5a5cde",
              }}
            />
            <input
              type='email'
              name='email'
              value={dados.email}
              onChange={handleChange}
              placeholder='Email'
              style={{
                backgroundColor: darkMode && "#222",
                borderColor: darkMode && "#5a5cde",
              }}
            />
            <input
              type='text'
              name='age'
              value={dados.age}
              onChange={handleChange}
              placeholder='Age'
              style={{
                backgroundColor: darkMode && "#222",
                borderColor: darkMode && "#5a5cde",
              }}
            />
            <input
              type='text'
              name='bio'
              value={dados.bio}
              onChange={handleChange}
              placeholder='Bio'
              style={{
                backgroundColor: darkMode && "#222",
                borderColor: darkMode && "#5a5cde",
              }}
            />
            <button className='submitChanges' onMouseUp={editUser}>
              {ready ? "Submit changes" : <span className='carregando'></span>}
            </button>
            </div> 
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
