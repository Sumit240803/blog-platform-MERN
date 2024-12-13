import express from "express";
import verifyJwt from "../utils/isLogged.js";
import User from "../models/User.js";
import getTokenFromHeader from "../utils/getToken.js";
import getUser from "../utils/getLoggedUser.js";
import Blog from "../models/Blog.js";
const router = express.Router();

//Tested
router.get("/userInfo" , verifyJwt , async(req , res)=>{
    const token = getTokenFromHeader(req);
    if(token){
        const decoded = getUser(token);
        const user = await User.findOne({email : decoded.email}).select(["-password" , "-blogs","-createdAt" , "-updatedAt"]);
        if(user){
            res.status(201).json({username : user.username , email : user.email , followers : user.followers.length , following : user.following.length , totalDrafts : user.drafts.length , blogsPublished : user.published.length, revenue : user.revenue,bio : user.bio , role : user.role });
        }
        
    }
    
    
})

//Tested
router.get("/drafts", verifyJwt, async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        if (token) {
            const decoded = getUser(token); // Assuming this decodes the token to get user info
            const user = await User.findOne({ email: decoded.email })

            if (user) {
                // Filter blogs where isPublished is false
                

                res.status(200).json({ drafts : user.drafts });
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
//Tested
router.get("/published", verifyJwt, async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        if (token) {
            const decoded = getUser(token); // Assuming this decodes the token to get user info
            const user = await User.findOne({ email: decoded.email });

            if (user) {
                // Filter blogs where isPublished is false
                

                res.status(200).json({ drafts : user.published });
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

router.post("/like", verifyJwt, async (req, res) => {
    try {
      const { blogId } = req.body;
      const token = getTokenFromHeader(req);
  
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const user = await User.findOne({ email: decoded.email });
      const blog = await Blog.findById(blogId);
  
      if (!user || !blog) {
        return res.status(404).json({ message: "User or Blog not found" });
      }
  
      // Increment the blog's like count
      blog.likes += 1;
      await blog.save();
  
      // Update the user's liked array
      const alreadyLiked = user.liked.some((likedBlog) => likedBlog.id === blog.id);
  
      if (!alreadyLiked) {
        user.liked.push({ id: blog.id,name : blog.title });
        await user.save();
      }
  
      res.status(200).json({
        message: "Like added successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/unlike", verifyJwt, async (req, res) => {
    try {
      const { blogId } = req.body;
      const token = getTokenFromHeader(req);
  
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const user = await User.findOne({ email: decoded.email });
      const blog = await Blog.findById(blogId);
  
      if (!user || !blog) {
        return res.status(404).json({ message: "User or Blog not found" });
      }
  
      // Check if the user has liked the blog
      const blogIndex = user.liked.findIndex((likedBlog) => likedBlog.id === blog.id);
      if (blogIndex === -1) {
        return res.status(400).json({ message: "Blog not liked by the user" });
      }
  
      // Decrement the blog's like count (ensure it doesn't go below 0)
      blog.likes = Math.max(blog.likes - 1, 0);
      await blog.save();
  
      // Remove the blog from the user's liked array
      user.liked.splice(blogIndex, 1);
      await user.save();
  
      res.status(200).json({
        message: "Like removed successfully",
        likes: blog.likes,
        likedBlogs: user.liked,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

export default router;