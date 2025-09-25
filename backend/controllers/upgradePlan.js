import { User } from "../models/UserSchema.js";
import { Tenant } from "../models/tenantSchema.js";

export const upgradePlan = async (req, res) => {
    const { userId,tenantId } = req.body;


    try {
           const user = await User.findById(userId);
            if (user.role !== "Admin") {
               return res.status(403).json(
                { success: false,
                  message: "Only Admins can upgrade the plan."
                 });
               }
        const tenant = await Tenant.findByIdAndUpdate( tenantId, {
            $set:{
                subscriptionPlan: "Pro"
            }
        },{new:true});

        return res.status(200).json({
            success: true,
            message: "Plan upgraded to Pro successfully",
            tenant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error upgrading plan",
            error
        });
    }
}