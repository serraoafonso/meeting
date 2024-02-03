import React, {useContext} from "react";
import "./home.css";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {Outlet} from 'react-router-dom'
import { UserContext } from "../../context/userContext";

export default function Home() {

  const {chatAberto, setChatAberto} = useContext(UserContext);

  return (
    <div className='maindiv'>
      <div className='esquerda'>
          <Leftbar />
      </div>
      <div className='feed'>
      <Outlet/>
      </div>
      <div className='direita' style={{display: !chatAberto && 'none'}}>
        <Rightbar />
      </div>
    </div>
  );
}
