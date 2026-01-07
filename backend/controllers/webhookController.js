const SocialAccount = require('../models/SocialAccount');

// Phyllo webhook handler
exports.handlePhylloWebhook = async (req, res) => {
    try {
        const event = req.body;
        console.log('[Webhook] Received Phyllo webhook:', event.type);
        console.log('[Webhook] Event data:', JSON.stringify(event, null, 2));

        // Acknowledge receipt immediately
        res.status(200).json({ received: true });

        // Process webhook asynchronously
        processPhylloWebhook(event).catch(err => {
            console.error('[Webhook] Error processing webhook:', err);
        });
    } catch (error) {
        console.error('[Webhook] Error handling webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

// Process Phyllo webhook events
async function processPhylloWebhook(event) {
    const { type, data } = event;

    switch (type) {
        case 'PROFILE.ADDED':
        case 'PROFILE.UPDATED':
            await handleProfileUpdate(data);
            break;

        case 'AUDIENCE.ADDED':
        case 'AUDIENCE.UPDATED':
            await handleAudienceUpdate(data);
            break;

        case 'CONTENT.ADDED':
        case 'CONTENT.UPDATED':
            await handleContentUpdate(data);
            break;

        case 'ACCOUNT.CONNECTED':
            await handleAccountConnected(data);
            break;

        case 'ACCOUNT.DISCONNECTED':
            await handleAccountDisconnected(data);
            break;

        default:
            console.log(`[Webhook] Unhandled event type: ${type}`);
    }
}

// Handle profile updates (subscriber count, bio, etc.)
async function handleProfileUpdate(data) {
    try {
        console.log('[Webhook] Processing profile update for account:', data.account_id);

        const account = await SocialAccount.findOne({ phylloAccountId: data.account_id });
        if (!account) {
            console.warn('[Webhook] Account not found:', data.account_id);
            return;
        }

        // Update profile data
        account.metadata = {
            ...account.metadata,
            fullName: data.full_name || account.metadata?.fullName,
            bio: data.bio || account.metadata?.bio,
            profilePicture: data.profile_pic_url || account.metadata?.profilePicture,
            isVerified: data.is_verified ?? account.metadata?.isVerified,
            following: data.following_count || account.metadata?.following || 0,
            posts: data.media_count || account.metadata?.posts || 0,
            engagement_rate: data.engagement_rate || account.metadata?.engagement_rate || 0
        };

        // Update follower count if available
        if (data.follower_count !== undefined) {
            account.followers = data.follower_count;
            console.log(`[Webhook] Updated followers for ${account.platform}: ${data.follower_count}`);
        }

        account.lastSynced = new Date();
        await account.save();

        console.log(`[Webhook] Profile updated successfully for ${account.platform}`);
    } catch (error) {
        console.error('[Webhook] Error handling profile update:', error);
    }
}

// Handle audience/engagement updates (follower count, engagement rate)
async function handleAudienceUpdate(data) {
    try {
        console.log('[Webhook] Processing audience update for account:', data.account_id);

        const account = await SocialAccount.findOne({ phylloAccountId: data.account_id });
        if (!account) {
            console.warn('[Webhook] Account not found:', data.account_id);
            return;
        }

        // Update follower count
        if (data.follower_count !== undefined) {
            const oldCount = account.followers;
            account.followers = data.follower_count;
            console.log(`[Webhook] Followers updated: ${oldCount} → ${data.follower_count}`);
        }

        // Update engagement data
        account.metadata = {
            ...account.metadata,
            engagement_rate: data.engagement_rate || account.metadata?.engagement_rate || 0,
            avgLikes: data.avg_likes || account.metadata?.avgLikes || 0,
            avgComments: data.avg_comments || account.metadata?.avgComments || 0,
            avgViews: data.avg_views || account.metadata?.avgViews || 0
        };

        account.lastSynced = new Date();
        await account.save();

        console.log(`[Webhook] Audience data updated for ${account.platform}`);
    } catch (error) {
        console.error('[Webhook] Error handling audience update:', error);
    }
}

// Handle content updates (new posts, videos)
async function handleContentUpdate(data) {
    try {
        console.log('[Webhook] Processing content update for account:', data.account_id);

        const account = await SocialAccount.findOne({ phylloAccountId: data.account_id });
        if (!account) {
            console.warn('[Webhook] Account not found:', data.account_id);
            return;
        }

        // Update post count
        if (data.media_count !== undefined) {
            account.metadata = {
                ...account.metadata,
                posts: data.media_count
            };
        }

        account.lastSynced = new Date();
        await account.save();

        console.log(`[Webhook] Content updated for ${account.platform}`);
    } catch (error) {
        console.error('[Webhook] Error handling content update:', error);
    }
}

// Handle account connection
async function handleAccountConnected(data) {
    console.log('[Webhook] Account connected:', data.account_id);
    // The account is already created by the callback handler
    // This is just for logging/monitoring
}

// Handle account disconnection
async function handleAccountDisconnected(data) {
    try {
        console.log('[Webhook] Account disconnected:', data.account_id);

        const account = await SocialAccount.findOne({ phylloAccountId: data.account_id });
        if (account) {
            account.isActive = false;
            await account.save();
            console.log(`[Webhook] Marked ${account.platform} account as inactive`);
        }
    } catch (error) {
        console.error('[Webhook] Error handling account disconnection:', error);
    }
}

module.exports = exports;
