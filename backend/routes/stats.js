const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/brand', statsController.getBrandStats);
router.get('/influencer', statsController.getInfluencerStats);

module.exports = router;
