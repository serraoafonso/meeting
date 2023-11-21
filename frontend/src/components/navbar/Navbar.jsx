import React from "react";
import "./navbar.css";
import Guy from '../../assets/imgs/guy.jpg'
import DarkModeImg from '../..//assets/imgs/night-mode.png'
import LightMode from '../../assets/imgs/sun.png'
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext"; 

export default function Navbar() {
  
  const { darkMode, toggle } = useContext(DarkModeContext);

  return (
    <div className='navbar2' style={{backgroundColor: darkMode?  "#222" : "#f2f2f2", color: darkMode? "#f2f2f2" : "#222"}}>
      <div className='logo'>
        <h1 className='titulo'>Meeting</h1>
      </div>
      <div className='rest'>
        <img src={darkMode ? LightMode : DarkModeImg} className="darkMode" onClick={()=>toggle()}/>
        <span className='upgrade'>Upgrade</span>
        <input className="botao" style={{backgroundColor: darkMode?'#222': '#f2f2f2', color: darkMode ? '#f2f2f2':"#222", margin: darkMode ? '#f2f2f2':"#222" }} value='Log out' type="button"/>
        <img src={Guy} className="profilePic"/>
      </div>
    </div>
  );
}
