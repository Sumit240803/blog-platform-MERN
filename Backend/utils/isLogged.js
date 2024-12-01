import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const verifyJwt = (req, res, next) => {
 //   const SECRET_KEY = "5b4d3128577f6e9d3d180db42754615de3633de2ed7ddf995192fca3f63f077cd15139ce5507bee02216d94165b99b3b06a8f317023dab68334a40732140c6b590a944dfb0d67e41b33baf9b7f5aee50b706afd74edd3558d8c5ad628d475dde968ec92932264b8511925975a487ce8fa1fec751f9924fc3326171916186e33f2aba78f22e0c993e614320e0be92943f0156969a41c319eeea407ed7d506e571969df09466c414eb240808e2a1507e3e45313d778e1ba05e61cace45a89ba38c8a5a1acd5bc558d3591c8a6701b0b7e12b0274f85a12e169a54c176057c1d58d05716b8333a6154b246825ffa624f90027d2fe829bcbf1e1838049bbf64a331e";
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Authorization" header
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      // Verify token using the secret key
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded; // Attach decoded token payload to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.', error: error.message });
    }
  };
export default verifyJwt;