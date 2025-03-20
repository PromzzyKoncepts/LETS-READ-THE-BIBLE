// models/ApprovedVideo.js
import mongoose from 'mongoose';

const approvedVideoSchema = new mongoose.Schema({
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

const ApprovedVideo = mongoose.models.ApprovedVideo || mongoose.model('ApprovedVideo', approvedVideoSchema);

export default ApprovedVideo;