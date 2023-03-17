//create mini-express app(A router)
const exp=require("express")
const { Db } = require("mongodb")
const userApp=exp.Router()

const expressAsyncHandler=require('express-async-handler')

require("dotenv").config()

//import multerObj
const multerObj=require("./middlewares/cloudinaryConfig")

const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const verifyToken=require("./middlewares/verifyToken")

// //create a middleware1
// const middleware1=(request,response,next)=>{
//     //some logic to verify request object
//     console.log("middleware-1 executed")
//     //forward middleware to next

//     next();

//     //send response to client
//     // response.send({message:"Unauthorized request"})
// }
// //user middleware1 for every request
// // userApp.use(middleware1)


// //create middleware2
// const middleware2=(request,response,next)=>{
//     console.log("middleware-2 executed")
//     next()
// }
// //user middleware2 for every request
// userApp.use(middleware2)


//body parser middleware(built-in middleware)
userApp.use(exp.json())




//create ****API****
//get users 


userApp.get('/get-users',
expressAsyncHandler(async(request,response)=>{
    //get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")

    //get users from db
    let usersList=await userCollectionObj.find().toArray()
    //send res
    response.status(200).send({message:"List of users",payload:usersList})
   }))


//get user by id
// userApp.get('/get-user/:id',
// expressAsyncHandler(async(request,response)=>{
//     //get userCollectionObj
//     const userCollectionObj=request.app.get("userCollectionObj")
//     //get userId from url
//    let userId=(+request.params.id)
//    //find user
//     let user=await userCollectionObj.findOne({id:userId})
//     response.status(200).send({message:"User",payload:user})
// }))


//create user
//public route
userApp.post("/register",multerObj.single('photo'),
expressAsyncHandler(async(request,response)=>{
    //get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    //get newUser from request
    const newUser=JSON.parse(request.body.user)
    
    //check for duplicate user by username
    let userOfDB=await userCollectionObj.findOne({username:newUser.username})
    //if user already existed,send res to client as "User already existed"
    if(userOfDB!=null){
        response.status(200).send({message:"User already existed"})
    }
    //if user not existed
    else{


      //add CDN link of cloudinary image to user boj
      newUser.Image=request.file.path;




       //hash the password
       let hashedPassword=await bcryptjs.hash(newUser.password,5)
    //console.log(hashedPassword)//$2a$05$Hi2CG3wljHjWEZZcu.oQqeeYk83MSXhRxN2VOWB8ezlFva7D4Gsyy
       //replace plain password with hashed password
       newUser.password=hashedPassword;
       //insert user
      await userCollectionObj.insertOne(newUser)
      //send response
      response.status(201).send({message:"User created"})
    }
}))


//get user by username;
//make it as private route
userApp.get('/get-user/:username',verifyToken,expressAsyncHandler(async(request,response)=>{
     //get userCollectionObj
     const userCollectionObj=request.app.get("userCollectionObj")
    
     //get username from url
     let usernameFromUrl=request.params.username;
     //find the user by username
     const userOfDB=await userCollectionObj.findOne({username:usernameFromUrl})
     //if user not existed
     if(userOfDB===null){
        response.status(200).send({message:"User not found"})
     }
     //if user existed
     else{
        //remove password from userOfDB
        delete userOfDB.password;
        //send res
        response.status(200).send({message:"User",payload:userOfDB})
     }
}))


//update user
userApp.put("/update-user",
expressAsyncHandler(async(request,response)=>{
    //get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    //get modified user from client
    let modifiedUser=request.body
    //update user in DB
    let dbRes=await userCollectionObj.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}})
    response.status(200).send({message:"User updated"})
}))



//delete user
userApp.delete("/delete-user/:id",
expressAsyncHandler(async(request,response)=>{
    //get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    //get userId from url
    let userId=(+request.params.id) 
    //delete user from DB
    let dbRes=await userCollectionObj.deleteOne({id:userId})
    response.status(200).send({message:"User removed"})
}))



//PUBLIC ROUTES
 //searchiing product
 //get selected product id or name
 //get reviews of a product

//PRIVATE ROUTES
 //write review
 //buy product

//user login
userApp.post('/login',expressAsyncHandler(async(request,response)=>{
        //get userCollectionObj
        const userCollectionObj=request.app.get("userCollectionObj")

          //get user credentials from request
          const userCredObj=request.body;

          //verify username
          let userOfDB=await userCollectionObj.findOne({username:userCredObj.username})
          
          //if username if invalid
          if(userOfDB===null){
            response.status(200).send({message:"Invalid username"})
          }
          //if username is valid
          else{
             //verify password
             //hash the password
             let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)
             //if passwords not matched
             if(isEqual===false){
                response.status(200).send({message:"Invalid password"})
             }
             //if passwords matched
             else{
                //create a JWT token
                let jwtToken=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:20})
                //send token in response
                delete userOfDB.password
                 response.status(200).send({message:"success",token:jwtToken,user:userOfDB})
             }
          }
}))

//private router
userApp.get("/test",verifyToken,(req,res)=>{
   res.send({message:"reply from private route"})
})

//export userApp
module.exports=userApp;