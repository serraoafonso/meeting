import React from "react";
import { Link } from "react-router-dom";
import './register.css'

export default function Register() {
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
      client_id: "451868079952-0n9a0jnfiqioms8fm9sbhh9vcmus2djv.apps.googleusercontent.com",
      callback: onSignIn
    })

    google.accounts.id.renderButton(
      document.getElementById('sign'),
      {theme: "outline", size: "large"}
    )
  
  }, [])
/*
  async function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+response.credential)
    var userObject = jwt_decode(response.credential)
   } */

  return (
    <div className='register'>
      <div className='box1'>
          <div className='head1'>
            <h1>Register</h1>
          </div>
          <form className='form1'>
            <div className='inputs1'>
              <label>Name:</label>
              <input type='text' />
            </div>
            <div className='inputs1'>
              <label>Surname:</label>
              <input type='text' />
            </div>
            <div className='inputs1'>
              <label>Username:</label>
              <input type='text' />
            </div>
            <div className='inputs1'>
              <label>Email:</label>
              <input type='email' />
            </div>
            <div className='inputs1'>
              <label>Password:</label>
              <input type='password1' />
            </div>
            <input type='button' value='Login' className='btn1' />
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </form>
          <div className='menos1'>
            <span>
              Already have an account? <Link to='/register'>Register</Link>
            </span>
          </div>
      </div>
    </div>
  );
}
