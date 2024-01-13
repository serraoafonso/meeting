import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Add from "../../assets/imgs/add.png";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MessengerWhite from "../../assets/imgs/messenger-white.png";
import './feed.css'
import { UserContext } from "../../context/userContext";

export default function Feed() {
  const { darkMode } = useContext(DarkModeContext);
  const {chatAberto, setChatAberto} = useContext(UserContext);

  function muda(){
    setChatAberto(true)
  }

  return (
    <div>
      <div className='divAbs'>
        <img src={AddWhite} alt='' className='abs' id='add' />
        {!chatAberto && (
          <img
            src={Messenger}
            alt=''
            className='abs'
            id='msg'
            onClick={muda}
          />
        )}
      </div>
    </div>
  );
}
