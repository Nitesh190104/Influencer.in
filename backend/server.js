const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://influencer-in.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/influencers', require('./routes/influencers'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/social-accounts', require('./routes/socialAccounts'));
app.use('/api/oauth-config', require('./routes/oauthConfig'));
app.use('/api/follow', require('./routes/follow'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/webhooks', require('./routes/webhooks'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Influencer Marketing Platform API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
