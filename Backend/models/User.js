import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,  
      trim: true    
       
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure the email is unique
      lowercase: true, // Convert the email to lowercase before saving
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email'], // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      
    },
    blogs : [
      {
        blogId : {type : String},
        title : {type : String},
        views : {type : Number}
      }
    ]
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // If password isn't modified, skip hashing

  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();
  } catch (err) {
    next(err);  // If there's an error, pass it to the next middleware
  }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in other files
export default User;
