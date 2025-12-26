import React, { useState } from 'react';
import './DiscoverSection.css';

const DiscoverSection = () => {
  const [activeTab, setActiveTab] = useState('Discover');

  const tabs = [
    'Discover',
    'Compare Prices',
    'Track Competitors',
    'Measure'
  ];

  const tabContent = {
    'Discover': {
      description: "Find creators based on audience demographics, interests, location and genre.",
      signupText: "Discover upcoming creators."
    },
    'Compare Prices': {
      description: "Compare influencer pricing and performance metrics to ensure competitive rates.",
      signupText: "Get the best value for your budget."
    },
    'Track Competitors': {
      description: "Monitor competitor campaigns and influencer partnerships in real-time.",
      signupText: "Stay ahead of the competition."
    },
    'Measure': {
      description: "Measure campaign ROI with deep analytics and automated reporting.",
      signupText: "Data-driven campaign optimization."
    }
  };

  return (
    <section className="discover-section">
      <div className="container">
        <h2 className="discover-main-heading">
          An Influencer platform to discover and get the <span className="highlight">Best ROI</span> for your brand
        </h2>

        <div className="discover-grid">
          {/* Tabs Sidebar */}
          <div className="discover-tabs">
            {tabs.map(tab => (
              <div
                key={tab}
                className={`discover-tab-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{tab}</span>
                {activeTab === tab && <div className="active-arrow">▶</div>}
              </div>
            ))}
          </div>

          {/* Mockup Area */}
          <div className="discover-mockup-area">
            <img
              src="https://www.influencer.in/wp-content/uploads/2024/10/Discover.webp"
              alt="Platform Mockup"
              className="discover-mockup-img"
            />
          </div>

          {/* CTA Sidebar */}
          <div className="discover-cta">
            <p className="discover-desc">
              {tabContent[activeTab].description}
            </p>
            <div className="discover-signup-block">
              <h3 className="discover-signup-title">{tabContent[activeTab].signupText}</h3>
              <button className="discover-signup-btn">SIGNUP FOR FREE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default DiscoverSection;
