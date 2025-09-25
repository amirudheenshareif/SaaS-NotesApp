import { Note } from "../models/NotesSchema.js";

export const getNote = async (req,res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        if(!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            note
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching note",
            error
        });
    }
    
}