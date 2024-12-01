import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
// Secret key to sign the JWT (should be stored securely in environment variables)
//const SECRET_KEY = '5b4d3128577f6e9d3d180db42754615de3633de2ed7ddf995192fca3f63f077cd15139ce5507bee02216d94165b99b3b06a8f317023dab68334a40732140c6b590a944dfb0d67e41b33baf9b7f5aee50b706afd74edd3558d8c5ad628d475dde968ec92932264b8511925975a487ce8fa1fec751f9924fc3326171916186e33f2aba78f22e0c993e614320e0be92943f0156969a41c319eeea407ed7d506e571969df09466c414eb240808e2a1507e3e45313d778e1ba05e61cace45a89ba38c8a5a1acd5bc558d3591c8a6701b0b7e12b0274f85a12e169a54c176057c1d58d05716b8333a6154b246825ffa624f90027d2fe829bcbf1e1838049bbf64a331e';  // Replace with your actual secret key

// Function to generate a JWT token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });  // Token expires in 1 hour
};

// Function to verify a JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
