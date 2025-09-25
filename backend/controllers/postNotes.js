import { Note } from "../models/NotesSchema.js";
import { Tenant } from "../models/tenantSchema.js";
import { User } from "../models/UserSchema.js";

export const postNotes = async (req,res) => {

    const{ title, content, userId,tenantId } = req.body;

    try {
        // Create the note
        const note = await Note.create({
          title,
          description:content,
          user: userId,
          tenant:tenantId
        });

        const tenant = await Tenant.findByIdAndUpdate(tenantId,{
            $inc:{
                noteCount:1
            }
        },{new:true});

        // Push the note ID into user's notes array
        const user = await User.findByIdAndUpdate(userId,{
            $push:{
                notes:note._id
            }
            },{new:true});

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            noteCount:tenant.noteCount,
            note,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
             message: "Server error",
              error });
    }  
}