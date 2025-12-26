const express = require('express');
const router = express.Router();
const Influencer = require('../models/Influencer');

// Get all influencers
router.get('/', async (req, res) => {
  try {
    const { category, location, minFollowers } = req.query;
    let query = {};

    if (category) query.category = category;
    if (location) query.location = new RegExp(location, 'i');
    if (minFollowers) query.followers = { $gte: parseInt(minFollowers) };

    const influencers = await Influencer.find(query).sort({ followers: -1 });
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single influencer
router.get('/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create influencer
router.post('/', async (req, res) => {
  const influencer = new Influencer(req.body);
  try {
    const newInfluencer = await influencer.save();
    res.status(201).json(newInfluencer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update influencer
router.put('/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(influencer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete influencer
router.delete('/:id', async (req, res) => {
  try {
    await Influencer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Influencer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
