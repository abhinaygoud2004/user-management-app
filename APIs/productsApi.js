//create mini-express app(A router)
const exp=require("express")
const productsApp=exp.Router()


let products=[]

//get product
productsApp.get('/get-products',(request,response)=>{
    response.send({message:"all products"})
})


//get products by id
productsApp.get('/get-products/:id',(request,response)=>{
    let Id=(+request.params.id)
    let prod=products.findIndex(obj=>obj.id===Id)
    response.send({message:"One product"})

})

//body parser
productsApp.use(exp.json())

//create user
productsApp.post('/create-product',(request,response)=>{
    let newProduct=request.body;
    products.push(newProduct)
    response.send({message:"New Product created"})
})

//update user
productsApp.put("/update-product",(request,response)=>{
    let modifiedProduct=request.body
    let ind=products.findIndex(Obj=>Obj.id===modifiedProduct.id)
    if(ind===-1)
    response.send({message:"Product not found"})
    else{
        products.splice(ind,1,modifiedProduct)
        response.send({message:"Product modified"})
    }
})



//delete user
productsApp.delete('/delete-product/:id',(request,response)=>{
    let Id=(+request.params.id)
    let ind=products.findIndex(obj=>obj.id===Id)
   if(ind===-1)
   response.send({message:"No Product found"})
   else{
    products.splice(ind,1)
    response.send({message:"Product deleted"})
   }
})

module.exports=productsApp