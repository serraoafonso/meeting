import React from "react";
import { Link } from "react-router-dom";
import './register.css'

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
              <input type='text' />
            </div>
            <div className='inputs1'>
              <label>Password:</label>
              <input type='password1' />
            </div>
            <input type='button' value='Login' className='btn1' />
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
