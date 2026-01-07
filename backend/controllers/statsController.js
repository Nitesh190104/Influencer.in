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
        const campaigns = await Campaign.find({ brandId: brandId })
            .populate({
                path: 'applications.influencer',
                select: 'name'
            });

        // Calculate total reach (sum of followers from all influencers who applied)
        let totalReach = 0;
        const appliedInfluencerIds = new Set();

        for (const campaign of campaigns) {
            if (campaign.applications && campaign.applications.length > 0) {
                for (const app of campaign.applications) {
                    if (app.influencer && app.influencer._id) {
                        appliedInfluencerIds.add(app.influencer._id.toString());
                    }
                }
            }
        }

        // Get follower counts for all unique influencers who applied
        if (appliedInfluencerIds.size > 0) {
            const influencers = await User.find({
                _id: { $in: Array.from(appliedInfluencerIds) }
            }).select('socialAccounts');

            for (const influencer of influencers) {
                if (influencer.socialAccounts && influencer.socialAccounts.length > 0) {
                    const followers = influencer.socialAccounts.reduce((sum, account) => {
                        return sum + (account.followers || 0);
                    }, 0);
                    totalReach += followers;
                }
            }
        }

        // Calculate budget spent (proportional per accepted influencer)
        let budgetSpent = 0;
        for (const campaign of campaigns) {
            if (campaign.applications && campaign.applications.length > 0) {
                const acceptedCount = campaign.applications.filter(app => app.status === 'accepted').length;
                if (acceptedCount > 0 && campaign.budget) {
                    // Divide budget proportionally among accepted influencers
                    budgetSpent += (campaign.budget / acceptedCount) * acceptedCount;
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

        // Get user's social accounts
        const user = await User.findById(influencerId).select('socialAccounts');

        const totalFollowers = user.socialAccounts?.reduce((sum, account) => {
            return sum + (account.followers || 0);
        }, 0) || 0;

        // Count campaigns applied to
        const campaignsApplied = await Campaign.countDocuments({
            'applications.influencer': influencerId
        });

        // Count accepted campaigns
        const acceptedCampaigns = await Campaign.countDocuments({
            'applications': {
                $elemMatch: {
                    influencer: influencerId,
                    status: 'accepted'
                }
            }
        });

        res.json({
            success: true,
            data: {
                totalFollowers,
                campaignsApplied,
                acceptedCampaigns,
                socialAccountsCount: user.socialAccounts?.length || 0
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
