import React from 'react'
import {useNavigate } from 'react-router-dom'
import { useState ,useContext,useEffect} from 'react'
import {set, useForm} from 'react-hook-form'
import { loginContext } from '../../contexts/loginContext'
import axios from "axios"
function Login() {

//navigate hook
let navigate=useNavigate()
let [currentUser,loginErr,userLoginStatus,loginUser]=useContext(loginContext)
let {register,handleSubmit,formState:{errors}}= useForm();
let [err,setErr]=useState("")

let addNewUser=(newUser)=>{
  loginUser(newUser)
}


useEffect(()=>{
  if(userLoginStatus===true){
    navigate("/user-profile")
  }
},[userLoginStatus])


  return (
    <div className='add-user'>
      <p className="display-3 text-center">Add New User</p>
      {/*responsive form */}
      <div className="row">


        {/*HTTP err message */}
        {loginErr.length!=0&&<p className='display-3 fw-bold text-center text-danger'>{loginErr}</p>}
        
        
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
<form onSubmit={handleSubmit(addNewUser)}  action="">
  <div className="mb-3">
    <label htmlFor="username">Name  </label>
    <input type="text" name="" id="username" className='form-control' {...register("username",{required:true})} />
  </div>
  {errors.name?.type==="required"&&<p className='text-danger fw-bold'>*Name is required</p>}
   <div className="mb-3">
    <label htmlFor="password">Password</label>
    <input className='form-control' type="password" name="password" id="password" {...register("password",{required:true})} />
   </div>
  {/* submit button */}
  <button type="submit" className=' add-user-btn p-2'>Login</button>
</form>
        </div>
      </div>
    </div>
  )
}

export default Login