import dotenv from "dotenv"
import express from "express"
import { createFood, getFoodItems } from "../controller/food.controller.js";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middleware/auth.middleware.js"

dotenv.config();

const router = express.Router();

import multer from "multer";

const upload = multer({ 
   dest: 'uploads/'
 });

//ye route [protected] hoga iska liya ek middelware use krega
router.post ("/upload", authFoodPartnerMiddleware, upload.single("file"), createFood )
router.get("/upload", authUserMiddleware, getFoodItems)

export default router;