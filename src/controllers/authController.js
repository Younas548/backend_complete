import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.model.js";
// import User from "../models/User.js"; // Uncomment if using User model
import generateOtp from "../utils/generateOtp.js";
import { normalizePhone } from "../utils/phoneFormatter.js";

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const e164 = normalizePhone(phone); // Convert to +92300 format
  if (!e164) return res.status(400).json({ error: "Invalid phone number" });

  const otp = generateOtp(); // Generate random OTP
  const otpHash = await bcrypt.hash(otp, 10);

  // Remove any old OTP for same number
  await Otp.deleteMany({ phone: e164 });

  // Save OTP hash in DB
  await new Otp({ phone: e164, otpHash }).save();

  try {
    // Send OTP via Textbelt
    const resp = await axios.post("https://textbelt.com/text", {
      phone: e164,
      message: `Zoomigo verification code: ${otp}. Expires in 5 minutes.`,
      key: process.env.TEXTBELT_API_KEY // ✅ using .env variable
    });

    if (resp.data.success) {
      return res.json({
        success: true,
        message: "OTP sent successfully",
        otp: otp // ⚠ Only for testing; remove in production
      });
    } else {
      return res.status(500).json({
        error: "Failed to send OTP",
        details: resp.data
      });
    }
  } catch (err) {
    console.error("OTP API Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "SMS sending error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const e164 = normalizePhone(phone);
  if (!e164) return res.status(400).json({ error: "Invalid phone number" });

  const otpDoc = await Otp.findOne({ phone: e164 }).sort({ createdAt: -1 });
  if (!otpDoc) return res.status(400).json({ error: "OTP expired or not found" });

  if (otpDoc.attempts >= 5) return res.status(429).json({ error: "Too many attempts" });

  const match = await bcrypt.compare(otp, otpDoc.otpHash);
  if (!match) {
    otpDoc.attempts += 1;
    await otpDoc.save();
    return res.status(400).json({ error: "Invalid OTP" });
  }

  let user = await User.findOneAndUpdate(
    { phone: e164 },
    { $set: { isVerified: true } },
    { upsert: true, new: true }
  );

  await Otp.deleteMany({ phone: e164 });

  const token = jwt.sign(
    { id: user._id, phone: user.phone },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return res.json({ success: true, token, user: { phone: user.phone } });
};
