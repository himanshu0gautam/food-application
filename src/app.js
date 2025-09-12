//create server
import express from "express";
import cookieParser from "cookie-parser"; 
import authRouter from "./routes/auth.route.js";  
import foodRouter from "./routes/food.route.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use (cors({
//     origin: 'http://localhost:5173',
//     method: "GET,POST",
//     credentials: true
// }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//prefix routes
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);



export { app }
