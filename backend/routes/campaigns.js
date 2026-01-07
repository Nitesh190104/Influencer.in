const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const campaignController = require('../controllers/campaignController');

// Public routes (no auth required)
router.get('/public', campaignController.getAllCampaigns);

// Protected routes (require authentication)
router.use(authMiddleware);

// Get campaigns
router.get('/', campaignController.getAllCampaigns);
router.get('/brand/my-campaigns', campaignController.getBrandCampaigns);
router.get('/:id', campaignController.getCampaign);

// Campaign CRUD (brands only)
router.post('/', campaignController.createCampaign);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);

// Apply to campaign (influencers only)
router.post('/:id/apply', campaignController.applyToCampaign);
// Get campaign applicants (brands only)
router.get('/:campaignId/applicants', campaignController.getCampaignApplicants);
// Manage applicants (brands only)
router.put('/:campaignId/applicants/:applicantId', campaignController.updateApplicantStatus);

module.exports = router;
