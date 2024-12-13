import express from "express";
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DB_DEV).then(()=> console.log("Mongo DB"));
app.use("/api/auth" ,authRoutes);
app.use("/api/blogs" , blogRoutes);
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000 ; 
app.listen(PORT , ()=>{
    console.log("Server Started");
})