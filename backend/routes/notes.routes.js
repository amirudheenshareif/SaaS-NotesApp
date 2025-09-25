import { Router } from "express";
import { getNotes } from "../controllers/getNotes.js";
import { postNotes } from "../controllers/postNotes.js";
import { getNote } from "../controllers/getNote.js";
import { updateNote } from "../controllers/updateNote.js";
import { deleteNote } from "../controllers/deleteNote.js";


export const notesRouter = Router();

notesRouter.get("/", getNotes);
notesRouter.post("/", postNotes);
notesRouter.get("/:id", getNote);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);


