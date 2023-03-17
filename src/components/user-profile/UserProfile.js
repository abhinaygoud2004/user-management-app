import React, { useContext } from 'react'
import {loginContext} from '../../contexts/loginContext'
import './UserProfile.css'
import { NavLink, Outlet} from 'react-router-dom'

function UserProfile() {
  let [currentUser]=useContext(loginContext)
  const activeLink={
    color:"#EEF0F1",
    fontSize:"1.2rem",
    fontWeight:"bold"
  }
  const inactiveLink={
    color:"black",
    fontSize:"1.2rem"
  }
  return (
    <div>
      <p className="display-5 text-end">Welcome {currentUser.username}</p>
      <p className="display-6 text-end">{currentUser.email}</p>
       <img src={currentUser.Image}width="30px" alt="" className='float-end'/>
       <ul className="nav justify-content-between">
       <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"
          style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }} to="products">
            Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"
          style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }} to="cart">
            Cart</NavLink>
        </li>
       </ul>
       <Outlet/>
    </div>
  )
}

export default UserProfile