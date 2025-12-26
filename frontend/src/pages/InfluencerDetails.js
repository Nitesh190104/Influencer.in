import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './InfluencerDetails.css';

function InfluencerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data - matches the data from Discover/Dashboard
  const allInfluencers = {
    1: { name: 'Sejal Kumar', category: 'Fashion/Lifestyle', followers: '860K', initials: 'SK', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', instagram: 'https://instagram.com/sejalkumar', youtube: '850K', engagement: '4.5%', description: 'Fashion & lifestyle influencer sharing style tips, beauty hacks, and daily vlogs.' },
    2: { name: 'Komal Pandey', category: 'Fashion/Lifestyle', followers: '1.8M', initials: 'KP', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/komalpandeyofficial', youtube: '1.2M', engagement: '5.2%', description: 'Fashion content creator and stylist known for innovative styling and fashion content.' },
    3: { name: 'Masoom Minawala', category: 'Fashion/Lifestyle', followers: '1.2M', initials: 'MM', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/masoomminawala', youtube: '980K', engagement: '4.8%', description: 'International fashion blogger and entrepreneur in the fashion industry.' },
    4: { name: 'Santoshi Shetty', category: 'Fashion/Lifestyle', followers: '650K', initials: 'SS', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', instagram: 'https://instagram.com/santoshishetty', youtube: '620K', engagement: '4.2%', description: 'Fashion influencer creating engaging content about lifestyle and fashion trends.' },
    5: { name: 'Kritika Khurana', category: 'Fashion/Lifestyle', followers: '1.5M', initials: 'KK', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/thatbohogirl', youtube: '1.3M', engagement: '5.8%', description: 'Popular fashion and lifestyle blogger with a bohemian aesthetic.' },
    6: { name: 'Aashna Shroff', category: 'Fashion/Lifestyle', followers: '1.1M', initials: 'AS', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', instagram: 'https://instagram.com/aashnashroff', youtube: '1M', engagement: '4.9%', description: 'Fashion, beauty and lifestyle content creator.' },
    7: { name: 'Juhi Godambe', category: 'Fashion/Lifestyle', followers: '890K', initials: 'JG', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', instagram: 'https://instagram.com/juhigodambe', youtube: '750K', engagement: '4.4%', description: 'Entrepreneur and fashion influencer.' },
    8: { name: 'Otherwarya', category: 'Fashion/Lifestyle', followers: '420K', initials: 'OW', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', instagram: 'https://instagram.com/otherwarya', youtube: '380K', engagement: '6.2%', description: 'Fashion commentator and cultural critic.' },
    9: { name: 'Shivya Nath', category: 'Travel', followers: '456K', initials: 'SN', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', instagram: 'https://instagram.com/shivya', youtube: '420K', engagement: '5.1%', description: 'Sustainable travel blogger and writer.' },
    10: { name: 'Shenaz Treasury', category: 'Travel', followers: '780K', initials: 'ST', color: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', instagram: 'https://instagram.com/shenaztreasury', youtube: '650K', engagement: '4.6%', description: 'Travel influencer and former actress.' },
    11: { name: 'Tanya Khanijow', category: 'Travel', followers: '690K', initials: 'TK', color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', instagram: 'https://instagram.com/tanyakhanijow', youtube: '850K', engagement: '5.9%', description: 'Solo travel content creator and filmmaker.' },
    12: { name: 'Larissa DSa', category: 'Travel', followers: '520K', initials: 'LD', color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', instagram: 'https://instagram.com/larissadsa', youtube: '480K', engagement: '4.7%', description: 'Travel photographer and storyteller.' },
    13: { name: 'Anunay Sood', category: 'Travel', followers: '410K', initials: 'AS', color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', instagram: 'https://instagram.com/anunaysood', youtube: '520K', engagement: '5.3%', description: 'Adventure travel vlogger.' },
    14: { name: 'Kamiya Jani', category: 'Travel', followers: '1.2M', initials: 'KJ', color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', instagram: 'https://instagram.com/kamiyajani', youtube: '2.5M', engagement: '6.8%', description: 'Food and travel content creator.' },
    15: { name: 'Savi and Vid', category: 'Travel', followers: '890K', initials: 'SV', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/bruisedpassports', youtube: '1.2M', engagement: '5.5%', description: 'Travel couple creating cinematic travel content.' },
    16: { name: 'Aishah Ahmed', category: 'Travel', followers: '380K', initials: 'AA', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/aishafahmed', youtube: '450K', engagement: '4.9%', description: 'Travel and lifestyle content creator.' },
    17: { name: 'Ranveer Brar', category: 'Food', followers: '2.5M', initials: 'RB', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/ranveerbrar', youtube: '5.2M', engagement: '7.2%', description: 'Celebrity chef and food influencer.' },
    18: { name: 'Kunal Kapur', category: 'Food', followers: '1.8M', initials: 'KK', color: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', instagram: 'https://instagram.com/chefkunal', youtube: '3.8M', engagement: '6.5%', description: 'Chef, restaurateur and food content creator.' },
    19: { name: 'Pooja Dhingra', category: 'Food', followers: '920K', initials: 'PD', color: 'linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%)', instagram: 'https://instagram.com/poojadhingra', youtube: '780K', engagement: '5.4%', description: 'Pastry chef and entrepreneur.' },
    20: { name: 'Amar Sirohi', category: 'Food', followers: '1.3M', initials: 'AS', color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', instagram: 'https://instagram.com/foodpharmer', youtube: '2.1M', engagement: '6.8%', description: 'Food scientist and nutrition expert.' },
    65: { name: 'Sharan Hegde', category: 'Finance', followers: '2.5M', initials: 'SH', color: 'linear-gradient(135deg, #27AE60, #229954)', instagram: 'https://instagram.com/financewithsharan', youtube: '1.1M', engagement: '8.5%', description: 'Finance educator simplifying personal finance and investment concepts.' },
    66: { name: 'Rachana Ranade', category: 'Finance', followers: '1.8M', initials: 'RR', color: 'linear-gradient(135deg, #2ECC71, #27AE60)', instagram: 'https://instagram.com/rachanaranade', youtube: '4M', engagement: '9.2%', description: 'Stock market educator and CA helping people learn investing.' },
    68: { name: 'Ankur Warikoo', category: 'Finance', followers: '3.2M', initials: 'AW', color: 'linear-gradient(135deg, #27AE60, #229954)', instagram: 'https://instagram.com/warikoo', youtube: '2.2M', engagement: '7.8%', description: 'Entrepreneur, mentor and personal finance educator.' },
  };

  const influencer = allInfluencers[id] || allInfluencers[1];

  const handleContact = () => {
    navigate('/contact');
  };

  const openInstagram = () => {
    window.open(influencer.instagram, '_blank');
  };

  return (
    <div className="influencer-details-page">
      <div className="details-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Discover
        </button>

        <div className="profile-header">
          <div className="profile-image-large" style={{ background: influencer.color }}>
            <div className="initials-large">{influencer.initials}</div>
          </div>

          <div className="profile-info">
            <h1 className="influencer-name">{influencer.name}</h1>
            <p className="influencer-category">{influencer.category}</p>
            <p className="influencer-description">{influencer.description}</p>

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon">📸</div>
                <div className="stat-value">{influencer.followers}</div>
                <div className="stat-label">Instagram Followers</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">▶️</div>
                <div className="stat-value">{influencer.youtube}</div>
                <div className="stat-label">YouTube Subscribers</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-value">{influencer.engagement}</div>
                <div className="stat-label">Engagement Rate</div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="contact-button" onClick={handleContact}>
                Contact for Collaboration
              </button>
              <button className="instagram-button" onClick={openInstagram}>
                View Instagram Profile
              </button>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <h2>Audience Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h3>Top Countries</h3>
              <ul>
                <li>🇮🇳 India - 75%</li>
                <li>🇺🇸 United States - 12%</li>
                <li>🇬🇧 United Kingdom - 8%</li>
                <li>🇦🇪 UAE - 5%</li>
              </ul>
            </div>

            <div className="insight-card">
              <h3>Age Demographics</h3>
              <ul>
                <li>18-24 years - 35%</li>
                <li>25-34 years - 45%</li>
                <li>35-44 years - 15%</li>
                <li>45+ years - 5%</li>
              </ul>
            </div>

            <div className="insight-card">
              <h3>Gender Split</h3>
              <ul>
                <li>👩 Female - 58%</li>
                <li>👨 Male - 40%</li>
                <li>⚧️ Others - 2%</li>
              </ul>
            </div>

            <div className="insight-card">
              <h3>Best Posting Times</h3>
              <ul>
                <li>🌅 Morning (8-11 AM)</li>
                <li>🌆 Evening (6-9 PM)</li>
                <li>📅 Weekends perform 25% better</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="performance-section">
          <h2>Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-box">
              <div className="metric-number">450K+</div>
              <div className="metric-text">Average Post Reach</div>
            </div>
            <div className="metric-box">
              <div className="metric-number">25K+</div>
              <div className="metric-text">Avg. Likes per Post</div>
            </div>
            <div className="metric-box">
              <div className="metric-number">1.2K+</div>
              <div className="metric-text">Avg. Comments</div>
            </div>
            <div className="metric-box">
              <div className="metric-number">850+</div>
              <div className="metric-text">Avg. Shares</div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Collaborate?</h2>
          <p>Get in touch with {influencer.name} for brand collaborations and campaigns</p>
          <button className="cta-button" onClick={handleContact}>
            Start Collaboration
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfluencerDetails;
