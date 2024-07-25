import React, {useEffect} from 'react'
import './notifications.css'
import X from "../../assets/imgs/x.png"
import Guy from "../../assets/imgs/guy.jpg"

function Notifications() {
  return (
    <div className='notifications'>
      <div className="notContainer">
        <div className="friendDiv">
            <img src={Guy} className='profileAmigo'/>
            <span>This user has sent you a friend request</span>
            <button className='acceptBtn'>Accept</button>
            <img src={X} alt="" className='xPequeno'/>
        </div>
      </div> 
    </div>
  )
}

export default Notifications