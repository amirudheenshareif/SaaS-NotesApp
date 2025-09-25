import { Note } from "../models/NotesSchema.js";
import { Tenant } from "../models/tenantSchema.js";


export const getNotes = async (req,res)=> {
    const { role, userId, tenantId } = req.query;

    if(role === "Admin") {
        try {
            const notes = await Note.find({ tenant: tenantId });
            const tenant = await Tenant.findById(tenantId);
            return res.status(200).json({
                success: true,
                message: "Notes fetched successfully for Admin",
                noteCount: tenant.noteCount,
                notes
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching notes for Admin",
                error
            });
        }
    } else {
        try {
            const notes = await Note.find({ user: userId });
            const tenant = await Tenant.findById(tenantId);
            return res.status(200).json({
                success: true,
                message: "Notes fetched successfully for User",
                noteCount: tenant.noteCount,
                notes
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching notes for User",
                error
            });
        }
    }
    
}