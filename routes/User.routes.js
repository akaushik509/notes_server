const express=require("express")
const {UserModel}=require("../model/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    //const payload=req.body //or
    const {name,email,pass} = req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err) res.send({"msg":"Something went wrong", "Error":err.message})
            else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"New User has been registered"})
            }
        })
    }catch(err){
        res.send({"msg":"Something went wrong", "Error":err.message})
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body

    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    console.log(token)
                    res.send({"msg":"Logged In","token":token})
                }else{
                    console.log("Wrong Credentials")
                    res.send({"msg":"Wrong Credentials"})
                }
            })
            
        }else{
            
        }
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

module.exports={
    userRouter
}