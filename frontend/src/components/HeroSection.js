import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="social-icons-left">
            <div className="icon facebook">f</div>
            <div className="icon instagram">ig</div>
            <div className="icon youtube">▶</div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image">
              <div className="character-placeholder">
                {/* Add your character image here from free stock sites */}
                <div className="character-silhouette"></div>
              </div>
            </div>
            <div className="decorative-elements">
              <div className="paper-plane">✈</div>
              <div className="decorative-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div className="slide-numbers">
            <div className="number">01</div>
            <div className="number">02</div>
            <div className="number highlight">03</div>
          </div>
        </div>

        <div className="hero-right">
          <h1>Collaborating with<br /><span className="highlight-number">500+</span> Gaming streamers<br />for BGMI to drive</h1>
          <button className="cta-button">Talk to us</button>
        </div>
      </div>
      <Link to="/contact">
        <button className="enquire-button">📝 ENQUIRE NOW</button>
      </Link>
    </section>
  );
};

export default HeroSection;
