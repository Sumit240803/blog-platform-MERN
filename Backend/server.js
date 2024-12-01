import express from "express";
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/blog_platform").then(()=> console.log("Mongo DB"));
app.use("/api/auth" ,authRoutes);
app.use("/api/blogs" , blogRoutes);

const PORT = process.env.PORT || 5000 ; 
app.listen(PORT , ()=>{
    console.log("Server Started");
})