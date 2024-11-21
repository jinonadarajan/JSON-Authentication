const express=require("express")

const userControllers=require("../Contollers/userContollers")

const userRouters=express.Router()


userRouters.post("/",async(req,res)=>{
    try{
      const user=await userControllers.userRegister(req)
      res.status(201).send(user)
    }catch(err){
        console.log(err)
    }
})

userRouters.get("/data",async(req,res)=>{
  try{
    const user=await userControllers.tokenVerify(req)
    res.status(201).send(user)
  }catch(err){
    console.log(err)
  }
})
userRouters.get("/",async(req,res)=>{
  try{
    const user=await userControllers.userLogin(req)
    res.status(200).send(user)
  }catch(err){
      console.log(err)
  }
})
userRouters.get("/:id",async(req,res)=>{
  try{
    const user=await userControllers.userGet(req)
    res.status(200).send(user)
  }catch(err){
      console.log(err)
  }
})
userRouters.put("/:id",async(req,res)=>{
  try{
    const user=await userControllers.userUpdate(req)
    res.status(200).send(user)
  }catch(err){
      console.log(err)
  }
})
userRouters.delete("/:id",async(req,res)=>{
  try{
    const user=await userControllers.userDelete(req)
    res.status(200).send(user)
  }catch(err){
      console.log(err)
  }
})

module.exports=userRouters