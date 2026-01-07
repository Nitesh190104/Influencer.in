import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApproachSection.css';

const ApproachSection = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [cardPosition, setCardPosition] = useState(null);

  const handleVideoClick = (videoUrl, event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    setCardPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setCardPosition(null);
  };

  const approaches = [
    { icon: 'https://www.influencer.in/wp-content/uploads/2023/09/s-1.png', title: 'Reach & Frequency Campaigns' },
    { icon: 'https://www.influencer.in/wp-content/uploads/2023/09/s-2.png', title: 'Product Sampling' },
    { icon: 'https://www.influencer.in/wp-content/uploads/2023/09/s-3.png', title: 'Online Events, Offline Events' },
    { icon: 'https://www.influencer.in/wp-content/uploads/2023/09/s-4.png', title: 'Affiliate and Conversion Campaigns' },
    { icon: 'https://www.influencer.in/wp-content/uploads/2023/09/s-6.png', title: 'Unboxing' },
    { icon: 'https://www.influencer.in/wp-content/uploads/2023/09/s-5.png', title: 'Product Placement' }
  ];

  return (
    <section className="approach-section">
      <div className="container">
        <div className="campaign-track">
          <div className="track-content">
            <div className="track-image" onClick={() => window.open('https://www.youtube.com/embed/s_XL2uIMZvw?si=RU265rvC0OrfkMLR?autoplay=1', '_blank')} style={{ cursor: 'pointer' }}>
              <img
                src="https://www.influencer.in/wp-content/uploads/2023/09/fair-price-index.jpg"
                alt="Campaign Video"
                className="track-main-img"
              />
              <div className="track-play-overlay">
                <div className="play-circle-gold">
                  <div className="play-tri-gold"></div>
                </div>
              </div>
            </div>
            <div className="track-text">
              <div className="track-text-block">
                <h2 className="track-heading">Plan, Track & Scale Your <br /> Campaign Effortlessly with <br /> Influencer.in</h2>
                <p className="track-subtext">Make the most of your campaigns with our all-in-one Influencer management platform.</p>
                <button className="signup-btn" onClick={() => navigate('/signup')}>SIGNUP NOW</button>
              </div>

              <div className="track-text-block">
                <h2 className="track-heading-small">Select Influencer who have <br /> Genuine Followers/Impact</h2>
                <p className="track-subtext">Pay the lowest price in the market</p>
                <button className="check-price-btn" onClick={() => window.open('https://product.influencer.in/price-index', '_blank')}>CHECK FAIR PRICE INDEX</button>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-work">
          <h2 className="recent-work-title">Our recent work - <span className="highlight">Brands We Work With</span></h2>
          <div className="work-grid">
            <div className="work-card video-card" onClick={(e) => handleVideoClick('https://www.youtube.com/embed/w4p8hrspZCo?autoplay=1', e)}>
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

            <div className="work-card video-card" onClick={(e) => handleVideoClick('https://www.youtube.com/embed/tm-P_Nc9nBA?autoplay=1', e)}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/epic-vid-bg.png)' }}>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2024/10/epic-condoms-bg.png" alt="Epic" className="brand-logo-img" />
                </div>
              </div>
            </div>

            <div className="work-card video-card" onClick={(e) => handleVideoClick('https://www.youtube.com/embed/InNpY0Bjgv4?autoplay=1', e)}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/it-video-bg.png)' }}>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2023/09/www.png" alt="Indian Terrain" className="brand-logo-img" />
                </div>
              </div>
            </div>

            <div className="work-card video-card" onClick={(e) => handleVideoClick('https://www.youtube.com/embed/wQD95jhgoZc?autoplay=1', e)}>
              <div className="video-thumbnail" style={{ backgroundImage: 'url(https://www.influencer.in/wp-content/uploads/2024/10/samsung-vid-bg-1.png)' }}>
                <div className="word-overlay">Words that should matter</div>
                <div className="play-overlay">
                  <div className="play-icon-circle">
                    <div className="play-tri"></div>
                  </div>
                </div>
                <div className="brand-logo-box">
                  <img src="https://www.influencer.in/wp-content/uploads/2024/10/samsung-1.png" alt="Samsung" className="brand-logo-img" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="approach-title">Driving Impact Using multiple approaches</h2>
        <div className="approaches-grid">
          {approaches.map((approach, index) => (
            <div key={index} className="approach-card">
              <div className="approach-icon-wrapper">
                <img src={approach.icon} alt={approach.title} className="approach-icon-img" />
              </div>
              <h4>{approach.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>×</button>
            <iframe
              width="100%"
              height="100%"
              src={selectedVideo}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default ApproachSection;
