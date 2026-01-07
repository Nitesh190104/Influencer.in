const Campaign = require('../models/Campaign');
const User = require('../models/User');

// Get all campaigns (for influencers - only active campaigns)
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: 'active' })
      .populate('brandId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    console.error('Get campaigns error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns',
      error: error.message
    });
  }
};

// Get campaigns by brand (for brand dashboard)
exports.getBrandCampaigns = async (req, res) => {
  try {
    const brandId = req.user.id;
    
    const campaigns = await Campaign.find({ brandId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    console.error('Get brand campaigns error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch brand campaigns',
      error: error.message
    });
  }
};

// Get single campaign
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('brandId', 'name email')
      .populate('applicants.influencerId', 'name email');
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    console.error('Get campaign error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign',
      error: error.message
    });
  }
};

// Create campaign (brands only)
exports.createCampaign = async (req, res) => {
  try {
    console.log('Create campaign request:', {
      user: req.user,
      body: req.body
    });

    const brandId = req.user.id || req.user._id;
    const brandName = req.user.name;
    
    // Verify user is a brand
    if (req.user.userType !== 'brand') {
      return res.status(403).json({
        success: false,
        message: 'Only brands can create campaigns'
      });
    }
    
    // Validate required fields
    if (!req.body.title || !req.body.description || !req.body.category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, description, and category are required'
      });
    }

    const campaignData = {
      ...req.body,
      brandId,
      brandName,
      minFollowers: req.body.minFollowers || 0,
      maxApplicants: req.body.maxApplicants || 10
    };
    
    console.log('Creating campaign with data:', campaignData);
    
    const campaign = new Campaign(campaignData);
    await campaign.save();
    
    console.log('Campaign created successfully:', campaign._id);
    
    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create campaign',
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : undefined
    });
  }
};

// Update campaign (brands only - their own campaigns)
exports.updateCampaign = async (req, res) => {
  try {
    const brandId = req.user.id;
    const campaignId = req.params.id;
    
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Check if the brand owns this campaign
    if (campaign.brandId.toString() !== brandId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own campaigns'
      });
    }
    
    // Update campaign
    Object.assign(campaign, req.body);
    await campaign.save();
    
    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign
    });
  } catch (error) {
    console.error('Update campaign error:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to update campaign',
      error: error.message
    });
  }
};

// Delete campaign (brands only - their own campaigns)
exports.deleteCampaign = async (req, res) => {
  try {
    const brandId = req.user.id;
    const campaignId = req.params.id;
    
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Check if the brand owns this campaign (convert both to strings for comparison)
    const campaignBrandId = campaign.brandId.toString();
    const requestBrandId = brandId.toString();
    
    console.log('Delete campaign - Campaign Brand ID:', campaignBrandId);
    console.log('Delete campaign - Request Brand ID:', requestBrandId);
    
    if (campaignBrandId !== requestBrandId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own campaigns'
      });
    }
    
    await Campaign.findByIdAndDelete(campaignId);
    
    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('Delete campaign error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete campaign',
      error: error.message
    });
  }
};

// Apply to campaign (influencers only)
exports.applyToCampaign = async (req, res) => {
  try {
    const influencerId = req.user.id;
    const influencerName = req.user.name;
    const campaignId = req.params.id;
    const { followers } = req.body;
    
    // Verify user is an influencer
    if (req.user.userType !== 'influencer') {
      return res.status(403).json({
        success: false,
        message: 'Only influencers can apply to campaigns'
      });
    }
    
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Check if campaign is active
    if (campaign.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This campaign is not accepting applications'
      });
    }
    
    // Check if already applied
    const hasApplied = campaign.applicants.some(
      app => app.influencerId.toString() === influencerId
    );
    
    if (hasApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this campaign'
      });
    }
    
    // Check if max applicants reached
    if (campaign.applicants.length >= campaign.maxApplicants) {
      return res.status(400).json({
        success: false,
        message: 'This campaign has reached maximum applicants'
      });
    }
    
    // Check minimum followers requirement
    if (followers < campaign.minFollowers) {
      return res.status(400).json({
        success: false,
        message: `You need at least ${campaign.minFollowers} followers to apply`
      });
    }
    
    // Add applicant
    campaign.applicants.push({
      influencerId,
      influencerName,
      followers,
      status: 'pending'
    });
    
    await campaign.save();
    
    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: campaign
    });
  } catch (error) {
    console.error('Apply to campaign error:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to apply to campaign',
      error: error.message
    });
  }
};

// Update applicant status (brands only)
exports.updateApplicantStatus = async (req, res) => {
  try {
    const brandId = req.user.id;
    const brandUser = req.user;
    const { campaignId, applicantId } = req.params;
    const { status } = req.body;
    
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    // Check if the brand owns this campaign - convert both to strings for comparison
    const campaignBrandId = campaign.brandId.toString();
    const requestBrandId = brandId.toString();
    
    if (campaignBrandId !== requestBrandId) {
      console.log('Update status denied - Brand mismatch:', campaignBrandId, '!==', requestBrandId);
      return res.status(403).json({
        success: false,
        message: 'You can only manage your own campaigns'
      });
    }
    
    // Find and update applicant
    const applicant = campaign.applicants.id(applicantId);
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }
    
    applicant.status = status;
    await campaign.save();
    
    // Send notification to influencer if accepted
    if (status === 'accepted') {
      const Notification = require('../models/Notification');
      
      await Notification.create({
        user: applicant.influencerId,
        from: brandId,
        type: 'campaign_accepted',
        title: 'Campaign Application Accepted!',
        message: `Congratulations! ${brandUser.name} has selected you for the campaign "${campaign.title}". You can now message them directly.`,
        relatedId: campaign._id,
        relatedType: 'campaign'
      });
    }
    
    res.json({
      success: true,
      message: 'Applicant status updated successfully',
      data: campaign
    });
  } catch (error) {
    console.error('Update applicant status error:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to update applicant status',
      error: error.message
    });
  }
};

// Get campaign applicants (brands only)
exports.getCampaignApplicants = async (req, res) => {
  try {
    const brandId = req.user.id;
    const { campaignId } = req.params;
    
    console.log('Fetching applicants for campaign:', campaignId);
    console.log('Brand ID from req.user:', brandId);
    console.log('Brand ID type:', typeof brandId);
    
    const campaign = await Campaign.findById(campaignId)
      .populate('applicants.influencerId', 'name email bio avatarColor avatarIcon');
    
    if (!campaign) {
      console.log('Campaign not found');
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    console.log('Campaign found:', campaign.title);
    console.log('Campaign brandId:', campaign.brandId);
    console.log('Campaign brandId type:', typeof campaign.brandId);
    console.log('Campaign brandId toString:', campaign.brandId.toString());
    console.log('Number of applicants:', campaign.applicants.length);
    
    // Check if the brand owns this campaign - convert both to strings for comparison
    const campaignBrandId = campaign.brandId.toString();
    const requestBrandId = brandId.toString();
    
    console.log('Comparing:', campaignBrandId, '===', requestBrandId);
    console.log('Match:', campaignBrandId === requestBrandId);
    
    if (campaignBrandId !== requestBrandId) {
      console.log('Brand does not own this campaign');
      return res.status(403).json({
        success: false,
        message: 'You can only view applicants for your own campaigns',
        debug: {
          campaignBrandId,
          requestBrandId,
          match: campaignBrandId === requestBrandId
        }
      });
    }
    
    console.log('Access granted - returning applicants');
    
    res.json({
      success: true,
      data: {
        campaign: {
          _id: campaign._id,
          title: campaign.title,
          description: campaign.description
        },
        applicants: campaign.applicants
      }
    });
  } catch (error) {
    console.error('Get campaign applicants error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applicants',
      error: error.message
    });
  }
};
