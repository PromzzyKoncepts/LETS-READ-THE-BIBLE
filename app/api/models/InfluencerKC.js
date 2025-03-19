import mongoose from 'mongoose';

const InfluencerKingsChatSchema = new mongoose.Schema({
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
  influencer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to avoid redefining it
const InfluencerKingsChat = mongoose.models.InfluencerKingsChat || mongoose.model('InfluencerKingsChat', InfluencerKingsChatSchema);

export default InfluencerKingsChat;