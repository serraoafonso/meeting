import React from "react";
import "./navbar.css";
import Guy from '../../assets/imgs/guy.jpg'


export default function Navbar() {
  return (
    <div className='navbar2'>
      <div className='logo'>
        <h1 className='titulo'>Meeting</h1>
      </div>
      <div className='rest'>
        <span className='upgrade'>Upgrade</span>
        <button className="botao">Log Out</button>
        <img src={Guy} className="profilePic"/>
      </div>
    </div>
  );
}
