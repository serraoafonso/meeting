import React, { useContext, useEffect, useState } from "react";
import Arrow from "../../assets/imgs/left.png";
import ArrowWhite from "../../assets/imgs/left-white.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import Guy from "../../assets/imgs/guy.jpg";
import Check from "../../assets/imgs/check.png";
import CheckPurple from "../../assets/imgs/check-purple.png";
import "./profile.css";
import { UserContext } from "../../context/userContext";
import Default from "../../assets/imgs/user.png";
import Edit from "../../assets/imgs/edit.png"

export default function Profile() {
  const { darkMode } = useContext(DarkModeContext);
  const { user, changeUser } = useContext(UserContext);
  const [meuProfile, setMeuProfile] = useState(true);
  const [menu, setMenu] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [ready, setReady] = useState(true);
  const [link, setLink] = useState('')
  const [file, setFile] = useState(null)

  const [dados, setDados] = useState({
    age: "",
    name: "",
    username: "",
    email: "",
    bio: ""
  });

  useEffect(() => {
    getUser();
  }, []);

  function handleChange(e) {
    setDados((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
  }

  async function upload(){
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'post',
        body: formData,
      });
      const data = await res.json(); // Parse the response data as JSON
      console.log('Uploaded image URL:', data); // Log the URL to check if it's correct
      return data; // Return the URL received from the server
    } catch (err) {
      console.log(err);
    }
  }

  async function getUser() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/getUser/${user.username}`,
        {
          credentials: "include",
        }
      );
      if (res.status != 200) {
        console.log("Erro: ", res);
      } else {
        const data = await res.json();
        console.log(data);
        setDados({
          age: data.age_users == null ? 0 : data.age_users,
          name: data.name_users,
          username: data.username_users,
          email: data.email_users,
          bio: data.bio_users == null ? "" : data.bio_users,
          profilePic: data.profilePic == null ? "": data.profilePic
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function editUser(e) {

    e.preventDefault();
    let imgUrl = '';

    if (file) {
      imgUrl = await upload();
    } 

    let img;
    if (imgUrl !== "") {
      img = {
        profilePic: `http://localhost:5173/uploads/${imgUrl}` // Replace "uploads" with the folder where images are stored on the server.
      };
    } else {
      img = {
        profilePic: user.profilePic
      };
    }

    try {
      setReady(false);

      const data = {
        ...dados,
        ...img
      }

      console.log(data)

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
          id: user?.id
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

  function handleFile(e){
    e.preventDefault();
    setFile(e.target.files[0]);
    setLink(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='profileDivA'>
      <div className='parteCimatoda'>
        <div className='arrowLeft'>
          <Link to='/'>
            <img src={darkMode ? ArrowWhite : Arrow} alt='' />
          </Link>
          <h3 className='nomeProfile'>{user.name}</h3>
          <span className='usernameSpan'>@{user.username}</span>
          <div className='parteCimaProfile'>
            <div className='imagemPerfil'>
              <img
                src={file ? URL.createObjectURL(file) : (user?.profilePic == "" ? Default : user?.profilePic)}
                alt=''
              />
            </div>
            <button className='mudaFoto'><span className="long">Change profile picture<input type="file" className="chooseFile" id="file" name="file" onChange={e=>handleFile(e)}/></span><span className="short"><img src={Edit} className="imgShort"/></span></button>
            <div className='amigos'>
              <span className='numberOfFriends'>20 friends</span>
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
              <div className='detalhes'>
                <span>{dados.bio}</span>
              </div>
            </div>
          </div>
          <div className='baixoProfile'>
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
                    className='editProfile'
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
          </div>
          {menu ? (
            <div className='ultimosPosts'>
              <div className='postProfile'>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <img
                    src={Guy}
                    alt=''
                    className='userPic'
                    style={{ width: "4vh" }}
                  />
                  <span className='username'>serraoafonso</span>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    1 min ago
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>Praia do lido amanhã</h3>
                    </div>
                    <div className='descricao'>
                      <p>
                        Preciso de um grupo de amigos para ir amanhã á praia do
                        lido pelas 16:00, Alguém interessado?
                      </p>
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
                      <img src={Guy} alt='' className='homem' id='f1' />
                      <img src={Guy} alt='' className='homem' id='f2' />
                      <img src={Guy} alt='' className='homem' id='f3' />
                      <div
                        className='maisQuantos'
                        id='f4'
                        style={{
                          color: darkMode ? "#3a3a3b" : "black",
                          backgroundColor: darkMode && "lightgrey",
                        }}
                      >
                        +5
                      </div>
                    </div>
                    <span className='maximo'>9/20</span>
                  </div>
                  <div className='botaoM'>
                    <button className='juntar'>Juntar-se!</button>
                  </div>
                </div>
              </div>
              <div className='postProfile'>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <img
                    src={Guy}
                    alt=''
                    className='userPic'
                    style={{ width: "4vh" }}
                  />
                  <span className='username'>serraoafonso</span>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    1 min ago
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>Praia do lido amanhã</h3>
                    </div>
                    <div className='descricao'>
                      <p>
                        Preciso de um grupo de amigos para ir amanhã á praia do
                        lido pelas 16:00, Alguém interessado?
                      </p>
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
                      <img src={Guy} alt='' className='homem' id='f1' />
                      <img src={Guy} alt='' className='homem' id='f2' />
                      <img src={Guy} alt='' className='homem' id='f3' />
                      <div
                        className='maisQuantos'
                        id='f4'
                        style={{
                          color: darkMode ? "#3a3a3b" : "black",
                          backgroundColor: darkMode && "lightgrey",
                        }}
                      >
                        +5
                      </div>
                    </div>
                    <span className='maximo'>9/20</span>
                  </div>
                  <div className='botaoM'>
                    <button className='juntar'>Juntar-se!</button>
                  </div>
                </div>
              </div>
              <div className='postProfile'>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <img
                    src={Guy}
                    alt=''
                    className='userPic'
                    style={{ width: "4vh" }}
                  />
                  <span className='username'>serraoafonso</span>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    1 min ago
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>Praia do lido amanhã</h3>
                    </div>
                    <div className='descricao'>
                      <p>
                        Preciso de um grupo de amigos para ir amanhã á praia do
                        lido pelas 16:00, Alguém interessado?
                      </p>
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
                      <img src={Guy} alt='' className='homem' id='f1' />
                      <img src={Guy} alt='' className='homem' id='f2' />
                      <img src={Guy} alt='' className='homem' id='f3' />
                      <div
                        className='maisQuantos'
                        id='f4'
                        style={{
                          color: darkMode ? "#3a3a3b" : "black",
                          backgroundColor: darkMode && "lightgrey",
                        }}
                      >
                        +5
                      </div>
                    </div>
                    <span className='maximo'>9/20</span>
                  </div>
                  <div className='botaoM'>
                    <button className='juntar'>Juntar-se!</button>
                  </div>
                </div>
              </div>
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
                {ready ? (
                  "Submit changes"
                ) : (
                  <span className='carregando'></span>
                )}
              </button>
            </div>
          )}
        </div>
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
