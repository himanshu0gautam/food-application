import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true,
        index: true
    },
    foodvideo: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    uploadedAt:
    {
        type: Date,
        default: Date.now
    },
    url: String,
    mimeType: String,
    size: Number,

}, { timestamps: true })

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;