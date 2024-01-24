import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Add from "../../assets/imgs/add.png";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MessengerWhite from "../../assets/imgs/messenger-white.png";
import Guy from "../../assets/imgs/guy.jpg";
import "./feed.css";
import { UserContext } from "../../context/userContext";

export default function Feed() {
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto } = useContext(UserContext);

  function muda() {
    setChatAberto(true);
  }

  return (
    <div>
      <div className='posts'>
        <div className='post'>
          <div className='parteCima'>
            <span className='username'>serraoafonso</span>
            <span className='tempo'>1 min ago</span>
          </div>
          <div className='parteMeio'>
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

            <div className='googleMaps'></div>
          </div>
          <div className='parteBaixo'>
            <div className='pessoasBaixo'>
              <img src={Guy} alt='' className='homem' />
              <img src={Guy} alt='' className='homem' />
              <img src={Guy} alt='' className='homem' />
              <div className='maisQuantos'>+5</div>
              <span className="maximo">9/20</span>
            </div>
            <div className="botaoM">
            <button className="juntar">Juntar-se!</button>
            </div>
            
          </div>
        </div>
      </div>
      <div className='divAbs'>
        <img src={AddWhite} alt='' className='abs' id='add' />
        {!chatAberto && (
          <img src={Messenger} alt='' className='abs' id='msg' onClick={muda} />
        )}
      </div>
    </div>
  );
}
