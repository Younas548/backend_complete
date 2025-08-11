import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import { sendOtpLimiter, verifyOtpLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/send-otp", sendOtpLimiter, sendOtp);
router.post("/verify-otp", verifyOtpLimiter, verifyOtp);

export default router;
