import { User } from "../models/UserSchema.js";
// import bcrypt from "bcrypt";
import { Note } from "../models/NotesSchema.js";
import { Tenant } from "../models/tenantSchema.js";
import bcrypt from "bcrypt";


export const testController = async (req,res) => {


//----------Creating a User and adding to a tenant----------------

//    try {
//     const { email, password, role, tenantName } = req.body;

//     // Find the tenant
//     const tenant = await Tenant.findOne({ name: tenantName });
//     if (!tenant) {
//       return res.status(404).json({ success: false, message: "Tenant not found" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//       role,
//       tenant: tenant._id
//     });

//     // Push the user ID into tenant's users array
//     tenant.users.push(newUser._id);
//     await tenant.save();

//     return res.status(201).json({
//       success: true,
//       message: "User created and added to tenant",
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//         tenant: tenant.name
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error", error });
//   }


}