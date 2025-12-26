import React from 'react';
import './ApproachSection.css';

const ApproachSection = () => {
  const approaches = [
    { icon: '✱', title: 'Reach & Frequency Campaigns' },
    { icon: '🎁', title: 'Product Sampling' },
    { icon: '📅', title: 'Online Events, Offline Events' },
    { icon: '👥', title: 'Affiliate and Conversion Campaigns' },
    { icon: '📦', title: 'Unboxing' },
    { icon: '🎯', title: 'Product Placement' }
  ];

  return (
    <section className="approach-section">
      <div className="container">
        <div className="campaign-track">
          <div className="track-content">
            <div className="track-image">
              <div className="placeholder-video">Video Campaign</div>
            </div>
            <div className="track-text">
              <h2>Plan, Track & Scale Your Campaign Effortlessly with YourPlatform</h2>
              <p>Make the most of your campaigns with our all-in-one Influencer management platform.</p>
              <button className="signup-btn">SIGNUP NOW</button>

              <h3>Select Influencer who have Genuine Followers/Impact</h3>
              <p>Pay the lowest price in the market</p>
              <button className="check-price-btn">CHECK FAIR PRICE INDEX</button>
            </div>
          </div>
        </div>

        <div className="recent-work">
          <h2 className="recent-work-title">Our recent work - <span className="highlight">Brands We Work With</span></h2>
          <div className="work-grid">
            <div className="work-card video-card" onClick={() => window.open('https://www.youtube.com/watch?v=InNpY0Bjgv4&t=10s', '_blank')}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/navi-bg-video.png)' }}>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2024/10/navi-logo.png" alt="Navi" className="brand-logo-img" />
                </div>
              </div>
            </div>

            <div className="work-card video-card" onClick={() => window.open('https://www.youtube.com/watch?v=InNpY0Bjgv4&t=10s', '_blank')}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/epic-vid-bg.png)' }}>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2024/10/epic-logo.png" alt="Epic" className="brand-logo-img" />
                </div>
              </div>
            </div>

            <div className="work-card video-card" onClick={() => window.open('https://www.youtube.com/watch?v=InNpY0Bjgv4&t=10s', '_blank')}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/indian-terrain-vid-bg.png)' }}>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2024/10/indian-terrain.png" alt="Indian Terrain" className="brand-logo-img" />
                </div>
              </div>
            </div>

            <div className="work-card video-card" onClick={() => window.open('https://www.youtube.com/watch?v=InNpY0Bjgv4&t=10s', '_blank')}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/samsung-vid-bg-1.png)' }}>
                <div className="word-overlay">Words that should matter</div>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2024/10/samsung.png" alt="Samsung" className="brand-logo-img" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="approach-title">Driving Impact Using multiple approaches</h2>
        <div className="approaches-grid">
          {approaches.map((approach, index) => (
            <div key={index} className="approach-card">
              <div className="approach-icon">{approach.icon}</div>
              <h4>{approach.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
