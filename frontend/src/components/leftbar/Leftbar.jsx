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
      <div className='item'>
        <img src={darkMode ? HomeWhite : Home} className="icon"/> Home
      </div>
      <div className='item'>
        <img src={darkMode ? GroupWhite : Group} className="icon"/> Friends
      </div>
      <div className='item'>
        <img src={darkMode ? NotificationWhite : Notification} className="icon"/> Notifications
      </div>
    </div>
  );
}
