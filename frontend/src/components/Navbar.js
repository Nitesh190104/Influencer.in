import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    navigate('/');
  };

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
              onClick={() => setActiveDropdown(activeDropdown === 'top-creators' ? null : 'top-creators')}
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('top-creators')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <span>Top Creators ▼</span>
              {activeDropdown === 'top-creators' && (
                <div className="dropdown-menu">
                  <Link to="/comedy-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Comedy Influencers</Link>
                  <Link to="/finance-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Finance Influencers</Link>
                  <Link to="/parenting-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Parenting Influencers</Link>
                  <Link to="/beauty-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Beauty Influencers</Link>
                  <Link to="/fashion-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Fashion/Lifestyle Influencers</Link>
                  <Link to="/fitness-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Fitness Influencers</Link>
                  <Link to="/food-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Food Influencers</Link>
                  <Link to="/gaming-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Gaming Influencers</Link>
                  <Link to="/tech-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Technology Influencers</Link>
                  <Link to="/travel-influencers" className="dropdown-item" onClick={() => setIsOpen(false)}>Travel Influencers</Link>
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onClick={() => setActiveDropdown(activeDropdown === 'for-creators' ? null : 'for-creators')}
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('for-creators')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <span>For Creators ▼</span>
              {activeDropdown === 'for-creators' && (
                <div className="dropdown-menu">
                  <Link to="/creators" className="dropdown-item" onClick={() => setIsOpen(false)}>Join Our Community</Link>
                  <Link to="/live-campaigns" className="dropdown-item" onClick={() => setIsOpen(false)}>Live Campaigns</Link>
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('products')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <span>Products ▼</span>
              {activeDropdown === 'products' && (
                <div className="dropdown-menu">
                  <Link to="/dashboard-gate" className="dropdown-item" onClick={() => setIsOpen(false)}>Influencer Dashboard</Link>
                  <Link to="/fair-price-index" className="dropdown-item" onClick={() => setIsOpen(false)}>Fair Price Index</Link>
                </div>
              )}
            </div>

            <div
              className="nav-item dropdown"
              onClick={() => setActiveDropdown(activeDropdown === 'contact' ? null : 'contact')}
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('contact')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <span>Contact Us ▼</span>
              {activeDropdown === 'contact' && (
                <div className="dropdown-menu">
                  <Link to="/team" className="dropdown-item" onClick={() => setIsOpen(false)}>Meet The Team</Link>
                  <Link to="/signup" className="dropdown-item" onClick={() => setIsOpen(false)}>Join Us</Link>
                </div>
              )}
            </div>
          </div>

          <div className="nav-buttons">
            {user ? (
              <>
                <Link
                  to={user.userType === 'brand' ? '/brand-dashboard' : '/influencer-dashboard'}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="btn-primary">
                    {user.userType === 'brand' ? 'Brand Dashboard' : 'Influencer Dashboard'}
                  </button>
                </Link>
                <button className="btn-secondary" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <button className="btn-primary">Start for free</button>
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="btn-secondary">Log in</button>
                </Link>
              </>
            )}
          </div>

          <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
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
