//start server
import dotenv from "dotenv"
import connetDB from "./src/db/db.js"
import { app } from "./src/app.js";
import client from "./src/db/Redis.js"
import { socketServer } from "./src/services/Socket.io.js";
import http from "http"

dotenv.config({
    path: './.env'
})

const server = http.createServer(app)

// mongodb function call
connetDB();


server.listen(3000, () => {
    console.log(`📡 Server is running on http://localhost:3000`);
    socketServer(server);
})