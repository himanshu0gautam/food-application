import express from "express";
import { authFoodPartnerMiddleware, authUserMiddleware, } from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js";
import { createDish, getSaveFood } from "../controller/createFood.controller.js";

const router = express.Router();

router.post("/saveFood",
  authFoodPartnerMiddleware,upload.array("foodImage", 4), createDish);

router.get("/getsavefood", authFoodPartnerMiddleware, getSaveFood)

export default router;
