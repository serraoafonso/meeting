import React from "react";
import "./rightbar.css";
import Guy from "../../assets/imgs/guy.jpg";

export default function Rightbar() {
  return (
    <div>
      <div className='caixa'>
        <div className='pessoas'>
          <div className='divPessoa'>
            <img src={Guy} className='pessoa' />
          </div>
          <div className='divPessoa'>
            <img src={Guy} className='pessoa' />
          </div>
          <div className='divPessoa'>
            <img src={Guy} className='pessoa' />
          </div>
          <div className='divPessoa'>
            <img src={Guy} className='pessoa' />
          </div>
          <div className='divPessoa'>
            <img src={Guy} className='pessoa' />
          </div>
          <div className='divPessoa'>
            <img src={Guy} className='pessoa' />
          </div>
        </div>
        <div className='conversa'>
          <div className='nome'></div>
          <div className='chat'></div>
          <div className='enviar'></div>
        </div>
      </div>
    </div>
  );
}
