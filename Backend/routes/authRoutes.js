import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { generateToken } from '../utils/jwtUtil.js';
import genOtp from '../utils/genOtp.js';
import sendMail from '../utils/emailService.js';
import verifyOtp from '../utils/verifyOtp.js';
const router = express.Router();

// Example route for user registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
  
      // Create and save the new user
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

// Example route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
     // console.log(user);
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
     // console.log(isMatch);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }
  
      // Generate JWT token after successful login
      const token = generateToken(user);
     // console.log(token);
      // Send the token back to the client
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Server error');
    }
  });

router.post("/sendOtp" , async(req,res)=>{
  try {
    const {email} = req.body;
    const otp =await genOtp(email);
    sendMail(email , otp);
   // console.log(otp);
    res.status(200).json(otp);
  } catch (error) {
    console.log(error);
  }
})

router.post("/verify" , async(req,res)=>{
  try {
    const {email , otp} = req.body;
    const user = await User.findOne({email : email});
    if(verifyOtp(email , otp)){
      const token = generateToken(user);
      res.status(200).json({token : token});
    }else{
      res.status(201).json({message : "Invalid Otp"});
    };
  } catch (error) {
    console.log(error);
  }
})
// Example route for user logout


// Export the router so it can be imported in the main file (server.js)
export default router;
