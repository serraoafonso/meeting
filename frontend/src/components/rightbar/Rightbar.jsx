import React, {useContext} from "react";
import "./rightbar.css";
import Guy from "../../assets/imgs/guy.jpg";
import X from '../../assets/imgs/x.png';
import XWhite from '../../assets/imgs/x-white.png';
import Left from '../../assets/imgs/left.png';
import LeftWhite from '../../assets/imgs/left-white.png';
import { DarkModeContext } from "../../context/darkModeContext";
import { UserContext } from "../../context/userContext";


export default function Rightbar() {

  const { darkMode, toggle } = useContext(DarkModeContext);
  const {setChatAberto}  = useContext(UserContext);

  function muda(){
    setChatAberto(false)
  }

  return (
    <div>
      <div className='caixa' style={{borderColor: darkMode ? 'whitesmoke' : '#4f4f4f'}}>
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
        <div className='conversa' style={{backgroundColor: !darkMode && "#f2f2f2", color: !darkMode && "#222"}}>
          <div className='nome'>
            <div className="imgIcon">
              <img src={darkMode ? LeftWhite : Left} alt="" className="botoes" id="botaoEsquerdo"/>         
            </div>
            <div className="nomePessoa">
              <span id="spanNome">serrao</span>
            </div>
            <div className="fechar" id="botaoDireito">
              <img src={darkMode ? XWhite : X} alt=""  className="botoesGrandes" onClick={muda}/>
            </div>
          </div>
          <div className='chat'>
            <div className="divmensagemMinha">
              <div className="mensagemMinha">
                Olha uma mensagem minha
              </div>
            </div>
            <div className="divmensagemDele">
              <div className="mensagemDoutro">
                Olha a mensagem dele
              </div>
            </div>
          </div>
          <div className='enviar'>
            <div className="caixaInput" >
              <input type="text" style={{backgroundColor: !darkMode && "white", color: !darkMode && "#222"}}/>
              <button style={{borderColor: !darkMode && "#5a5cde", color: !darkMode && "#5a5cde",backgroundColor: !darkMode && "#f2f2f2"}}>
                Send
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
