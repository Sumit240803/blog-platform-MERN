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
      
      
  
      // Update the user's liked array
      const alreadyLiked = user.liked.some((likedBlog) => likedBlog.id === blog.id);
  
      if (!alreadyLiked) {
        user.liked.push({ id: blog.id,name : blog.title });
        blog.likes += 1;
        await user.save();
        await blog.save();
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
router.get("/likes" , verifyJwt , async(req,res)=>{
  try {
    const token = getTokenFromHeader(req);
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const user = await User.findOne({ email: decoded.email });
      if(user){
        return res.status(200).json({
          liked: user.liked,
        });
      }
  } catch (error) {
    
  }
})

router.post('/follow', verifyJwt, async (req, res) => {
  try {
    const { email } = req.body;  // Email of the user to follow
    const token = getTokenFromHeader(req);
  
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const currentUser = await User.findOne({ email: decoded.email });  // Assuming req.user is set after verifying token

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the current user is trying to follow themselves
    if (currentUser.email === email) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    // Find the target user by email
    const targetUser = await User.findOne({ email });
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current user is already following the target user
    const alreadyFollowing = currentUser.following.some(follow => follow.userId.toString() === targetUser._id.toString());
    if (alreadyFollowing) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    // Add to current user's following
    currentUser.following.push({ userId: targetUser._id });
    await currentUser.save();

    // Add to target user's followers
    targetUser.followers.push({ userId: currentUser._id });
    await targetUser.save();

    return res.status(200).json({ message: 'Followed successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Unfollow user route
router.post('/unfollow', verifyJwt, async (req, res) => {
  try {
    const { email } = req.body;  // Email of the user to unfollow
    const token = getTokenFromHeader(req);
  
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const currentUser = await User.findOne({ email: decoded.email });

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find the target user by email
    const targetUser = await User.findOne({ email });
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current user is following the target user
    const notFollowing = !currentUser.following.some(follow => follow.userId.toString() === targetUser._id.toString());
    if (notFollowing) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    // Remove from current user's following
    currentUser.following = currentUser.following.filter(follow => follow.userId.toString() !== targetUser._id.toString());
    await currentUser.save();

    // Remove from target user's followers
    targetUser.followers = targetUser.followers.filter(follow => follow.userId.toString() !== currentUser._id.toString());
    await targetUser.save();

    return res.status(200).json({ message: 'Unfollowed successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/followers', verifyJwt, async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
  
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const currentUser = await User.findOne({ email: decoded.email });  // Assuming req.user is set after verifying token

    // Fetch the users who are following the current user
    const followers = await User.find({ '_id': { $in: currentUser.followers.map(follow => follow.userId) } })
      .select('username email avatar');  // Select only necessary fields to return

    if (!followers) {
      return res.status(404).json({ message: 'No followers found' });
    }

    return res.status(200).json({ followers });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get current user's followings
router.get('/followings', verifyJwt, async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
  
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const decoded = getUser(token); // Assuming this decodes the token to get user info
      const currentUser = await User.findOne({ email: decoded.email });  // Assuming req.user is set after verifying token

    // Fetch the users whom the current user is following
    const followings = await User.find({ '_id': { $in: currentUser.following.map(follow => follow.userId) } })
      .select('username email avatar');  // Select only necessary fields to return

    if (!followings) {
      return res.status(404).json({ message: 'No followings found' });
    }

    return res.status(200).json({ followings });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;