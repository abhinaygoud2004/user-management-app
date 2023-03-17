import React from 'react'
import './AddUser.css'
import {useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {set, useForm} from 'react-hook-form'
import axios from "axios"
function AddUser() {

//navigate hook
let navigate=useNavigate()

let {register,handleSubmit,formState:{errors}}= useForm();
let [selectedFile,setSelectedFile]=useState(null)
let [err,setErr]=useState("")
let addNewUser=(newUser)=>{
  //save newUser in json-server by making HTTP POST request


  let fd=new FormData();
  //append newUser to form data
  fd.append("user",JSON.stringify(newUser))
  //append selected file to form data
  fd.append("photo",selectedFile)

  
axios.post("http://localhost:3500/user-api/register",fd)
.then(response=>{
  console.log(response)
  if(response.status===201){
    //navigate to login component
    navigate("/Login")
  }
  if(response.status!==201){
    setErr(response.data.message)
  }
})
.catch(err=>{
  //the client was given an error response {4xx,5xx}
  if(err.response){
    setErr(err.message)
  }
  //the client received a response and the request was never left
  else if(err.request){
    setErr(err.message)
  }
  //other errors
  else{
    setErr(err.message)
  }

})
}


//on file select
const onFileSelect=(e)=>{
setSelectedFile(e.target.files[0])
}


  return (
    <div className='add-user'>
      <p className="display-3 text-center">Add New User</p>
      {/*responsive form */}
      <div className="row">


        {/* //HTTP err message */}
        {err.length!=0&&<p className='display-3 fw-bold text-center text-danger'>{err}</p>}
        
        
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
  <div className="mb-3">
    <label htmlFor="email">Email  </label>
    <input type="email" name="" id="email" className='form-control' {...register("email",{required:true})} />
  </div>
  {errors.email?.type==="required"&&<p className='text-danger fw-bold'>*Email is required</p>}

  <div className="mb-3">
    <label htmlFor="dob">DOB  </label>
    <input type="date" name="" id="dob" className='form-control' {...register("DOB",{required:true})} />
  </div>
  {errors.DOB?.type==="required"&&<p className='text-danger fw-bold'>*DOB is required</p>}
  <div className="mb-3">
    <label htmlFor="image">Select profile pic</label>
    <input type="file" name="" id="image" className='form-control' {...register("Image",{required:true})} onInput={onFileSelect} />
  </div>
  {errors.Image?.type==="required"&&<p className='text-danger fw-bold'>*Image is required</p>}

  {/* submit button */}
  <button type="submit" className=' add-user-btn p-2'>Create New User</button>
</form>
        </div>
      </div>
    </div>
  )
}

export default AddUser