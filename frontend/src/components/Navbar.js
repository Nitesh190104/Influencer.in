import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const topCreatorsLinks = [
    'Comedy Influencers',
    'Finance Influencers',
    'Parenting Influencers',
    'Beauty Influencers',
    'Fashion/Lifestyle Influencers',
    'Fitness Influencers',
    'Food Influencers',
    'Gaming Influencers',
    'Technology Influencers',
    'Travel Influencers'
  ];

  const forCreatorsLinks = [
    'Join Our Community',
    'Live Campaigns'
  ];

  const productsLinks = [
    'Influencer Dashboard',
    'Fair Price Index'
  ];

  const ourWorkLinks = [
    'Case Studies',
    'Blog',
    'Guides'
  ];

  const contactLinks = [
    'Meet The Team'
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link to="/">
              <img src="https://www.influencer.in/wp-content/themes/influencer-2022/images/logo.png" alt="Influencer" className="logo-image-navbar" />
            </Link>
          </div>

          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <div
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown('top-creators')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>Top Creators ▼</span>
              {activeDropdown === 'top-creators' && (
                <div className="dropdown-menu">
                  <Link to="/comedy-influencers" className="dropdown-item">Comedy Influencers</Link>
                  <Link to="/finance-influencers" className="dropdown-item">Finance Influencers</Link>
                  <Link to="/parenting-influencers" className="dropdown-item">Parenting Influencers</Link>
                  <Link to="/beauty-influencers" className="dropdown-item">Beauty Influencers</Link>
                  <Link to="/fashion-influencers" className="dropdown-item">Fashion/Lifestyle Influencers</Link>
                  <Link to="/fitness-influencers" className="dropdown-item">Fitness Influencers</Link>
                  <Link to="/food-influencers" className="dropdown-item">Food Influencers</Link>
                  <Link to="/gaming-influencers" className="dropdown-item">Gaming Influencers</Link>
                  <Link to="/tech-influencers" className="dropdown-item">Technology Influencers</Link>
                  <Link to="/travel-influencers" className="dropdown-item">Travel Influencers</Link>
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown('for-creators')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>For Creators ▼</span>
              {activeDropdown === 'for-creators' && (
                <div className="dropdown-menu">
                  <Link to="/creators" className="dropdown-item">Join Our Community</Link>
                  <Link to="/live-campaigns" className="dropdown-item">Live Campaigns</Link>
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>Products ▼</span>
              {activeDropdown === 'products' && (
                <div className="dropdown-menu">
                  <Link to="/dashboard-gate" className="dropdown-item">Influencer Dashboard</Link>
                  <Link to="/fair-price-index" className="dropdown-item">Fair Price Index</Link>
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown('our-work')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>Our Work ▼</span>
              {activeDropdown === 'our-work' && (
                <div className="dropdown-menu">
                  {ourWorkLinks.map((link, index) => (
                    <a key={index} href="#" className="dropdown-item">{link}</a>
                  ))}
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown('contact')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>Contact Us ▼</span>
              {activeDropdown === 'contact' && (
                <div className="dropdown-menu">
                  <Link to="/team" className="dropdown-item">Meet The Team</Link>
                  <Link to="/signup" className="dropdown-item">Join Us</Link>
                </div>
              )}
            </div>
          </div>

          <div className="nav-buttons">
            <Link to="/signup">
              <button className="btn-primary">Start for free</button>
            </Link>
            <Link to="/login">
              <button className="btn-secondary">Log in</button>
            </Link>
          </div>

          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
