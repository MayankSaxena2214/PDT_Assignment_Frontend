import React, { useEffect, useState } from 'react'
import "./Login.css"
import {Link, useNavigate} from "react-router-dom"
import { UserData } from '../../context/UserContext';
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const {login,isAuthenticated,user}=UserData();
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/");
    }
  },[isAuthenticated])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(email,password,navigate);
  }
  return (
    <div className="auth-container">
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {/* <label htmlFor="">Name</label>
          <input type="text" placeholder='Enter your name' /> */}
          <label htmlFor="">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' />
          <label htmlFor="">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder='Enter your password' />

          <button>Login</button>
          <Link to={"/register"}><p>Not Registered?</p></Link>
          
        </form>
      </div>
    </div>
  )
}

export default Login