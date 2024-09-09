import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Guy from "../../assets/imgs/guy.jpg";
import X from "../../assets/imgs/x.png";
import XWhite from "../../assets/imgs/x-white.png";
import Left from "../../assets/imgs/left.png";
import LeftWhite from "../../assets/imgs/left-white.png";
import { DarkModeContext } from "../../context/darkModeContext";
import { UserContext } from "../../context/userContext";
import User from "../../assets/imgs/user.png";
import dotenv from 'dotenv'
dotenv.config()

export default function Rightbar() {
  const { darkMode } = useContext(DarkModeContext);
  const { setChatAberto, user, userNowTalking } = useContext(UserContext);
  const [talked, setTalked] = useState([]);
  const [userTaling, setUserTalking] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [veioProfile, setVeioProfile] = useState(false)

  useEffect(() => {
    getTalked();
  }, []);

  useEffect(() => {
    console.log(userNowTalking)
    if (userNowTalking != "") {
      setUserTalking({
        idUser: userNowTalking.id,
        profilePic_user: userNowTalking.profilePic,
        name_user: userNowTalking.name,
      })
      getMessages({
        idUser: userNowTalking.id,
        profilePic_user: userNowTalking.profilePic,
        name_user: userNowTalking.name,
      })
      setVeioProfile(true)
    }
  }, []);

  function muda() {
    setChatAberto(false);
  }

  async function getTalked() {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/message/getTalked/${user.id}`,
        {
          credentials: "include",
        }
      );
      if (res.status != 200) {
        console.log(res);
      } else {
        const data = await res.json();
        setTalked(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getMessages(talkingUser) {
    setMessages([])
    setUserTalking(talkingUser);
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/message/getMessages/${user.id}`,
        {
          method: "post",
          credentials: "include",
          body: JSON.stringify({ idReceive: talkingUser.idUser }),
          headers: { "Content-type": "application/json" },
        }
      );
      if (res.status != 200) {
        console.log(res);
      } else {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function sendMessage() {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/message/create/${user.id}`,
        {
          method: "post",
          credentials: "include",
          body: JSON.stringify({
            idReceive: userTaling.idUser,
            message: input,
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      if (res.status != 200) {
        console.log(res);
      } else {
        getMessages(userTaling);
        setInput("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div
        className='caixa'
        style={{ borderColor: darkMode ? "whitesmoke" : "#4f4f4f" }}
      >
        <div className='pessoas'>
          {
            veioProfile && <div
            className='divPessoa'
            onMouseUp={() => getMessages(userTaling)}
            key={userTaling.idUser}
          >
            <img
              src={
                userNowTalking.profilePic === ""//fiz com o userNowTalking para não mudar a foto de perfil ao clicar noutra conversa
                  ? User
                  : userNowTalking.profilePic
              }
              className='pessoa'
            />
          </div>
          }
        {talked.length > 0 &&
  talked?.map((pessoa) => {
    return pessoa.idUser != user.id ? (
      <div
        className='divPessoa'
        onMouseUp={() => getMessages(pessoa)}
        key={pessoa.idUser}
      >
        <img
          src={
            pessoa.profilePic_user === ""
              ? User
              : pessoa.profilePic_user
          }
          className='pessoa'
        />
      </div>
    ) : null; // Garante que não retorne nada para o próprio usuário
  })}

        </div>
        <div
          className='conversa'
          style={{
            backgroundColor: !darkMode && "#f2f2f2",
            color: !darkMode && "#222",
          }}
        >
          <div className='nome'>
            <div className='imgIcon'>
              <img
                src={darkMode ? LeftWhite : Left}
                alt=''
                className='botoes'
                id='botaoEsquerdo'
              />
            </div>
            <div className='nomePessoa'>
              <span id='spanNome'>{userTaling.name_user}</span>
            </div>
            <div className='fechar' id='botaoDireito'>
              <img
                src={darkMode ? XWhite : X}
                alt=''
                className='botoesGrandes'
                onClick={muda}
              />
            </div>
          </div>
          <div className='chat'>
            {userTaling == ""
              ? "Start a new conversation"
              : messages.length > 0 && messages?.map((mensagem) => {
                  return (
                    <>
                      {mensagem.idReceive_messages == userTaling.idUser ? (
                        <div className='divmensagemMinha' key={mensagem.idMessage_messages}>
                          <div className='mensagemMinha'>
                            {mensagem.message_messages}
                          </div>
                        </div>
                      ) : (
                        <div className='divmensagemDele' key={mensagem.idMessage_messages}>
                          <div className='mensagemDoutro'>
                          {mensagem.message_messages}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
          </div>
          <div className='enviar'>
            <div className='caixaInput'>
              <input
                type='text'
                style={{
                  backgroundColor: !darkMode && "white",
                  color: !darkMode && "#222",
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                style={{
                  borderColor: !darkMode && "#5a5cde",
                  color: !darkMode && "#5a5cde",
                  backgroundColor: !darkMode && "#f2f2f2",
                }}
                onMouseUp={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
