import express from "express";
import { authFoodPartnerMiddleware, authUserMiddleware, } from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js";
import { createDish } from "../controller/createFood.controller.js";

const router = express.Router();

router.post("/saveFood",
  authFoodPartnerMiddleware,
  upload.fields([
    {
        name: "foodImage",
        maxCount: 5
    },
    {
        name: "SubImage",
        maxCount: 2
    }
  ]),
  createDish,
);

export default router;
