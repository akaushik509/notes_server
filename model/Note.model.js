const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    user:String
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}

/* 63f05fb5ad9b08ae815f3158 */