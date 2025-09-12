import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        // minLength: [6, "atleast 6 char long"]
    }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel