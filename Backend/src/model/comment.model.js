import mongoose, { Types } from "mongoose";

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    replytext: {
        type: String,
        required: true
    }
}, { timestamps: true })


const commentSchema = new mongoose.Schema({

    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    commentText: {
        type: String,
        index: true,
        required: true
    },
    replies: [replySchema],
    commentLike: {
        type: Number,
        default: 0
    }

},{ timestamps: true})

const commmentModel = mongoose.model("comment", commentSchema)

export default commmentModel;