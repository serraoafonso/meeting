import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Register() {
  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);
  const [dataGoogle, setDataGoogle] = useState("");
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  useEffect(() => {
    //console.log("dataGoogle atualizado:", dataGoogle);
    if (dataGoogle !== "") {
      register();
    }
  }, [dataGoogle]);

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sucesso) navigate("/");
    setSucesso(false);
  }

  async function register() {
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
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/enterGoogle`, {
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
          const { email, name, profilePic, id } = responseData;
          changeUser({
            email,
            name,
            username,
            profilePic,
            id
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
      if (inputs.password.length < 9) {
        setTextoaviso("Password too weak");
        setAviso(true);
      } else {
        try {
          setReady(false);
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(inputs),
            credentials: "include",
          });
          if (res.status == 404) {
            console.log(res);
            setTextoaviso("Error, username or email already taken");
            setAviso(true);
            setDataGoogle("");
            setReady(true);
          } else {
            const responseData = await res.json();
            const { email, name, profilePic, username, id } = responseData;
            changeUser({
              email,
              name,
              username,
              profilePic,
              id
            });
            setTextoaviso("Account created with success!");
            setSucesso(true);
            setAviso(true);
            setReady(true);
          }
        } catch (err) {
          console.log(err);
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
        }
      }
    }
  }

  return (
    <div className='register'>
      <div className='box1'>
        <div className='head1'>
          <h1>Register</h1>
        </div>
        <form className='form1'>
          <div className='inputs1'>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          {/*
          <div className='inputs1'>
            <label>Age:</label>
            <input type='number' name="age" value={inputs.age} onChange={handleChange}/>
          </div>*/}
          <div className='inputs1'>
            <label>Username:</label>
            <input
              type='text'
              name='username'
              value={inputs.username}
              onChange={handleChange}
            />
          </div>
          <div className='inputs1'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className='inputs1'>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <button type='button' className='btn1' onMouseUp={register}>
            {ready ? "Register" : <span className='carregando'></span>}
          </button>
        </form>
        <div className='googleBtn'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const data = jwtDecode(credentialResponse.credential);
              setDataGoogle(data);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <div className='menos1'>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
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
  );
}
