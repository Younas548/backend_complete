import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otpHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 5 min

export default mongoose.model("OTP", otpSchema);

