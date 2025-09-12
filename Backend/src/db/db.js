import mongoose from "mongoose";

function connectDB() {
    
    mongoose.connect(process.env.MONGODB_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
    })
    .then(() => {
            console.log("mongoDB conneted sucessfully");
        })
        .catch((error) => {
            console.log("mongodb connection error", error);    
        })
}



export default connectDB; 