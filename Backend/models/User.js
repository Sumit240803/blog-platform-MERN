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
      unique: true,  
      lowercase: true,
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Blogger', 'Reader'], // Restrict roles to Blogger and Reader
      default: 'Reader',          // Default role is Reader
    },
    published: [
      {
        blogId: { type: String },
        title: { type: String },
      }
    ],
    liked: [
      {
        id: { type: String },
        name : {type : String}
      }
    ],
    drafts: [
      {
        blogId: { type: String },
        title: { type: String },
      }
    ],
    followers: [
      {
        userId: { type: String },
      }
    ],
    following: [
      {
        userId: { type: String },
      }
    ],
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    revenue: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in other files
export default User;
