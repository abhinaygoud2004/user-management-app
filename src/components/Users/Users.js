import React from 'react'
import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import './Users.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
function Users() {
  let {register,handleSubmit,formState:{errors},setValue,getValues}= useForm();
//users state
let [users,setUsers]=useState([])
let [err,setErr]= useState("")
//user to edit state
let [userToEdit,setUserToEdit]=useState({})

  //modal state
  let [show,setShow]=useState(false)
  let showModal=()=>setShow(true)
  let closeModal=()=>setShow(false)

  //edit user
let editUser=(userObjToBeEdited)=>{
showModal()
setUserToEdit(userObjToBeEdited)
//fill input fields with user details
setValue("name",userObjToBeEdited.name)
setValue("email",userObjToBeEdited.email)
setValue("DOB",userObjToBeEdited.DOB)
setValue("Image",userObjToBeEdited.Image)
}

//save user
let saveUser=()=>{
  closeModal()

  //get modifies the user data
  let modifiedUser=getValues()
  //set id for modifiedUser
  modifiedUser.id=userToEdit.id;
  //make HTTP PUT request to save modifiedUser object
  axios.put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
  .then(res=>{
    if(res.status===200){
   getUsers()
    }} )
    .catch(err=>{

    })
}

//side effect
useEffect(()=>{
getUsers()

},[])

//get users
let getUsers=()=>{
  //fetch users
axios.get("http://localhost:4000/users")

.then(response=>{
if(response.status===200){
  setUsers(response.data)
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

  return (
    <div className='users'>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {
          users.map(userObj=>(
            <div className="col text-center mx-auto" key={userObj.id}>
              <div className="card">
                <img src= {userObj.Image} alt="" className='mx-auto p-3 profile-image' />
                <div className="card-body">
                  <p className='display-3 name'>{userObj.name}</p>
                  <p className="lead fs-4">{userObj.email}</p>
                  <p className="lead">DOB : {userObj.DOB}</p>
                  {/*edit button*/}
                   <button className="btn btn-warning float-start" onClick={()=>editUser(userObj)}>Edit</button>

                  {/*delete button*/}
                  <button className="btn btn-danger float-end" >Delete</button>

                </div>
              </div>
            </div>
          ))
        }
      </div>
      {/*Modal to edit user */}
      <Modal show={show}
      onHide={closeModal}
      backdrop="static"
      centered 
       className='modal' >
        {/*modal header */}
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        {/*modal body */}
        <Modal.Body>
          {/* form to edit */}
          <form   action="">
  <div className="mb-3">
    <label htmlFor="name">Name  </label>
    <input type="text" name="" id="name" className='form-control' {...register("name")} />
  </div>
  {errors.name?.type==="required"&&<p className='text-danger fw-bold'>*Name is required</p>}
  <div className="mb-3">
    <label htmlFor="email">Email  </label>
    <input type="email" name="" id="email" className='form-control' {...register("email")} />
  </div>

  <div className="mb-3">
    <label htmlFor="dob">DOB  </label>
    <input type="date" name="" id="dob" className='form-control' {...register("DOB")} />
  </div>
  <div className="mb-3">
    <label htmlFor="image">User Image</label>
    <input type="text" name="" id="image" className='form-control' {...register("Image")}  disabled/>
  </div>

</form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" onClick={saveUser}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Users