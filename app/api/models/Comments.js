import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;