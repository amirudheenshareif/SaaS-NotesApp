import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: String,
  description: String,
  tenant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tenant"
    },
  user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})

export const Note = mongoose.model("Note",notesSchema);