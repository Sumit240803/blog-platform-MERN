import OTP from "../models/Otp.js"


const verifyOtp = async(email , otp)=>{
    const myOtp = await OTP.findOne({email : email});
    if(!myOtp){
        return false;
    }
    if(myOtp.expiry < Date.now()){
        return false;
    }
    if(myOtp.otp === otp){
        await OTP.deleteOne({email : email});
        return true;
        
    }else{
        return false;
    }
}

export default verifyOtp;