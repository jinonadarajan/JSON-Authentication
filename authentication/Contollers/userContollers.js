const userModel=require("../Models/userModel")

const userControllers=new Object()
const validator=require("validator")
const bcrypt=require("bcrypt")
const verifyToken=require('../middleware/token')
const generateToken=require("../utils/token")


userControllers.userRegister=async(req,res)=>{
    const{userName,email,password}=req.body

    try{

        const username=await userModel.findOne({userName:userName})
        const Email=await userModel.findOne({email:email})

    if(username){
        return{status:false,message:"the UserName alredy exists"}
    }
    if(Email){
        return{status:false,message:"the email already exists"}
    }
    if(!validator.isEmail(email)){
        return{status:false,message:"the email is not in crt format "}
    }
    if(password.length<6){
        return{status:false,message:"the password length is lessthan 6"}
    }

    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)

    const newUser=new userModel({
        userName:userName,
        email:email,
        password:hash
    })

    const user=await newUser.save()
    console.log(user)

    if(user){
        return{status:true,message:"The user register Sucessfully",data:user}
    }
    return{status:false,meesage:"the user not register the profile"}
    

    }catch(err){
        console.log(err)
    }
}

userControllers.userLogin=async(req,res)=>{
    const{email,password}=req.body

    try{
        const user=await userModel.findOne({email})
        if(!user){
            return{status:false,message:"the user cannot be found"}
        }
        const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
        return{status:false,message:"the password is incorrect"}
      }
        //if(user){
            //return{status:true,message:"The user login Sucessfully",data:user}
        //}
        //return{status:false,meesage:"the user email is cannot find"}
        
        const token=generateToken(user)
        return{token}

     }catch(err){
        console.log(err)
    }
}

userControllers.tokenVerify=async(req,res)=>{
    try{
      if(verifyToken){
        return{status:true,message:"welcome to our page"}
      }else{
        return{status:false,message:"Token not verify"}
      }
    }catch(err){
          console.log(err)
    }
    }

userControllers.userGet=async(req,res)=>{
    const userId=req.params.id
    try{
       const user=await userModel.findById(userId)
       if(user){
         return{status:true,message:"user fetch the detail Sucessfully",data:user}
       }
       return{status:true,message:"the detail cannot fetch"}

    }catch(err){
        console.log(err)
    }
}
userControllers.userUpdate=async(req,res)=>{
    const userId=req.params.id
    try{
       const user=await userModel.findByIdAndUpdate(userId,req.body,{new:true})
       if(user){
         return{status:true,message:"user datail updated ucessfully",data:user}
       }
       return{status:true,message:"not updated"}

    }catch(err){
        console.log(err)
    }
}
userControllers.userDelete=async(req,res)=>{
    const userId=req.params.id
    try{
       const user=await userModel.findByIdAndDelete(userId)
       if(user){
         return{status:true,message:"user datail deleted ucessfully",}
       }
       return{status:true,message:"not deleted "}

    }catch(err){
        console.log(err)
    }
}

module.exports=userControllers