import mongoose from 'mongoose';

const InfluencerUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    
  },
  fullName: {
    type: String,
    required: true,
    unique: true
  },
  influencerId: {
    type: String,
    required: false
  },
  kingsChatHandle: {
    type: String,
    required: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to avoid redefining it
const InfluencerUser = mongoose.models.InfluencerUser || mongoose.model('InfluencerUser', InfluencerUserSchema);

export default InfluencerUser;