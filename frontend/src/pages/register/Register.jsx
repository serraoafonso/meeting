import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../context/userContext";


export default function Register() {
  const navigate = useNavigate();
  const {changeUser} = useContext(UserContext)
  const [dataGoogle, setDataGoogle] = useState('');
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    profilePic: ""
  })

  function handleChange(e){
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
    console.log(inputs)
  }

  async function register(){
    if(dataGoogle != ""){
      
      const {name, picture, email} = dataGoogle;
      const username = `user-${Date.now()}`
      const data = {
        name, 
        email,
        username,
        profilePic: picture,
        password: '',
        googleUser: 'true'
      }
      try{
        const res = await fetch('http://localhost:3000/api/user/register',{
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(data),
          credentials: 'include',
        })
        if(res.status==404){
          alert('Erro');
          setDataGoogle('')
        }else{
          alert('Sucesso')
          const responseData = await res.json()
          const {email, name, picture} = responseData
          changeUser({
            email,
            name,
            username,
            profilePic: picture
          });
          navigate('/')
        }
      }catch(err){
        console.log(err)
        alert('Erro');
      }

    }else{
      try{
        const res = await fetch('http://localhost:3000/api/user/register',{
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({...inputs, googleUser: "false"}),
          credentials: 'include',
        })
        if(res.status == 404){
          console.log(res);
        }else{
          const responseData = await res.json()
          const {email, name, profilePic, username} = responseData
          changeUser({
            email,
            name,
            username,
            profilePic
          });
          navigate('/')
        }
      }catch(err){
        console.log(err)
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
            <input type='text' name="name" value={inputs.name} onChange={handleChange}/>
          </div>{/*
          <div className='inputs1'>
            <label>Age:</label>
            <input type='number' name="age" value={inputs.age} onChange={handleChange}/>
          </div>*/}
          <div className='inputs1'>
            <label>Username:</label>
            <input type='text' name="username" value={inputs.username} onChange={handleChange}/>
          </div>
          <div className='inputs1'>
            <label>Email:</label>
            <input type='email' name="email" value={inputs.email} onChange={handleChange}/>
          </div>
          <div className='inputs1'>
            <label>Password:</label>
            <input type='password1' name="password" value={inputs.password} onChange={handleChange}/>
          </div>
          <input type='button' value='Login' className='btn1' onMouseUp={register}/>
        </form>
        <div className='googleBtn'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              setDataGoogle(jwtDecode(credentialResponse.credential));
              register()
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
        </div>

        <div className='menos1'>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
