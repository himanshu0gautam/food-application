import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
    },
}, {timestamps: true})

const saveModel = mongoose.model("save", saveSchema)

export default saveModel