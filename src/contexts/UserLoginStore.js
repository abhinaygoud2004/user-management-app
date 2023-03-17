import React from 'react'
import { useState } from 'react'
import { loginContext } from './loginContext';
import axios from 'axios';

function UserLoginStore({children}) {
    const [currentUser,setCurrentUser]=useState({});
    const [loginErr,setLoginErr]=useState("")
    const [userLoginStatus,setUserLoginStatus]=useState(false)
    //function to make user login request;
    const loginUser=(userCredentialObj)=>{
     axios.post("http://localhost:3500/user-api/login",userCredentialObj)
     .then(response=>{
      if(response.data.message==="success"){

       //save token to local storage
       localStorage.setItem("token",response.data.token)

        setCurrentUser({...response.data.user})
        setLoginErr("")
        setUserLoginStatus(true)
      }
      else{
       setLoginErr(response.data.message)
      }
     })
     .catch(err=>{
        console.log("error in user login",err)
        setLoginErr(err.message);
     })

    }

    //logut user
    const logoutUser=()=>{
      localStorage.clear()
      setUserLoginStatus(false)
    }
  return (
   <loginContext.Provider value={[currentUser,loginErr,userLoginStatus,loginUser,logoutUser]}>
    {children}
   </loginContext.Provider>
  )
}

export default UserLoginStore