//create express app
const exp=require("express")
const app=exp();

//import userApp
const userApp=require("./APIs/usersApi")
const productsApp=require("./APIs/productsApi")

require('dotenv').config()
//assign port number
const port=process.env.PORT||4000

//execute userApi when path starts with /user-api
app.use('/user-api',userApp)

//execute productsApi when path starts with /products-api
app.use('/products-api',productsApp)


//assign port number
app.listen(port,()=>console.log("web server lisening in port 3500..."))

const path=require("path");
//connect react build
app.use(exp.static(path.join(__dirname,'./build')))



//get mongo client
const mclient=require('mongodb').MongoClient;

//connect to db server using mongoClient
mclient.connect('mongodb://127.0.0.1:27017')
.then((dbRef)=>{
  //connect to a database
  const dbobj=dbRef.db('b1db')
  //connect to collections of this database
  const userCollectionObj=dbobj.collection('usercollection')
  const productCollectionObj=dbobj.collection('productcollection')
  //share collections to APIs
  app.set('userCollectionObj',userCollectionObj)
  app.set('productCollectionObj',productCollectionObj)
  console.log("DB connections is successfull")
})
.catch(err=>console.log("database connect error :",err))


//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)


//invalid path
const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:"Invalid path"})
} 

app.use("*",invalidPathMiddleware)

//error handling middleware
const errhandlingMiddleware=(error,request,response,next)=>{

response.send({message:error.message})
}

app.use(errhandlingMiddleware)