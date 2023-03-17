const jwt=require("jsonwebtoken")

require("dotenv").config()

//write a middleware function to verify token
const verifyToken=(request,response,next)=>{
//get bearer token from req.headers
const bearerToken=request.headers.authorization//Bearer token
//if bearer token not found
if(bearerToken===undefined){
    response.send({message:"Unauthorized access...plz login first"})
}
//if bearer token is existed
else{
    //get token from bearer token
    const token=bearerToken.split(" ")[1]//["bearer",token]
    //verify token
    try{
        jwt.verify(token,process.env.SECRET_KEY)
        //calling next middleware
        next()
    }
    catch(err){
        //forward error to error handling middleware
        next(new Error("Session expired.Please relogin to continue")) 
    }

}


}

module.exports=verifyToken