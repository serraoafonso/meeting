import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Register() {
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

        <div className='menos1'>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
