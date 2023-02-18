const express=require("express")
const {NoteModel}=require("../model/Note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"Note Created"})
})


noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id 
    const note = await NoteModel.findOne({"_id":noteID})
    const userID_in_note=note.user
    const UserID_making_req=req.body.user
    try{
        if(UserID_making_req!==userID_in_note){
            console.log(UserID_making_req)
            console.log(userID_in_note)
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":`Note with id: ${noteID} has been deleted`})
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const noteID=req.params.id 
    const note = await NoteModel.findOne({"_id":noteID})
    const userID_in_note=note.user
    const UserID_making_req=req.body.user
    try{
        if(UserID_making_req!==userID_in_note){
            console.log(UserID_making_req)
            console.log(userID_in_note)
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},payload)
            res.send({"msg":`Note with id: ${noteID} has been Updated`})
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
    
})


module.exports={
    noteRouter
}