import React, { useContext } from "react";
import Home from "../../assets/imgs/home.png";
import HomeWhite from "../../assets/imgs/home-white.png";
import Group from "../../assets/imgs/group.png";
import GroupWhite from "../../assets/imgs/group-white.png";
import Notification from "../../assets/imgs/notification.png";
import NotificationWhite from "../../assets/imgs/notification-white.png";
import { DarkModeContext } from "../../context/darkModeContext";
import './leftbar.css'

export default function Leftbar() {

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div>
      <div className='item' title="Home">
        <img src={darkMode ? HomeWhite : Home} className="icon"/> <span className="descricao">Home</span>
      </div>
      <div className='item' title="Friends">
        <img src={darkMode ? GroupWhite : Group} className="icon"/> <span className="descricao">Friends</span>
      </div>
      <div className='item' title="Notifications">
        <img src={darkMode ? NotificationWhite : Notification} className="icon"/> <span className="descricao">Notifications</span>
      </div>
    </div>
  );
}
