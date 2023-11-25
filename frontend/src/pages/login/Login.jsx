import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

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
          <h1>Login</h1>
          <form>
            <label>Username or email:</label>
            <input type='text' />
            <label>Password:</label>
            <input type='password' />
            <input type='submit' value='Login' className='btn' />
          </form>
        </div>
      </div>
    </div>
  );
}
