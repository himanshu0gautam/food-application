import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        index: true
    },
    commentLike: {
        type: Number,
        default: 0
    }

},{ timestamps: true})

const commmentModel = mongoose.model("comment", commentSchema)

export default commmentModel;