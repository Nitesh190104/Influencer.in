import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const banners = [
    {
      id: '01',
      title: "70% of brands have increased their influencer marketing spends in 2025",
      cta: "Read More!",
      image: "https://www.influencer.in/wp-content/uploads/2023/10/banners2.webp",
      bgColor: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)"
    },
    {
      id: '02',
      title: "Teaming up with celebrities for Samsonite and reaching a whopping 100 audience",
      cta: "Talk to us",
      image: "https://www.influencer.in/wp-content/uploads/2024/02/samsonite-banner.webp",
      bgColor: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)"
    },
    {
      id: '03',
      title: "Collaborating with 500+ Gaming streamers for BGMI to drive results",
      cta: "Talk to us",
      image: "https://www.influencer.in/wp-content/uploads/2024/09/Homepage-Banner.png",
      bgColor: "linear-gradient(135deg, #422144 0%, #832765 100%)"
    }
  ];

  const [activeBanner, setActiveBanner] = useState(0);

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="hero-carousel-section" style={{ background: banners[activeBanner].bgColor }}>
      <div className="carousel-container container">
        <div className="carousel-left">
          <div className="social-sidebar">
            <a href="https://www.facebook.com/influencer.in/" target="_blank" rel="noopener noreferrer" className="social-dot">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
            </a>
            <a href="https://www.instagram.com/influencer.in/" target="_blank" rel="noopener noreferrer" className="social-dot">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
            </a>
            <a href="https://www.youtube.com/channel/UCG9I7TOp2GJ22fRbIzz0vxw" target="_blank" rel="noopener noreferrer" className="social-dot">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
            </a>
          </div>
          <div className="carousel-nav">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`nav-item ${activeBanner === index ? 'active' : ''}`}
                onClick={() => setActiveBanner(index)}
              >
                <span className="nav-number">{banner.id}</span>
                <div className="nav-line"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-middle">
          <div className="image-frame">
            <img
              key={activeBanner}
              src={banners[activeBanner].image}
              alt="Banner"
              className="banner-img"
            />
          </div>
        </div>

        <div className="carousel-right">
          <h1 className="banner-title">
            {banners[activeBanner].title}
          </h1>
          <button className="banner-cta-btn" onClick={() => navigate('/contact')}>
            {banners[activeBanner].cta}
          </button>
        </div>

        <div className="enquire-now-tag" onClick={() => navigate('/contact')}>
          <span>ENQUIRE NOW</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
