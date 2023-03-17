import React,{useContext} from 'react'
import './NavigationBar.css'
import {NavLink} from 'react-router-dom'
import {FaUsers,FaUsersSlash}from 'react-icons/fa'
import { act } from 'react-dom/test-utils'
import { loginContext } from '../../contexts/loginContext'



function NavigationBar() {


  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

const activeLink={
  color:"#EEF0F1",
  fontSize:"1.2rem",
  fontWeight:"bold"
}
const inactiveLink={
  color:"#EEF0F1",
  fontSize:"1.2rem"
}

return(
  <nav className="navbar navbar-expand-sm bg-light">
  <div className="container-fluid">
    <a href="#" className="navbar-brand">
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/WLM_logo-2.svg" width="30px" height="30px"alt="" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"
          style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }} to="/Register">
            <FaUsers className='users-icon'/>Register</NavLink>
        </li>




        {userLoginStatus?
         <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"
          style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }} to="/Login" onClick={logoutUser}>
            
            <FaUsers className='users-icon'/>Logout</NavLink>
        </li>
        :
        <li className="nav-item">
         <NavLink className="nav-link " aria-current="page"
          style={({isActive})=>{
       return isActive?activeLink:inactiveLink;
       }} to="/Login">
       <FaUsers className='users-icon'/>Login</NavLink>
      </li>
     }



        
  





        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page"
          style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }} to="/AboutUs">About Us</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
)
}

export default NavigationBar