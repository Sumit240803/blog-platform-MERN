import express from "express";
import verifyJwt from "../utils/isLogged.js";
import User from "../models/User.js";
import getTokenFromHeader from "../utils/getToken.js";
import getUser from "../utils/getLoggedUser.js";
const router = express.Router();


router.get("/userInfo" , verifyJwt , async(req , res)=>{
    const token = getTokenFromHeader(req);
    if(token){
        const decoded = getUser(token);
        const user = await User.findOne({email : decoded.email}).select(["-password" , "-blogs","-createdAt" , "-updatedAt"]);
        if(user){
            res.status(201).json({user : user});
        }
        
    }
    
    
})

router.get("/myBlogs" , verifyJwt , async(req,res)=>{
    const token = getTokenFromHeader(req);
    if(token){
        const decoded = getUser(token);
        const user = await User.findOne({email : decoded.email}).select( "blogs");
        if(user){
            res.status(201).json({user : user});
        }
        
    }
})

export default router;