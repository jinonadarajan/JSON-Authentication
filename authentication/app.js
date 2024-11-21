require("dotenv").config()
const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const userRouters=require("./Routers/UserRouter")



const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL

app.use("/user",userRouters)





mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("THE DB IS CONNECTED")
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT,(req,res)=>{
    console.log(`THE PORT IS RUNNING ${PORT}`)
})