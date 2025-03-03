// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  kid_fullname: {
    type: String,
    required: true,
  },
  parent_fullname: {
    type: String,
    required: false,
  },
  book: {
    type: String,
    required: true,
  },
  chapter_start: {
    type: Number,
    required: true,
  },
  chapter_end: {
    type: Number,
    required: false,
  },
  video_url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;