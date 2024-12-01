import express from "express";
import Blog from "../models/Blog.js";
import verifyJwt from "../utils/isLogged.js";
import User from "../models/User.js";
import getTokenFromHeader from "../utils/getToken.js";
import getUser from "../utils/getLoggedUser.js";
const router = express.Router();

router.post('/post',verifyJwt ,async (req, res) => {
    try {
       
      const { title, content, authorName, authorEmail, tags, isPublished } = req.body;
  
      // Validate required fields
      if (!title || !content || !authorName || !authorEmail) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
      }
  
      // Create a new blog document
      const newBlog = new Blog({
        title,
        content,
        authorName,
        authorEmail,
        tags,
        isPublished,
      });
  
      // Save the blog to the database
      const savedBlog = await newBlog.save();
      const user = await User.findOne({ email : authorEmail});
      if(user){
        user.blogs.push({
            blogId : savedBlog._id.toString(),
            title : savedBlog.title,
            views : 0
        })
      }else{
        return res.status(404).json({message : "User must be registered to post the blog"})
      }
      await user.save();
      res.status(201).json({ message: 'Blog created successfully!', blog: savedBlog });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the blog.', error: error.message });
    }
  });
router.delete("/delete/:id" , verifyJwt , async(req,res)=>{
    try {
        const id = req.params.id;
        const token = getTokenFromHeader(req);
        const user = getUser(token);
        const loggedUser =await User.findById(user.id);
        const blogToDelete = await Blog.findById(id);
        if(loggedUser && blogToDelete){
            const index = loggedUser.blogs.findIndex(blog => blog.blogId === id);
            if(index!==-1){
                loggedUser.blogs.splice(index , 1);
                await Blog.deleteOne({_id : id});
                await loggedUser.save();
                return res.status(200).json({ message: "Blog deleted successfully." });
            }else{
                return res.status(404).json({ message: "Blog not found." });
            }
        }else{
            return res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
})

router.get("/tags" , async(req,res)=>{
    try {
        const {tags} = req.query;
        const tagArray = tags.split(",");
        const blogs = await Blog.find({tags : {$in : tagArray}}).sort({updatedAt : -1});
        if(blogs.length > 0){
            return res.status(200).json(blogs);
        }else {
            return res.status(404).json({ message: "No blogs found with the specified tags." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error." });
    }
})

router.get("/all" , async(req,res)=>{
    try {
        const {page = 1 , size = 10} = req.query;
        const pagesToSkip = (page-1)*size;

        const blogs = await Blog.find().skip(pagesToSkip).limit(size).sort({updatedAt : -1});
        const totalBlogs = await Blog.countDocuments();

        const totalPages = Math.ceil(totalBlogs/size);
        if(blogs.length > 0){
            return res.status(200).json({blogs : blogs , totalPages : totalPages , totalBlogs : totalBlogs , currentPage : page , pageSize : size});
        }else {
            return res.status(404).json({ message: "No blogs found with the specified tags." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error." });
    }
})

router.patch("/edit/:id" , verifyJwt , async(req,res)=>{
    try {
        const blogId =  req.params.id;
        const data = req.body;
        const updated = await Blog.findByIdAndUpdate(blogId , data , { new : true});
        if (!updated) {
            return res.status(404).json({ message: 'Blog not found' });
          }
      
        return res.json(updated);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error updating blog', error });
    }
})

export default router;