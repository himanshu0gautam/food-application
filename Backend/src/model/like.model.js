import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
    },
}, {timestamps: true})

// unique index: ek user ek hi video ko ek hi baar like kar sake
likeSchema.index({ User: 1, food: 1 }, { unique: true });

const likemodel = mongoose.model("like", likeSchema)

export default likemodel