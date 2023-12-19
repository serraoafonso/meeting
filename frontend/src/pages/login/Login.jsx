import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Logo1 from '../../assets/imgs/logo/logo1.png'
import Logo2 from '../../assets/imgs/logo/logo2.png'

export default function Login() {
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
          <div className='googleBtn'>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(jwtDecode(credentialResponse.credential));
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
      </div>
      <div className="logo">
        <img src={Logo1} alt="" />
      </div>
    </div>
  );
}
