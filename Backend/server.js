//start server
import dotenv from "dotenv"
import connetDB from "./src/db/db.js"
import { app } from "./src/app.js";

dotenv.config({
    path: './.env'
})

// mongodb function call
connetDB();




app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})