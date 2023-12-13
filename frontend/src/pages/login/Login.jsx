import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./login.css";
const chave = 'AIzaSyBG4yKSSOnqFcoY7Vh-ashe9Z5ZyhM1hYw'

export default function Login() {
  function onSignIn(googleUser) {
    // Aqui você pode acessar as informações do usuário usando googleUser.
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
  
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: `47460147533-225jbb1nsqfnlciu1d58ca9e8u43epln.apps.googleusercontent.com`,
      callback: onSignIn
    })

    google.accounts.id.renderButton(
      document.getElementById('sign'),
      {theme: "outline", size: "large"}
    )
  
  }, [])
  
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
              <input type='text' />
            </div>
            <div className='inputs'>
              <label>Password:</label>
              <input type='password' />
            </div>
            <input type='button' value='Login' className='btn' />
          </form>
          <div className="sign" data-onsuccess="onSignIn"></div>
          <div className='menos'>
            <span>
              Don't have an account? <Link to='/register'>Register</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
