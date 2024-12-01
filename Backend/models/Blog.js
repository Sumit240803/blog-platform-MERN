import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
    trim: true,
  },
  authorEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please provide a valid email address'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      postedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
