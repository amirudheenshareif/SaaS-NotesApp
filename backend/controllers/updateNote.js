import { Note } from "../models/NotesSchema.js";


export const updateNote = async (req,res)=> {

    const{ title, content } = req.body;
    const noteId = req.params.id;

    try {
        const note = await Note.findByIdAndUpdate(noteId,{
            title,
            description:content
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Note Updated Successfully",
            note
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error Updating Note",
            error
        })   
    }
}