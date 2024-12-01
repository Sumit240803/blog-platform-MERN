import crypto from "crypto";
import OTP from "../models/Otp.js";

const genOtp = async(email)=>{
    const otp = crypto.randomInt(100000, 900000);
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    const newOtp = new OTP({
        email : email,
        otp : otp,
        expiry : expiry
    })
    try {
        await newOtp.save();
        console.log(`otp for email ${email} is ${otp}`);
        return otp;
    } catch (error) {
        console.error('Error saving OTP:', error);
    }
    
}
export default genOtp;