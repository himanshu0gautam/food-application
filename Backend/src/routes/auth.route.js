import express from "express"
import { registerUser, loginUser, logoutUser,
     registerPartner, loginfoodPartner, logoutFoodPartner, foodPartnerProfile } from "../controller/auth.controller.js";

const router = express.Router();

//user auth api
router.post("/user/register", registerUser )
router.post("/user/login", loginUser )
router.get("/user/logout", logoutUser)

//foodpartner auth api
router.post("/food-Partner/register", registerPartner )
router.post("/food-Partner/login", loginfoodPartner )
router.get("/food-partner/profile", foodPartnerProfile )
router.get("/food-Partner/logout", logoutFoodPartner )


export default router;