const mongoose = require('mongoose');

const oauthConfigSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true,
    enum: ['instagram', 'facebook', 'youtube']
  },
  clientId: {
    type: String,
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  },
  redirectUri: {
    type: String,
    required: true
  },
  isConfigured: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OAuthConfig', oauthConfigSchema);
