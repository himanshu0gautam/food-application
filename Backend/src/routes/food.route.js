import dotenv from "dotenv"
import express from "express"
import { createFood, getFoodItems, getSaveFood, likeFoodController, saveFood, FoodCommnet, ReplyComment, getAllComments } from "../controller/food.controller.js";
import { authFoodPartnerMiddleware, authUserMiddleware, } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

dotenv.config();

const router = express.Router();

//ye route [protected] hoga iska liya ek middelware use krega
// accept any single file field (more tolerant to client field names)
router.post ("/upload", authFoodPartnerMiddleware, upload.any(), createFood )
router.get("/getvideo", authUserMiddleware, getFoodItems)

// like 
router.post("/like", authUserMiddleware, likeFoodController)
// save
router.post("/save", authUserMiddleware, saveFood)
router.get("/saveFood", authUserMiddleware, getSaveFood)
// comment
router.post("/user/comment",authUserMiddleware, FoodCommnet)
router.post("/user/replyComment/:commentId",authUserMiddleware, ReplyComment)
router.get("/user/:foodId", getAllComments)

export default router;