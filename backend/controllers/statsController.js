const Campaign = require('../models/Campaign');
const Follow = require('../models/Follow');
const User = require('../models/User');

// Get brand dashboard stats
exports.getBrandStats = async (req, res) => {
    try {
        const brandId = req.user.id;

        // Active campaigns count
        const activeCampaigns = await Campaign.countDocuments({
            brandId: brandId,
            status: { $in: ['active', 'draft'] }
        });

        console.log('Brand ID:', brandId);
        console.log('Active Campaigns:', activeCampaigns);

        // Influencers count (count influencers the brand is following)
        const influencersCount = await Follow.countDocuments({
            follower: brandId,
            status: 'accepted'
        });

        console.log('Influencers Count:', influencersCount);

        // Get all campaigns for this brand
        const campaigns = await Campaign.find({ brandId: brandId });

        // Calculate total reach (sum of website followers from all influencers who applied)
        let totalReach = 0;
        const appliedInfluencerIds = new Set();

        for (const campaign of campaigns) {
            if (campaign.applicants && campaign.applicants.length > 0) {
                for (const applicant of campaign.applicants) {
                    if (applicant.influencerId) {
                        appliedInfluencerIds.add(applicant.influencerId.toString());
                    }
                }
            }
        }

        // Get follower counts for all unique influencers who applied
        if (appliedInfluencerIds.size > 0) {
            for (const influencerId of appliedInfluencerIds) {
                const followerCount = await Follow.countDocuments({
                    following: influencerId,
                    status: 'accepted'
                });
                totalReach += followerCount;
            }
        }

        // Calculate budget spent (sum of budgets from campaigns with accepted applicants)
        let budgetSpent = 0;
        for (const campaign of campaigns) {
            if (campaign.applicants && campaign.applicants.length > 0) {
                const hasAccepted = campaign.applicants.some(app => app.status === 'accepted');
                if (hasAccepted && campaign.budget) {
                    budgetSpent += campaign.budget;
                }
            }
        }

        console.log('Total Reach:', totalReach);
        console.log('Budget Spent:', budgetSpent);

        const statsData = {
            activeCampaigns: activeCampaigns || 0,
            influencersCount: influencersCount || 0,
            totalReach: totalReach || 0,
            budgetSpent: Math.round(budgetSpent) || 0
        };

        console.log('Returning stats:', statsData);

        res.json({
            success: true,
            data: statsData
        });
    } catch (error) {
        console.error('Get brand stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch brand stats',
            error: error.message
        });
    }
};

// Get influencer dashboard stats
exports.getInfluencerStats = async (req, res) => {
    try {
        const influencerId = req.user.id;

        // Active Campaigns: Total number of all available campaigns
        const activeCampaigns = await Campaign.countDocuments({
            status: 'active'
        });

        // Collaborations: Campaigns where influencer is accepted
        const collaborations = await Campaign.countDocuments({
            'applicants': {
                $elemMatch: {
                    influencerId: influencerId,
                    status: 'accepted'
                }
            }
        });

        // Total Followers: Users following this influencer on the website
        const totalFollowers = await Follow.countDocuments({
            following: influencerId,
            status: 'accepted'
        });

        // Earnings: Sum of budgets from campaigns where influencer is accepted
        const acceptedCampaigns = await Campaign.find({
            'applicants': {
                $elemMatch: {
                    influencerId: influencerId,
                    status: 'accepted'
                }
            }
        }).select('budget');

        const earnings = acceptedCampaigns.reduce((sum, campaign) => {
            return sum + (campaign.budget || 0);
        }, 0);

        res.json({
            success: true,
            data: {
                activeCampaigns,
                collaborations,
                totalFollowers,
                earnings: Math.round(earnings)
            }
        });
    } catch (error) {
        console.error('Get influencer stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch influencer stats',
            error: error.message
        });
    }
};
