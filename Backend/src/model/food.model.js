import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true,
        index: true
    },
    foodvideo: {                //video url set 
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    typeOfFood: {
        type: String,
        required: true,
        index: true
    },
    preprationTime: {
        type: String
    },
    foodprice: {
        type: String,
        required: true,
        index: true
    },
    foodpriceHalf: {
        type: String,
        required: true,
        index: true
    },
    calories: {
        type: String,
        required: true,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    Rating: {
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