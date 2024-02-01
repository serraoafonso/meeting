import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Add from "../../assets/imgs/add.png";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MessengerWhite from "../../assets/imgs/messenger-white.png";
import Guy from "../../assets/imgs/guy.jpg";
import "./feed.css";
import { UserContext } from "../../context/userContext";

export default function Feed() {
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto } = useContext(UserContext);
  const [descAberta, setDescAberta] = useState(false);

  function muda() {
    setChatAberto(true);
  }

  return (
    <div className="principalDiv" style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
      <div className='posts'>

        <div className='post'>
          <div className='parteCima' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <img src={Guy} alt='' className='userPic' />
            <span className='username'>serraoafonso</span>
            <span className='tempo' tyle={{color: darkMode ? 'lightgray' : 'gray'}}>1 min ago</span>
          </div>
          <div className='parteMeio' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='ladoEsquerdo'>
              <div className='titulo'>
                <h3>Praia do lido amanhã</h3>
              </div>
              <div className='descricao'>
                <p>
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
                </p>
              </div>
            </div>
            <div className='googleMaps' style={{borderColor: darkMode ? 'lightgray' : 'black'}}></div>
          </div>
          <div className='parteBaixo' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='pessoasBaixo'>
              <div className='imagensPessoas'>
                <img src={Guy} alt='' className='homem' id="f1"/>
                <img src={Guy} alt='' className='homem' id="f2"/>
                <img src={Guy} alt='' className='homem' id="f3"/>
                <div className='maisQuantos' id="f4" style={{color: darkMode ? '#3a3a3b' : 'black', backgroundColor: darkMode && 'lightgrey'}}>+5</div>
              </div>
              <span className='maximo'>9/20</span>
            </div>
            <div className='botaoM'>
              <button className='juntar'>Juntar-se!</button>
            </div>
          </div>
        </div>
        <div className='post'>
          <div className='parteCima' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <img src={Guy} alt='' className='userPic' />
            <span className='username'>serraoafonso</span>
            <span className='tempo' tyle={{color: darkMode ? 'lightgray' : 'gray'}}>1 min ago</span>
          </div>
          <div className='parteMeio' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='ladoEsquerdo'>
              <div className='titulo'>
                <h3>Praia do lido amanhã</h3>
              </div>
              <div className='descricao'>
                <p>
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
                </p>
              </div>
            </div>
            <div className='googleMaps' style={{borderColor: darkMode ? 'lightgray' : 'black'}}></div>
          </div>
          <div className='parteBaixo' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='pessoasBaixo'>
              <div className='imagensPessoas'>
                <img src={Guy} alt='' className='homem' id="f1"/>
                <img src={Guy} alt='' className='homem' id="f2"/>
                <img src={Guy} alt='' className='homem' id="f3"/>
                <div className='maisQuantos' id="f4" style={{color: darkMode ? '#3a3a3b' : 'black', backgroundColor: darkMode && 'lightgrey'}}>+5</div>
              </div>
              <span className='maximo'>9/20</span>
            </div>
            <div className='botaoM'>
              <button className='juntar'>Juntar-se!</button>
            </div>
          </div>
        </div>
        <div className='post'>
          <div className='parteCima' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <img src={Guy} alt='' className='userPic' />
            <span className='username'>serraoafonso</span>
            <span className='tempo' tyle={{color: darkMode ? 'lightgray' : 'gray'}}>1 min ago</span>
          </div>
          <div className='parteMeio' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='ladoEsquerdo'>
              <div className='titulo'>
                <h3>Praia do lido amanhã</h3>
              </div>
              <div className='descricao'>
                <p>
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
                </p>
              </div>
            </div>
            <div className='googleMaps' style={{borderColor: darkMode ? 'lightgray' : 'black'}}></div>
          </div>
          <div className='parteBaixo' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='pessoasBaixo'>
              <div className='imagensPessoas'>
                <img src={Guy} alt='' className='homem' id="f1"/>
                <img src={Guy} alt='' className='homem' id="f2"/>
                <img src={Guy} alt='' className='homem' id="f3"/>
                <div className='maisQuantos' id="f4" style={{color: darkMode ? '#3a3a3b' : 'black', backgroundColor: darkMode && 'lightgrey'}}>+5</div>
              </div>
              <span className='maximo'>9/20</span>
            </div>
            <div className='botaoM'>
              <button className='juntar'>Juntar-se!</button>
            </div>
          </div>
        </div>
        <div className='post'>
          <div className='parteCima' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <img src={Guy} alt='' className='userPic' />
            <span className='username'>serraoafonso</span>
            <span className='tempo' tyle={{color: darkMode ? 'lightgray' : 'gray'}}>1 min ago</span>
          </div>
          <div className='parteMeio' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='ladoEsquerdo'>
              <div className='titulo'>
                <h3>Praia do lido amanhã</h3>
              </div>
              <div className='descricao'>
                <p>
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
                </p>
              </div>
            </div>
            <div className='googleMaps' style={{borderColor: darkMode ? 'lightgray' : 'black'}}></div>
          </div>
          <div className='parteBaixo' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='pessoasBaixo'>
              <div className='imagensPessoas'>
                <img src={Guy} alt='' className='homem' id="f1"/>
                <img src={Guy} alt='' className='homem' id="f2"/>
                <img src={Guy} alt='' className='homem' id="f3"/>
                <div className='maisQuantos' id="f4" style={{color: darkMode ? '#3a3a3b' : 'black', backgroundColor: darkMode && 'lightgrey'}}>+5</div>
              </div>
              <span className='maximo'>9/20</span>
            </div>
            <div className='botaoM'>
              <button className='juntar'>Juntar-se!</button>
            </div>
          </div>
        </div>
        <div className='post'>
          <div className='parteCima' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <img src={Guy} alt='' className='userPic' />
            <span className='username'>serraoafonso</span>
            <span className='tempo' tyle={{color: darkMode ? 'lightgray' : 'gray'}}>1 min ago</span>
          </div>
          <div className='parteMeio' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='ladoEsquerdo'>
              <div className='titulo'>
                <h3>Praia do lido amanhã</h3>
              </div>
              <div className='descricao'>
                <p>
                  Preciso de um grupo de amigos para ir amanhã á praia do lido
                  pelas 16:00, Alguém interessado?
                </p>
              </div>
            </div>
            <div className='googleMaps' style={{borderColor: darkMode ? 'lightgray' : 'black'}}></div>
          </div>
          <div className='parteBaixo' style={{borderColor: darkMode ? 'lightgray' : 'black'}}>
            <div className='pessoasBaixo'>
              <div className='imagensPessoas'>
                <img src={Guy} alt='' className='homem' id="f1"/>
                <img src={Guy} alt='' className='homem' id="f2"/>
                <img src={Guy} alt='' className='homem' id="f3"/>
                <div className='maisQuantos' id="f4" style={{color: darkMode ? '#3a3a3b' : 'black', backgroundColor: darkMode && 'lightgrey'}}>+5</div>
              </div>
              <span className='maximo'>9/20</span>
            </div>
            <div className='botaoM'>
              <button className='juntar'>Juntar-se!</button>
            </div>
          </div>
        </div>

      </div>
      <div className='divAbs'>
        <img src={AddWhite} alt='' className='abs' id='add' />
        {!chatAberto && (
          <img src={Messenger} alt='' className='abs' id='msg' onClick={muda} />
        )}
      </div>
    </div>
  );
}
