import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Add from "../../assets/imgs/add.png";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MessengerWhite from "../../assets/imgs/messenger-white.png";
import Guy from "../../assets/imgs/guy.jpg";
import "./feed.css";
import { UserContext } from "../../context/userContext";
import X from "../../assets/imgs/x.png";
import XWhite from "../../assets/imgs/x-white.png";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto, user } = useContext(UserContext);
  const [descAberta, setDescAberta] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false)

  const [post, setPost] = useState({
    title: "",
    description: "",
    max: "",
    duration: "",
  });

  async function handleChange(e) {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(post);
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if(sucesso) setCreatePost(false);
    if(sessionExpired) navigate('/login')
  }

  function muda() {
    setChatAberto(true);
  }

  function calculaSegundos() {
    let duration = post.duration;
    let segundos;

    switch (duration) {
      case "2 hours":
        segundos = 2 * 60 * 60;
        break;
      case "8 hours":
        segundos = 8 * 60 * 60;
        break;
      case "1 day":
        segundos = 24 * 60 * 60;
        break;
      case "3 days":
        segundos = 3 * 24 * 60 * 60;
        break;
      case "1 week":
        segundos = 7 * 24 * 60 * 60;
        break;
      case "2 weeks":
        segundos = 14 * 24 * 60 * 60;
        break;
      case "1 month":
        segundos = 30 * 24 * 60 * 60; // 30 dias
        break;
      case "3 months":
        segundos = 3 * 30 * 24 * 60 * 60; //  90 dias
        break;
      default:
        segundos = 0; // Valor padrão caso não corresponda a nenhum dos casos
        break;
    }

    return segundos;
  }

  async function createMeeting() {
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
    try {
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
        setTextoaviso("Session expired");
          setAviso(true);;
          setReady(true);
      }else if (res.status != 200 ){
        setTextoaviso("Error");
          setAviso(true);;
          setReady(true);
      }
      else {
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
  }

  return (
    <div
      className='principalDiv'
      style={{ borderColor: darkMode ? "lightgray" : "black" }}
    >
      <div className='posts'>
        <div className='post'>
          <div
            className='parteCima'
            style={{ borderColor: darkMode ? "lightgray" : "black" }}
          >
            <img src={Guy} alt='' className='userPic' />
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
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
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
        <div className='post'>
          <div
            className='parteCima'
            style={{ borderColor: darkMode ? "lightgray" : "black" }}
          >
            <img src={Guy} alt='' className='userPic' />
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
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
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
        <div className='post'>
          <div
            className='parteCima'
            style={{ borderColor: darkMode ? "lightgray" : "black" }}
          >
            <img src={Guy} alt='' className='userPic' />
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
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
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
        <div className='post'>
          <div
            className='parteCima'
            style={{ borderColor: darkMode ? "lightgray" : "black" }}
          >
            <img src={Guy} alt='' className='userPic' />
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
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
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
        <div className='post'>
          <div
            className='parteCima'
            style={{ borderColor: darkMode ? "lightgray" : "black" }}
          >
            <img src={Guy} alt='' className='userPic' />
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
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
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
        style={{ display: createPost ? "block" : "none", backgroundColor: darkMode ? "#2b2b2b" : "#f2f2f2"}}
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
            style={{backgroundColor: darkMode && "#3c3c3c", color:  darkMode && "#f2f2f2"}}
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
            style={{backgroundColor: darkMode && "#3c3c3c", color:  darkMode && "#f2f2f2"}}
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
            style={{backgroundColor: darkMode && "#3c3c3c", color:  darkMode && "#f2f2f2"}}
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
            style={{backgroundColor: darkMode && "#3c3c3c", color:  darkMode && "#f2f2f2"}}
          >
            <option value='2 hours'>2 hours</option>
            <option value='8 hours'>8 hours</option>
            <option value='1 day'>1 day</option>
            <option value='3 days'>3 days</option>
            <option value='1 week'>1 week</option>
            <option value='2 week'>2 weeks</option>
            <option value='1 month'>1 month</option>
            <option value='3 month'>3 months</option>
          </select>
        </div>
        <button className='postMeeting' onMouseUp={createMeeting}>Post meeting</button>
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
