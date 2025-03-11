import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  kingsChatHandle: {
    type: String,
    required: false,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to avoid redefining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;