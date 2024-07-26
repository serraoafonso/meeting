import React, {useEffect, useState, useContext} from 'react'
import './notifications.css'
import X from "../../assets/imgs/x.png"
import Guy from "../../assets/imgs/guy.jpg"
import { UserContext } from '../../context/userContext';


function Notifications() {

  const {user} = useContext(UserContext)
  
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false)
  const [data, setData] = useState([])
  
  async function acceptFriend(){
    setAccepted(true) 
  }

  useEffect(()=>{
    getRequests()
  }, []);
  
  async function getRequests(){
    try{
      const res = await fetch(`http://localhost:3000/api/friends/getRequests/${user.id}`, {
        credentials: 'include'
      });
      if(res.status != 200){
        console.log(err)
      }else{
        const dt = await res.json();
        setData(dt)
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='notifications'>
      <div className="notContainer">
        {
          data.map((request)=>{
            return(
              <div className="friendDiv">
              <img src={request.user.profilePic_users} className='profileAmigo'/>
              <span>{request.user.username_users} has sent you a friend request</span>
              <button className='acceptBtn' onMouseUp={acceptFriend} style={{backgroundColor: accepted && 'white', color: accepted && 'darkgray'}}>{loading ? <span className='carregando'></span> : accepted ? 'Friends' : 'Accept'}</button>
              <img src={X} alt="" className='xPequeno'/>
          </div>
            )
          })
        }
      </div> 
    </div>
  )
}

export default Notifications