// import { json } from "body-parser";
import foodPartnerModel from "../model/foodpartner.model.js";
import AdminModel from "../model/admin.model.js";
import { sendApprovalMessage } from "../services/rabbitMQ.js";

async function adminRegister(req, res) {
    const { name, password, secretkey } = req.body;

    if (!name || !password || !secretkey) {
        return res.status(401).json({
            message: "Name, password and secretkey are required"
        })
    }

    if(secretkey !== process.env.ADMIN_SECRET_KEY){
        return res.status(403).json({ message: "invalid admin secret key"})
    }

    const adminCount = await AdminModel.countDocuments();

    if (adminCount >= 1) {
        return res.status(401).json({
            message: "Only one admin is allowed. You cannot create more admins."
        })
    }

    const ifAdminAlreadyExist = await AdminModel.findOne({
        name
    })

    if (ifAdminAlreadyExist) {
        return res.status(400).json({
            message: "Admin already exists"
        })
    }

    const admin = await AdminModel.create({
        name,
        password
    })

    res.status(200).json({
        message: "Admin created successfully",
        admin: admin
    })

}

async function adminLogin(req, res) {
    const { name, password } = req.body;

    const admin = await AdminModel.findOne({
        name,
        password
    })

    if (!admin) {
        return res.status(400).json({
            message: "invalid admin and password"
        })
    }

    if (name !== "himanshu" || password !== "himanshu123") {
        return res.status(403).json({
            message: "You are not Admin",
        });
    }

    res.status(200).json({
        message: "Admin logged in successfully",
        admin: admin
    })

}

async function adminApprove(req, res) {
    const { id } = req.params;

    try {
        const seller = await foodPartnerModel.findById(id);

        if (!seller) {
            return res.status(404).json({
                message: "Seller not found"
            })
        }

        seller.status = "approved";
        await seller.save();

        try {
            await sendApprovalMessage({
               email: seller.email,
               sellerId: seller._id,
               status: "approved" 
            });
            console.log("✓ Approval message queued for:", seller.email);
        } catch (mqError) {
            console.error("✗ RabbitMQ error:", mqError);
            return res.status(500).json({
                message: "Seller approved but email queue failed",
                error: mqError.message
            });
        }

        res.json({
            message: "Food Partner approved successfully",
            seller: seller
        })
        
    } catch (error) {
        console.log("✗ Admin approve error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { adminLogin, adminRegister, adminApprove };