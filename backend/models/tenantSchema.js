import mongoose from "mongoose";

const tenantSchema = mongoose.Schema({
    name: String,
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    subscriptionPlan:{ 
        type: String, 
        default: "free"
     },
     noteCount:{
        type:Number,
        default:0
     }
})

export const Tenant = mongoose.model("Tenant",tenantSchema);
