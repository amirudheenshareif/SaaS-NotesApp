import { Note } from "../models/NotesSchema.js"
import { Tenant } from "../models/tenantSchema.js";


export const deleteNote = async ( req, res) => {

    const { id } = req.params;
    const { tenantId } = req.query;
    
    try {
        const note = await Note.findByIdAndDelete(id);

        const tenant = await Tenant.findByIdAndUpdate(tenantId,{
            $inc:{
                noteCount:-1
            }
        },{new:true});
        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            noteCount: tenant.noteCount, 
            note
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting note",
            error
        });
    }
}