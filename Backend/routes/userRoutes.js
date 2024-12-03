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
        const user = await User.findOne({email : decoded.email}).select("blogs");
        if(user){
            res.status(201).json({user : user});
        }
        
    }
})

router.get("/drafts", verifyJwt, async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        if (token) {
            const decoded = getUser(token); // Assuming this decodes the token to get user info
            const user = await User.findOne({ email: decoded.email }).select("blogs");

            if (user) {
                // Filter blogs where isPublished is false
                const drafts = user.blogs.filter(blog => !blog.isPublished);

                res.status(200).json({ drafts : drafts });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error fetching drafts:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/published", verifyJwt, async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        if (token) {
            const decoded = getUser(token); // Assuming this decodes the token to get user info
            const user = await User.findOne({ email: decoded.email }).select("blogs");

            if (user) {
                // Filter blogs where isPublished is false
                const drafts = user.blogs.filter(blog => blog.isPublished);

                res.status(200).json({ drafts : drafts });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error fetching drafts:", error);
        res.status(500).json({ message: "Server error" });
    }
});


export default router;