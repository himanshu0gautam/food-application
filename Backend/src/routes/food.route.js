import dotenv from "dotenv"
import express from "express"
import { createFood, getFoodItems, likeFoodController, saveFood } from "../controller/food.controller.js";
import { authFoodPartnerMiddleware, authUserMiddleware, } from "../middleware/auth.middleware.js"

dotenv.config();

const router = express.Router();

import multer from "multer";

const upload = multer({ 
   dest: 'uploads/'
 });

//ye route [protected] hoga iska liya ek middelware use krega
// accept any single file field (more tolerant to client field names)
router.post ("/upload", authFoodPartnerMiddleware, upload.any(), createFood )
router.get("/upload", authUserMiddleware, getFoodItems)

// like 
router.post("/like", authUserMiddleware, likeFoodController)

router.post("/save", authUserMiddleware, saveFood)

export default router;