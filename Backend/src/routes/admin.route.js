import express from "express";
import { adminLogin, adminRegister, adminApprove } from "../controller/admin.controller.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.patch("/adminApprove/:id", adminApprove);

export default router;