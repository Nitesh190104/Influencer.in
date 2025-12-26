const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
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
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Fashion', 'Travel', 'Food', 'Beauty', 'Fitness', 'Tech', 'Edutech', 'Parenting', 'Finance', 'Gaming']
  },
  followers: {
    type: Number,
    default: 0
  },
  engagement: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  profileImage: {
    type: String,
    default: ''
  },
  platforms: [{
    name: String,
    url: String,
    followers: Number
  }],
  averageViews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Influencer', influencerSchema);
