import React from "react";
import "./home.css";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {Outlet} from 'react-router-dom'

export default function Home() {
  return (
    <div className='maindiv'>
      <div className='esquerda'>
        <Leftbar />
      </div>
      <div className='feed'>
      <Outlet/>
      </div>
      <div className='direita'>
        <Rightbar />
      </div>
    </div>
  );
}
