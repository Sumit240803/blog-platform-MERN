import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // Or phone number
    otp: { type: String, required: true },
    expiry: { type: Date, required: true }, // Expiry date of OTP
  },
  { timestamps: true }
);

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
