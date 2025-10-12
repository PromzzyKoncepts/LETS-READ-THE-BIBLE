import mongoose from 'mongoose';

const KingsChatUserSchema = new mongoose.Schema({
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
const KingsChatUser = mongoose.models.KingsChatUser || mongoose.model('KingsChatUser', KingsChatUserSchema);

export default KingsChatUser;