const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Fashion', 'Travel', 'Food', 'Beauty', 'Fitness', 'Tech', 'Gaming', 'Finance', 'Parenting', 'Comedy', 'Other']
  },
  minFollowers: {
    type: Number,
    required: true,
    default: 0
  },
  maxApplicants: {
    type: Number,
    required: true,
    default: 10
  },
  budget: {
    type: Number
  },
  thumbnail: {
    type: String
  },
  requirements: {
    type: [String],
    default: []
  },
  deliverables: {
    type: [String],
    default: []
  },
  platforms: {
    type: [String],
    enum: ['instagram', 'facebook', 'youtube', 'tiktok', 'twitter'],
    default: []
  },
  applicants: [{
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    influencerName: String,
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    followers: Number
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
campaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema);
