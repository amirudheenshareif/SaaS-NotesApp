import { User } from "../models/UserSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config();


export const loginController = async (req,res) => {
    const{ email,password } = req.body;

    try {
        const user = await User.findOne({email}).populate({
            path:"tenant",
            select:"noteCount subscriptionPlan"
        });

        if(!user){
            return res.status(404).json(
                {
                success:false,
                message:"User not found"
                })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(401).json(
                {
                success:false,
                message:"Invalid Password"
                })
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
        
        return res.status(200).json(
            {
            success:true,
            message:"Login Successful",
            userId:user._id,
            token,
            tenantId:user.tenant,
            role:user.role,
            noteCount:user.tenant.noteCount,
            
            })
        
    } catch (error) {
        return res.status(500).json(
            {
            success:false,
            message:"Error Logging in",
            error
            })
        
    }
}