//create server
import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors"
import authRouter from "./routes/auth.route.js";  
import foodRouter from "./routes/food.route.js";
import adminRouter from "./routes/admin.route.js";
import locationRouter from "./routes/loaction.route.js";
import createFoodRouter from "./routes/createFood.route.js"

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//prefix routes
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/createFood", createFoodRouter);
app.use("/api/admin", adminRouter);
app.use("/api/location", locationRouter);


// global error handler
const errorHandler = (err, req, res, next) =>{
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message ||  "server Error",
        error: err.error || []
    })
}

export { app }
