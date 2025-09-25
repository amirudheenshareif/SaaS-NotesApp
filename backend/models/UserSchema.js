import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  password: String,
    tenant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tenant"
    },
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notes"
    },],
    role: { type: String, enum: ["Admin", "Member"] },
})

export const User = mongoose.model("User", userSchema);