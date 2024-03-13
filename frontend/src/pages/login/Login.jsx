import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Logo1 from '../../assets/imgs/logo/logo1.png'
import Logo2 from '../../assets/imgs/logo/logo2.png'
import { UserContext } from "../../context/userContext";

export default function Login() {

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);
  const [dataGoogle, setDataGoogle] = useState("");
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [inputs, setInputs] = useState({
    primeiro: "",
    password: "",
  });

  useEffect(() => {
    //console.log("dataGoogle atualizado:", dataGoogle);
    if (dataGoogle !== "") {
      login();
    }
  }, [dataGoogle]);

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sucesso) navigate("/");
    setSucesso(false);
  }

  async function login() {
    if (dataGoogle != "") {
      const { name, picture, email } = dataGoogle;
      const username = `user-${Date.now()}`;
      const data = {
        name,
        email,
        username,
        profilePic: picture,
      };
      try {
        setReady(false);
        const res = await fetch("http://localhost:3000/api/user/enterGoogle", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        });
        if (res.status == 404) {
          console.log(res);
          setTextoaviso("Error");
          setAviso(true);
          setDataGoogle("");
          setReady(true);
        } else {
          const responseData = await res.json();
          const { email, name, picture } = responseData;
          changeUser({
            email,
            name,
            username,
            profilePic: picture,
          });
          setDataGoogle("");
          setTextoaviso("Entered with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
        }
      } catch (err) {
        console.log(err);
        setDataGoogle("");
        setTextoaviso("Email already registered");
        setAviso(true);
        setReady(true);
      }
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/user/login", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ...inputs }),
          credentials: "include",
        });
        if (res.status == 404) {
          console.log(res);
          setTextoaviso("Error in login in, try again");
          setAviso(true);
          setDataGoogle("");
          setReady(true);
        } else {
          const responseData = await res.json();
          const { email, name, profilePic, username } = responseData;
          changeUser({
            email,
            name,
            username,
            profilePic,
          });
          setTextoaviso("Loged in with success");
          setSucesso(true);
          setAviso(true);
          setReady(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error in login in, try again");
        setAviso(true);
        setReady(true);
      }
    }
  }

  return (
    <div className='login'>
      <div className='box'>
        <div className='left'>
          <h2>Good to see you again!</h2>
          <div className='r'>
            <span>
              Don't have an account? <Link to='/register'>Register</Link>
            </span>
          </div>
        </div>
        <div className='right'>
          <div className='head'>
            <h1>Login</h1>
          </div>
          <form className='form'>
            <div className='inputs'>
              <label>Username or email:</label>
              <input type='text' value={inputs.primeiro} name="primeiro" onChange={handleChange}/>
            </div>
            <div className='inputs'>
              <label>Password:</label>
              <input type='password' value={inputs.password} name="password" onChange={handleChange}/>
            </div>
            <button type='button' className='btn2' onMouseUp={login}>
            {ready ? "Login" : <span className='carregando'></span>}
          </button>
          </form>
          <div className='googleBtn'>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const data = jwtDecode(credentialResponse.credential);
                setDataGoogle(data)
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>

          <div className='menos'>
            <span>
              Don't have an account? <Link to='/register'>Register</Link>
            </span>
          </div>
        </div>
        {aviso && (
        <div className='warning'>
          <span>{textoAviso}</span>
          <button className='warningBtn' onMouseUp={clickOk}>
            Ok
          </button>
        </div>
      )}
      </div>
      <div className="logo">
        <img src={Logo1} alt="" />
      </div>
    </div>
  );
}
