import React from 'react'
import {Link} from'react-router-dom'

export default function Register() {
  return (
    <div>
      <div className="left">
        
      </div>
      <div className="right">
      <h2>Welcome!</h2>
        <div className="r">
          <span>Already have an account? <Link to='/login'>Login</Link></span>
        </div>
      </div>
    </div>
  )
}
