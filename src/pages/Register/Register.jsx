import React, { useState } from 'react'
import "./Register.css"
import {Link, useNavigate} from "react-router-dom"
import { UserData } from '../../context/UserContext';
const Register = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const {register}=UserData();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await register(name,email,password,navigate);
    
  }
  return (
    <div className="auth-container">
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter your name' />
          <label htmlFor="">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter your email' />
          <label htmlFor="">Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Enter your password' />

          <button>Register</button>
          <Link to="/login"><p>Login?</p></Link>
          
        </form>
      </div>
    </div>
  )
}

export default Register