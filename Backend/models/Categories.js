import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String], // Array of strings
    default: [],    // Default value is an empty array
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Category = mongoose.model('Category', categorySchema);

export default Category;
