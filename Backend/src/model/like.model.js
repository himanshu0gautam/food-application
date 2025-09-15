import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
    },
}, {timestamps: true})

const likemodel = mongoose.model("like", likeSchema)

export default likemodel