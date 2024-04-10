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
        <Link to="/" style={{textDecoration: 'none'}}><h1 className='titulo'><span className="l1">m</span><span className="l2">e</span><span className="l3">e</span><span className="l4">t</span><span className="l5">i</span><span className="l6">n</span><span className="l7">g</span></h1></Link>
      </div>
      <div className='rest'>
        <img src={darkMode ? LightMode : DarkModeImg} className="darkMode" onClick={()=>toggle()}/>
        <Link to="/upgrade" className="upgradeSpan"><span className='upgradeSpan' style={{ color: darkMode ? "#f2f2f2" : "black"}}>Upgrade</span></Link>

        {/*<input className="botao" style={{backgroundColor: darkMode?'#222': '#f2f2f2', color: darkMode ? '#f2f2f2':"#222", margin: darkMode ? '#f2f2f2':"#222" }} value='Log out' type="button" onMouseUp={logOut}/>*/}
        <button class="Btn" onMouseUp={logOut}>
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>

        <Link to='/profile/teste'><img src={user?.profilePic == '' ? Default : user?.profilePic} className="profilePic"/></Link>
      </div>
    </div>
  );
}
