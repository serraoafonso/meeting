import React, { useContext, useState } from "react";
import Arrow from "../../assets/imgs/left.png";
import ArrowWhite from "../../assets/imgs/left-white.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import Guy from "../../assets/imgs/guy.jpg";
import Check from "../../assets/imgs/check.png";
import CheckPurple from "../../assets/imgs/check-purple.png";
import "./profile.css";

export default function Profile() {
  const { darkMode } = useContext(DarkModeContext);
  const [meuProfile, setMeuProfile] = useState(true);
  const [menu, setMenu] = useState(true);
  return (
    <div className='profileDivA'>
      <div className='arrowLeft'>
        <Link to='/'>
          <img src={darkMode ? ArrowWhite : Arrow} alt='' />
        </Link>
        <h3 className='nomeProfile'>Afonso Serrão</h3>
        <span className='usernameSpan'>@serraoafonso</span>
        <div className='parteCimaProfile'>
          <div className='imagemPerfil'>
            <img src={Guy} alt='' />
          </div>
          <button className='mudaFoto'>Change profile picture</button>
          <div className='amigos'>
            <span className='numberOfFriends'>20 friends</span>
            <div
              className='amizade'
              style={{
                backgroundColor: !darkMode ? "#f2f2f2" : "#5a5cde",
                border: !darkMode && "1px solid lightgray",
              }}
            >
              <button style={{ color: darkMode ? "#f2f2f2" : "black" }}>
                Amigo
              </button>
              <img src={!darkMode ? CheckPurple : Check} alt='' />
            </div>
          </div>
          <div className='detalhes'>
            <span>
              Lorem ipsum dolor sit amet. Et sint iste quo perferendis expedita
              eum voluptatum omnis ut quasi quae et delectus nobis quo fuga
              voluptatibus! Ex quia dolor est pariatur veritatis est consequatur
              illum et maxime officia ut magni obcaecati. Et exercitationem
              necessitatibus sit aliquid iste est perferendis quia et reiciendis
              aperiam. 33 obcaecati voluptatem rem obcaecati ipsam id
              accusantium dicta est saepe quibusdam sed maxime quae At omnis
              amet in enim mollitia!
            </span>
          </div>
        </div>
        <div className='baixoProfile'>
          <div className='menuProfile'>
            {meuProfile ? (
              <>
                <span
                  className='spanPosts'
                  style={{
                    textDecoration: menu && "underline",
                    color: menu && "#5a5cde",
                  }}
                  onClick={() => setMenu(true)}
                >
                  Posts
                </span>
                <span
                  className='editProfile'
                  style={{
                    textDecoration: !menu && "underline",
                    color: !menu && "#5a5cde",
                  }}
                  onClick={() => setMenu(false)}
                >
                  Edit Profile
                </span>
              </>
            ) : (
              <span className='spanPosts'>Posts</span>
            )}
          </div>
          {menu ? (
            <div className='ultimosPosts'>
              <div className='post'>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <img
                    src={Guy}
                    alt=''
                    className='userPic'
                    style={{ width: "4vh" }}
                  />
                  <span className='username'>serraoafonso</span>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    1 min ago
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>Praia do lido amanhã</h3>
                    </div>
                    <div className='descricao'>
                      <p>
                        Preciso de um grupo de amigos para ir amanhã á praia do
                        lido pelas 16:00, Alguém interessado?
                      </p>
                    </div>
                  </div>
                  <div
                    className='googleMaps'
                    style={{ borderColor: darkMode ? "lightgray" : "black" }}
                  ></div>
                </div>
                <div
                  className='parteBaixo'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='pessoasBaixo'>
                    <div className='imagensPessoas'>
                      <img src={Guy} alt='' className='homem' id='f1' />
                      <img src={Guy} alt='' className='homem' id='f2' />
                      <img src={Guy} alt='' className='homem' id='f3' />
                      <div
                        className='maisQuantos'
                        id='f4'
                        style={{
                          color: darkMode ? "#3a3a3b" : "black",
                          backgroundColor: darkMode && "lightgrey",
                        }}
                      >
                        +5
                      </div>
                    </div>
                    <span className='maximo'>9/20</span>
                  </div>
                  <div className='botaoM'>
                    <button className='juntar'>Juntar-se!</button>
                  </div>
                </div>
              </div>
              <div className='post'>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <img
                    src={Guy}
                    alt=''
                    className='userPic'
                    style={{ width: "4vh" }}
                  />
                  <span className='username'>serraoafonso</span>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    1 min ago
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>Praia do lido amanhã</h3>
                    </div>
                    <div className='descricao'>
                      <p>
                        Preciso de um grupo de amigos para ir amanhã á praia do
                        lido pelas 16:00, Alguém interessado?
                      </p>
                    </div>
                  </div>
                  <div
                    className='googleMaps'
                    style={{ borderColor: darkMode ? "lightgray" : "black" }}
                  ></div>
                </div>
                <div
                  className='parteBaixo'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='pessoasBaixo'>
                    <div className='imagensPessoas'>
                      <img src={Guy} alt='' className='homem' id='f1' />
                      <img src={Guy} alt='' className='homem' id='f2' />
                      <img src={Guy} alt='' className='homem' id='f3' />
                      <div
                        className='maisQuantos'
                        id='f4'
                        style={{
                          color: darkMode ? "#3a3a3b" : "black",
                          backgroundColor: darkMode && "lightgrey",
                        }}
                      >
                        +5
                      </div>
                    </div>
                    <span className='maximo'>9/20</span>
                  </div>
                  <div className='botaoM'>
                    <button className='juntar'>Juntar-se!</button>
                  </div>
                </div>
              </div>
              <div className='post'>
                <div
                  className='parteCima'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <img
                    src={Guy}
                    alt=''
                    className='userPic'
                    style={{ width: "4vh" }}
                  />
                  <span className='username'>serraoafonso</span>
                  <span
                    className='tempo'
                    tyle={{ color: darkMode ? "lightgray" : "gray" }}
                  >
                    1 min ago
                  </span>
                </div>
                <div
                  className='parteMeio'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='ladoEsquerdo'>
                    <div className='titulo'>
                      <h3>Praia do lido amanhã</h3>
                    </div>
                    <div className='descricao'>
                      <p>
                        Preciso de um grupo de amigos para ir amanhã á praia do
                        lido pelas 16:00, Alguém interessado?
                      </p>
                    </div>
                  </div>
                  <div
                    className='googleMaps'
                    style={{ borderColor: darkMode ? "lightgray" : "black" }}
                  ></div>
                </div>
                <div
                  className='parteBaixo'
                  style={{ borderColor: darkMode ? "lightgray" : "black" }}
                >
                  <div className='pessoasBaixo'>
                    <div className='imagensPessoas'>
                      <img src={Guy} alt='' className='homem' id='f1' />
                      <img src={Guy} alt='' className='homem' id='f2' />
                      <img src={Guy} alt='' className='homem' id='f3' />
                      <div
                        className='maisQuantos'
                        id='f4'
                        style={{
                          color: darkMode ? "#3a3a3b" : "black",
                          backgroundColor: darkMode && "lightgrey",
                        }}
                      >
                        +5
                      </div>
                    </div>
                    <span className='maximo'>9/20</span>
                  </div>
                  <div className='botaoM'>
                    <button className='juntar'>Juntar-se!</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='editProfile'>
              <input
                type='text'
                placeholder='Name'
                style={{ backgroundColor: darkMode && "#222" , borderColor: darkMode && '#5a5cde'}}
              />
              <input
                type='text'
                placeholder='Username'
                style={{ backgroundColor: darkMode && "#222", borderColor: darkMode && '#5a5cde'}}
              />
              <input
                type='text'
                placeholder='Password'
                style={{ backgroundColor: darkMode && "#222" , borderColor: darkMode && '#5a5cde'}}
              />
              <input
                type='email'
                placeholder='Email'
                style={{ backgroundColor: darkMode && "#222" , borderColor: darkMode && '#5a5cde'}}
              />
              <input
                type='text'
                placeholder='Name'
                style={{ backgroundColor: darkMode && "#222", borderColor: darkMode && '#5a5cde' }}
              />
              <button className='submitChanges'>Submit Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
