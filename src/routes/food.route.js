import dotenv from "dotenv"
import express from "express"
import { createFood } from "../controller/food.controller.js";
import { authFoodPartnerMiddleware } from "../middleware/auth.middleware.js"

dotenv.config();

const router = express.Router();

import multer from "multer";

const upload = multer({ 
    storage: multer.memoryStorage()
 });

//ye route [protected] hoga iska liya ek middelware use krega
router.post ("/upload", authFoodPartnerMiddleware, upload.single("video"), createFood )


export default router;