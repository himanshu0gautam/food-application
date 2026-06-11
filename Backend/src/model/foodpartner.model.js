import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    BusinessName: {
        type: String,
        required: true,
    },
    shopDetails: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    role:{
        type: String,
        enum: ["foodpartner"],
        default: "foodpartner"
    }
}, {timestamps: true})

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema)


export default foodPartnerModel
