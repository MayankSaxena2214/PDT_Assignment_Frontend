import React, { useState } from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"
import { RiGameFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { UserData } from '../../context/UserContext';
const Navbar = () => {
  const {isAuthenticated,logout}=UserData();
  const handleClick=async()=>{
    await logout();
  }
    const [active,setActive]=useState(false);
    
  return (
    <div className="navbar-container">
        <div className="navbar-logo-container"><Link to={"/"}><RiGameFill className='navbar-logo'/></Link></div>
        <div onClick={()=>{setActive(!active)}} className="navbar-icon-container"><IoMenu className='navbar-icon'/></div>
        <ul className={active?'active':""}>
        <Link onClick={()=>{setActive(!active)}} to={"/"}><li>Home</li></Link>
            {/* <Link onClick={()=>{setActive(!active)}} to={"/make-team"}><li>Make Team</li></Link> */}
            <Link onClick={()=>{setActive(!active)}} to={"/players"}><li>Players</li></Link>
            <Link onClick={()=>{setActive(!active)}} to={"/matches"}><li>Matches</li></Link>
            <Link onClick={()=>{setActive(!active)}} to={"/myteams"}><li>MyTeams</li></Link>
            {isAuthenticated?(
              <p style={{color:"white"}} onClick={handleClick}>Logout</p>
            ):(<Link onClick={()=>{setActive(!active)}} to={"/login"}><li>Login</li></Link>)}
        </ul>
    </div>
  )
}

export default Navbar