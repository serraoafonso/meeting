import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Add from "../../assets/imgs/add.png";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MessengerWhite from "../../assets/imgs/messenger-white.png";
import Guy from "../../assets/imgs/guy.jpg";
import "./feed.css";
import { UserContext } from "../../context/userContext";
import X from "../../assets/imgs/x.png"
import XWhite from "../../assets/imgs/x-white.png"

export default function Feed() {
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto } = useContext(UserContext);
  const [descAberta, setDescAberta] = useState(false);
  const [createPost, setCreatePost] = useState(false)
  
  const [post, setPost] = useState({
    title: "",
    description: "",
    max: "",
    duration: ""
  })

  async function handleChange(e){
    setPost((prev) => ({...prev, [e.target.name]: e.target.value}));
    console.log(post)
  }

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
        <img src={AddWhite} alt='' className='abs' id='add' onClick={()=>setCreatePost(true)}/>
        {!chatAberto && (
          <img src={Messenger} alt='' className='abs' id='msg' onClick={muda} />
        )}
      </div>
      <div className="createPost" style={{display: createPost ? "block" : "none"}}>
        <img src={darkMode ? XWhite : X} alt="" className="x-post" onMouseUp={()=>setCreatePost(false)}/>
        <div className="tituloDiv">
          <label>Title:</label>
          <input type="text" name="title" value={post.title} onChange={handleChange} placeholder="Your title"/>
        </div>
        <div className="descDiv">
          <label>Description: </label>
        <textarea type="text" name="description" value={post.description} onChange={handleChange} rows="2" placeholder="Your description"/>
        </div>
        <div className="maxPeople">
          <label>Max people: </label>
        <input type="number" name="max" value={post.max} onChange={handleChange} min="0" step='1' placeholder="Maximum"/>
        </div>
        <div className="selectDuration">
        <label>Duration: </label>
        <select name="duration" id="duration" className="duration" value={post.duration} onChange={handleChange}>
          <option value="2 hours">2 hours</option>
          <option value="8 hours">8 hours</option>
          <option value="1 day">1 day</option>
          <option value="3 days">3 days</option>
          <option value="1 week">1 week</option>
          <option value="2 week">2 weeks</option>
          <option value="1 month">1 month</option>
          <option value="3 month">3 months</option>
        </select>
        </div>
        <button className="postMeeting">Post meeting</button>
      </div>
    </div>
  );
}
