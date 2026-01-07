import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiscoverSection.css';

const DiscoverSection = () => {
  const navigate = useNavigate();
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
      image: "https://www.influencer.in/wp-content/uploads/2024/10/Discover.webp"
    },
    'Compare Prices': {
      description: "Check if you are over-paying creators and ensure you get a great deal.",
      image: "https://www.influencer.in/wp-content/uploads/2024/10/roi-3.jpg"
    },
    'Track Competitors': {
      description: "Analyse which creators and platforms are working for your competitors",
      image: "https://www.influencer.in/wp-content/uploads/2024/10/competitor-report.webp"
    },
    'Measure': {
      description: "Analyse each campaign at a creator and platform level.",
      image: "https://www.influencer.in/wp-content/uploads/2024/10/reporting.webp"
    }
  };

  return (
    <section className="discover-section">
      <div className="container">
        <h2 className="discover-main-heading">
          An Influencer platform to discover and get the <br /> <span className="highlight">Best ROI</span> for your brand
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

          {/* Content Wrapper (Image + Text) */}
          <div className="discover-content-wrapper">
            <div className="discover-mockup-area">
              <img
                src={tabContent[activeTab].image}
                alt={`${activeTab} Mockup`}
                className="discover-mockup-img"
              />
            </div>

            <div className="discover-cta">
              <p className="discover-desc">
                {tabContent[activeTab].description}
              </p>
              <div className="discover-signup-block">
                <h3 className="discover-signup-title">{tabContent[activeTab].signupText}</h3>
                <button onClick={() => navigate('/signup')} className="discover-signup-btn">SIGNUP FOR FREE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default DiscoverSection;
