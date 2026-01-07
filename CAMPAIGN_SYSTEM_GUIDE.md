# Campaign Management System - Complete Guide

## 🎯 Overview

A complete campaign management system that allows **brands** to create and manage influencer marketing campaigns, and **influencers** to discover, apply, and participate in campaigns.

---

## ✨ Features Implemented

### For Brands:
- ✅ **Create Campaigns** - Full campaign creation form with all details
- ✅ **Edit Campaigns** - Modify campaign details anytime
- ✅ **Delete Campaigns** - Remove campaigns
- ✅ **View Applicants** - See all influencers who applied
- ✅ **Campaign Dashboard** - Manage all campaigns in one place
- ✅ **Real-time Statistics** - Track applicants vs max capacity

### For Influencers:
- ✅ **Browse Campaigns** - View all available campaigns
- ✅ **Filter Campaigns** - Filter by all/eligible/applied
- ✅ **Apply to Campaigns** - One-click application
- ✅ **Eligibility Check** - Automatic follower count verification
- ✅ **Application Status** - Track applied campaigns
- ✅ **Detailed Campaign View** - See full campaign requirements

---

## 🏗️ Architecture

### Backend Structure

```
backend/
├── models/
│   └── Campaign.js              # Enhanced campaign schema with applicants
├── controllers/
│   └── campaignController.js    # All campaign CRUD + application logic
└── routes/
    └── campaigns.js             # Campaign API routes
```

### Frontend Structure

```
frontend/src/pages/
├── BrandCampaigns.js           # Brand campaign management page
├── BrandCampaigns.css          # Styling for brand campaigns
├── InfluencerCampaigns.js      # Influencer campaign browsing page
└── InfluencerCampaigns.css     # Styling for influencer campaigns
```

---

## 📋 Database Schema

### Campaign Model

```javascript
{
  title: String,                    // Campaign name
  brandId: ObjectId,               // Reference to brand user
  brandName: String,               // Brand display name
  description: String,             // Campaign description
  category: String,                // Fashion, Travel, Tech, etc.
  minFollowers: Number,            // Minimum follower requirement
  maxApplicants: Number,           // Maximum number of applicants
  budget: Number,                  // Optional campaign budget
  requirements: [String],          // List of requirements
  deliverables: [String],          // What influencer needs to deliver
  platforms: [String],             // Instagram, YouTube, etc.
  applicants: [{                   // Array of applicants
    influencerId: ObjectId,
    influencerName: String,
    appliedAt: Date,
    status: String,               // pending, accepted, rejected
    followers: Number
  }],
  status: String,                  // active, closed, draft
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Campaign Management

#### Get All Campaigns (Influencers)
```http
GET /api/campaigns
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [Campaign]
}
```

#### Get Brand's Campaigns
```http
GET /api/campaigns/brand/my-campaigns
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [Campaign]
}
```

#### Get Single Campaign
```http
GET /api/campaigns/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": Campaign
}
```

#### Create Campaign (Brands Only)
```http
POST /api/campaigns
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "title": "Promotion of Monster Energy Drink",
  "description": "Looking for fitness influencers...",
  "category": "Fitness",
  "minFollowers": 10000,
  "maxApplicants": 20,
  "budget": 5000,
  "platforms": ["instagram", "youtube"],
  "requirements": ["Must create 3 posts", "Include product shots"],
  "deliverables": ["3x Instagram Posts", "1x YouTube Video"],
  "startDate": "2024-01-01",
  "endDate": "2024-02-01",
  "status": "active"
}

Response:
{
  "success": true,
  "message": "Campaign created successfully",
  "data": Campaign
}
```

#### Update Campaign (Brands Only)
```http
PUT /api/campaigns/:id
Authorization: Bearer {token}
Content-Type: application/json

Body: {same as create}

Response:
{
  "success": true,
  "message": "Campaign updated successfully",
  "data": Campaign
}
```

#### Delete Campaign (Brands Only)
```http
DELETE /api/campaigns/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

#### Apply to Campaign (Influencers Only)
```http
POST /api/campaigns/:id/apply
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "followers": 50000
}

Response:
{
  "success": true,
  "message": "Application submitted successfully",
  "data": Campaign
}
```

---

## 🎨 User Interface

### Brand Campaign Page

**Access**: Navigate to `/brand/campaigns` or click "Campaigns" in brand dashboard sidebar

**Features**:
- **Plus Icon Button** - Opens campaign creation modal
- **Campaign Cards** - Shows all your campaigns with:
  - Status badge (active/draft/closed)
  - Edit and delete buttons
  - Applicant count
  - Category and requirements
  - Platform tags
- **Create/Edit Modal** - Comprehensive form with:
  - Title and description
  - Category selection
  - Minimum followers requirement
  - Maximum applicants limit
  - Budget (optional)
  - Platform checkboxes
  - Requirements and deliverables (multi-line)
  - Start and end dates
  - Status selection

### Influencer Campaign Page

**Access**: Navigate to `/influencer/campaigns` or click "Campaigns" in influencer dashboard sidebar

**Features**:
- **Total Followers Badge** - Shows your combined follower count
- **Filter Tabs**:
  - All Campaigns
  - Eligible (you meet requirements)
  - Applied (campaigns you've applied to)
- **Campaign Cards** - Shows:
  - Brand name and avatar
  - Campaign title and description
  - Eligibility indicators (✅ or ❌)
  - Spots available
  - Budget (if specified)
  - Platform tags
  - **Apply Now** button (if eligible)
  - View Details button
- **Campaign Detail Modal** - Full campaign information:
  - Complete description
  - All requirements
  - Deliverables
  - Platforms needed
  - Application deadline
  - Apply button (if eligible)

---

## 🚀 How to Use

### For Brands:

1. **Login** as a brand account
2. Navigate to **Brand Dashboard**
3. Click **"Campaigns"** in the sidebar
4. Click the **+ Create Campaign** button
5. Fill in campaign details:
   - **Title**: "Promotion of Monster Energy Drink"
   - **Description**: Explain your campaign goals
   - **Category**: Select appropriate category
   - **Min Followers**: Set minimum requirement (e.g., 10,000)
   - **Max Applicants**: How many influencers you need (e.g., 15)
   - **Budget**: Optional compensation amount
   - **Platforms**: Check required platforms
   - **Requirements**: One per line (e.g., "Must create 3 Instagram posts")
   - **Deliverables**: What you expect (e.g., "3x Feed Posts, 5x Stories")
6. Click **"Create Campaign"**
7. Campaign is now live and visible to influencers!

**Managing Campaigns**:
- **Edit**: Click ✏️ icon on campaign card
- **Delete**: Click 🗑️ icon on campaign card
- **View Applicants**: Click "View Applicants" button

### For Influencers:

1. **Login** as an influencer account
2. **Connect social accounts** (to get follower count)
3. Navigate to **Influencer Dashboard**
4. Click **"Campaigns"** in the sidebar
5. **Browse available campaigns**:
   - Use filter tabs to find eligible campaigns
   - Green ✅ means you're eligible
   - Red ❌ means you don't meet requirements
6. **View campaign details**:
   - Click "View Details" for full information
   - Check requirements and deliverables
7. **Apply to campaigns**:
   - Click "Apply Now" on eligible campaigns
   - Automatic application submission
   - Status changes to "Applied"

---

## 🔒 Permissions & Validation

### Brand Permissions:
- ✅ Create campaigns
- ✅ Edit own campaigns only
- ✅ Delete own campaigns only
- ✅ View applicants for own campaigns
- ❌ Cannot apply to campaigns

### Influencer Permissions:
- ✅ View all active campaigns
- ✅ Apply to campaigns (if eligible)
- ❌ Cannot create campaigns
- ❌ Cannot edit any campaigns

### Application Validation:
- ✅ Follower count must meet minimum requirement
- ✅ Cannot apply twice to same campaign
- ✅ Campaign must be active
- ✅ Campaign must have available spots
- ✅ User must be logged in as influencer

---

## 🎯 Campaign Workflow

```
1. Brand Creates Campaign
   ↓
2. Campaign Appears on Influencer Page
   ↓
3. Influencer Views Campaign Details
   ↓
4. Influencer Checks Eligibility
   ↓
5. Influencer Applies (if eligible)
   ↓
6. Brand Sees Application
   ↓
7. Brand Reviews and Accepts/Rejects
```

---

## 💡 Key Features Explained

### 1. Minimum Followers Requirement
- Brands set a minimum follower count
- System automatically checks influencer's total followers
- Only eligible influencers can apply
- Prevents unqualified applications

### 2. Maximum Applicants Limit
- Brands control how many influencers they need
- Shows "X / Y" applicants on cards
- "Campaign Full" when limit reached
- No more applications accepted when full

### 3. Eligibility Indicators
- **Green ✅**: You meet requirements
- **Red ❌**: You don't meet requirements
- Real-time follower count comparison
- Visual feedback before applying

### 4. Application Tracking
- "Applied" filter shows your applications
- Application status (pending/accepted/rejected)
- Can't apply twice to same campaign
- Applied date timestamp

### 5. Platform Targeting
- Brands specify required platforms
- Instagram, Facebook, YouTube, TikTok, Twitter
- Influencers see which platforms are needed
- Helps match right influencers

---

## 🎨 UI Components

### Campaign Card (Brand View)
```
┌─────────────────────────────────┐
│ [Status Badge]       [✏️] [🗑️]  │
│                                  │
│ Campaign Title                   │
│ Description text...              │
│                                  │
│ Category: Fashion                │
│ Min Followers: 10,000            │
│ Max Applicants: 20               │
│ Applicants: 5 / 20               │
│                                  │
│ [instagram] [youtube]            │
│                                  │
│ [View Applicants (5)]            │
└─────────────────────────────────┘
```

### Campaign Card (Influencer View)
```
┌─────────────────────────────────┐
│ [B] Brand Name                   │
│     Fashion                      │
│                                  │
│ Campaign Title                   │
│ Description text...              │
│                                  │
│ 👥 Min Followers: 10,000  ✅     │
│ 🎯 Spots: 5 / 20                 │
│ 💰 Budget: $5,000                │
│                                  │
│ [instagram] [youtube]            │
│                                  │
│ [View Details]  [Apply Now]      │
└─────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### "Not Eligible" Error
**Problem**: Can't apply to campaign  
**Solution**: Connect your social accounts to get your follower count

### "Already Applied" Error
**Problem**: Can't apply again  
**Solution**: You can only apply once per campaign

### "Campaign Full" Message
**Problem**: Can't apply to full campaign  
**Solution**: Look for other campaigns or wait for new ones

### Campaigns Not Showing
**Problem**: No campaigns visible  
**Solution**: Make sure you're logged in and campaigns exist

---

## 🔮 Future Enhancements

- [ ] Email notifications when influencer applies
- [ ] In-app messaging between brands and influencers
- [ ] Application review workflow
- [ ] Payment integration
- [ ] Contract generation
- [ ] Campaign analytics and reporting
- [ ] Saved/favorited campaigns
- [ ] Campaign recommendations based on profile
- [ ] Multi-stage selection process
- [ ] Performance tracking per campaign

---

## 📝 Testing Scenarios

### As Brand:
1. Create a campaign with min 1,000 followers
2. Edit the campaign to change max applicants
3. View the campaign in influencer view
4. Delete a draft campaign

### As Influencer:
1. Connect social accounts to get followers
2. Browse campaigns and check eligibility
3. Apply to an eligible campaign
4. Try to apply again (should be blocked)
5. Filter by "Applied" campaigns

---

## 🎉 Success!

The campaign management system is now fully functional! Brands can create campaigns with specific requirements, and influencers can discover and apply to campaigns that match their profile.

**Quick Links**:
- Brand Campaigns: http://localhost:3000/brand/campaigns
- Influencer Campaigns: http://localhost:3000/influencer/campaigns
- Brand Dashboard: http://localhost:3000/brand-dashboard
- Influencer Dashboard: http://localhost:3000/influencer-dashboard
