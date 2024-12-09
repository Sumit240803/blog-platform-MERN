import express from "express";
import Blog from "../models/Blog.js";
import verifyJwt from "../utils/isLogged.js";
import User from "../models/User.js";
import getTokenFromHeader from "../utils/getToken.js";
import getUser from "../utils/getLoggedUser.js";
import Category from "../models/Categories.js";
const router = express.Router();

//Route tested
router.post('/post',verifyJwt ,async (req, res) => {
    try {
       
      const { title, content, authorName, authorEmail, tags, isPublished,category } = req.body;
  
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
        category
      });
  
      // Save the blog to the database
      const savedBlog = await newBlog.save();
      const user = await User.findOne({ email : authorEmail});
      if(isPublished && user){
        user.published.push({blogId : savedBlog._id.toString(), title : savedBlog.title});
      }else{
        user.drafts.push({blogId : savedBlog._id.toString(),title : savedBlog.title});
      }
      
      await user.save();
      res.status(201).json({ message: 'Blog created successfully!', blog: savedBlog });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the blog.', error: error.message });
    }
  });

  //Route tested
  router.post("/publishDraft", verifyJwt, async (req, res) => {
    try {
      const { id } = req.body;
      
      const token = getTokenFromHeader(req);
      const user = getUser(token);
      
      // Find the author (user)
      const author = await User.findOne({ email: user.email });
      
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
  
      // Find the blog by id
      const blog = await Blog.findById(id);
      
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      // Mark the blog as published
      blog.isPublished = true;
      author.published.addToSet({blogId : id , title : blog.title });
      // Remove the blog from the author's drafts
      const draftIndex = author.drafts.findIndex(draft => draft.blogId.toString() === id);
      if (draftIndex !== -1) {
        author.drafts.pull(author.drafts[draftIndex]._id); // Remove the draft from drafts array
      }
  
      // Save both the blog and author
      await blog.save();
      await author.save();
  
      // Respond with a success message
      res.status(200).json({ message: "Draft published successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
/*router.delete("/delete/:id" , verifyJwt , async(req,res)=>{
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
})*/


//Route tested
router.delete("/deleteDraft/:id", verifyJwt, async (req, res) => {
  try {
    const id = req.params.id; // The blogId of the draft to delete

    // Get the token and user details
    const token = getTokenFromHeader(req);
    const user = getUser(token);

    // Find the author by email
    const author = await User.findOne({ email: user.email });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Find the blog by ID

    // Check if the blog is in the author's drafts
    const draftIndex = author.drafts.findIndex(draft => draft.blogId.toString() === id);
    if (draftIndex !== -1) {
      // Remove the draft from the author's drafts
      author.drafts.pull(author.drafts[draftIndex]._id);
      await author.save();
    }

    // Delete the blog from the database
    

    // Respond with success
    res.status(200).json({ message: "Draft deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



//Tested
router.get("/tags" , async(req,res)=>{
    try {
        const {tags} = req.query;
        const tagArray = tags.split(",");
        const blogs = await Blog.find({tags : {$in : tagArray}}).sort({updatedAt : -1});
        if(blogs.length > 0){
            return res.status(200).json({blogs : blogs , found : blogs.length});
        }else {
            return res.status(404).json({ message: "No blogs found with the specified tags." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error." });
    }
})
//Tested
router.get("/all" , async(req,res)=>{
    try {
        const {page = 1 , size = 10} = req.query;
        const pagesToSkip = (page-1)*size;

        const blogs = await Blog.find({isPublished : true}).skip(pagesToSkip).limit(size).sort({updatedAt : -1});
        const totalBlogs = await Blog.countDocuments({isPublished : true});

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
/*
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
*/
//Tested
router.post('/categories', async (req, res) => {
    try {
      const { category, tags } = req.body;
  
      // Validation
      if (!category) {
        return res.status(400).json({ message: 'Category is required' });
      }
  
      // Create and save the category
      const newCategory = new Category({
        category,
        tags,
      });
  
      const savedCategory = await newCategory.save();
  
      res.status(201).json({
        message: 'Category created successfully',
        data: savedCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating category',
        error: error.message,
      });
    }
  });

//Tested
router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find(); // Fetch all categories from the database
      res.status(200).json({
        message: 'Categories retrieved successfully',
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving categories',
        error: error.message,
      });
    }
});

router.get("/id",async(req,res)=>{
  try {
    const {id} = req.query;
    const blog = await Blog.findById(id);
    if(blog){
      res.status(200).json({blog : blog});
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving blog',
      error: error.message,
    });
  }
})

router.get("/title" , async(req,res)=>{
  try {
    const {title} = req.query;
    const blog = await Blog.findOne({title : title});
    if(blog){
      res.status(200).json({blog : blog});
    }
  } catch (error) {
    
  }
})

router.delete("/delete/:id", verifyJwt , async(req,res)=>{
  try {
    const id = req.params.id;
    const token = getTokenFromHeader(req);
    const user = getUser(token);
    const author = await User.findOne({email : user.email});
    if(author){
      const blogIndex = author.published.findIndex(blogs=> blogs.blogId.toString()===id);
      if(blogIndex!==-1){
        author.published.pull(author.published[blogIndex]._id);
      }
    }
    await Blog.findByIdAndDelete(id);
    await author.save();
    res.status(200).json({ message: "Draft deleted successfully" });
  } catch (error) {
    
  }
})

router.post("/saveDraft", verifyJwt , async(req,res)=>{
  try {
    const {id} = req.body;
    const token = getTokenFromHeader(req);
    const user = getUser(token);
    const author = await User.findOne({email : user.email});
    const blog = await Blog.findById(id);
    blog.isPublished = false;
    await blog.save();
    if(author){
      const blogIndex = author.published.findIndex(blogs=> blogs.blogId.toString()===id);
      if(blogIndex!==-1){
        author.published.pull(author.published[blogIndex]._id);
        author.drafts.push({blogId : id , title : blog.title});
        await author.save();
      }
    }
    res.status(200).json({ message: "Draft saved successfully" });
  } catch (error) {
    
  }
})

router.get("/blogCat", async(req,res)=>{
  try {
    const {category} = req.body;
    const blogs = await Blog.find({category});
    if(blogs){
      res.status(200).json(blogs);
    }
  } catch (error) {
    
  }
})
export default router;