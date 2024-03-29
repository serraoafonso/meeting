import React from "react";
import "./navbar.css";
import Guy from '../../assets/imgs/guy.jpg'
import DarkModeImg from '../..//assets/imgs/night-mode.png'
import LightMode from '../../assets/imgs/sun.png'
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext"; 
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Default from '../../assets/imgs/user.png'

export default function Navbar() {
  
  const { darkMode, toggle } = useContext(DarkModeContext);
  const {user, changeUser} = useContext(UserContext)

  async function logOut(){
    changeUser('')
  }

  return (
    <div className='navbar2' style={{backgroundColor: darkMode?  "#222" : "#f2f2f2", color: darkMode? "#f2f2f2" : "#222"}}>
      <div className='logo'>
        <h1 className='titulo'><span className="l1">m</span><span className="l2">e</span><span className="l3">e</span><span className="l4">t</span><span className="l5">i</span><span className="l6">n</span><span className="l7">g</span></h1>
      </div>
      <div className='rest'>
        <img src={darkMode ? LightMode : DarkModeImg} className="darkMode" onClick={()=>toggle()}/>
        <Link to="/upgrade" className="upgradeSpan"><span className='upgradeSpan' style={{ color: darkMode ? "#f2f2f2" : "black"}}>Upgrade</span></Link>
        <input className="botao" style={{backgroundColor: darkMode?'#222': '#f2f2f2', color: darkMode ? '#f2f2f2':"#222", margin: darkMode ? '#f2f2f2':"#222" }} value='Log out' type="button" onMouseUp={logOut}/>
        <Link to='/profile/teste'><img src={user?.profilePic == '' ? Default : user?.profilePic} className="profilePic"/></Link>
      </div>
    </div>
  );
}
