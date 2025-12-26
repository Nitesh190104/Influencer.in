import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatorsPage.css';

function CreatorsPage() {
    const navigate = useNavigate();

    const brands = [
        { name: 'Disney+ Hotstar', logo: '🎥' },
        { name: 'boAt', logo: '🎧' },
        { name: 'Myntra', logo: '👗' },
        { name: 'Lenskart', logo: '👓' },
        { name: 'MPL', logo: '🎮' },
        { name: 'Garena', logo: '🔥' },
        { name: 'Flipkart', logo: '🛒' },
        { name: 'Dhani', logo: '💰' },
        { name: 'Jupiter', logo: '🪐' },
        { name: 'Blackbuck', logo: '🚛' }
    ];

    const testimonials = [
        { name: 'Naved Quereshi', role: 'Model, Influencer & Mktg Consultant', image: 'https://yt3.googleusercontent.com/ytc/AIdro_k4xPGZiQqXuWGbRm5X1xY5Y_6zJHQOvxJJm2N8=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Pradaini Surva', role: 'Lifestyle and wellness', image: 'https://yt3.googleusercontent.com/ytc/AIdro_lKZx5fVqKN-7HEF5xBQJF8RvYPiYFUJfHp0UoV6w=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Deepali Dhabu', role: 'Lifestyle Fashion Beauty', image: 'https://yt3.googleusercontent.com/gzIJRe-F0fW8ORlFhp8Uhy4NanuDQx8-_wdEgvY88bPHZfuIQXhJYQ5J8SXd4x1M5RgQKNK9=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Raghav Rai', role: 'Photography', image: 'https://yt3.googleusercontent.com/ytc/AIdro_mVqZM6WxPBqjYMO0pNhCKxKqLLUP1n8JrZxRkujQ=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Shruti', role: 'Dancer', image: 'https://yt3.googleusercontent.com/ytc/AIdro_nKxGf5fVqUxFSQGQJPFw8RvY7iYJfFJfHp0UoV5w=s900-c-k-c0x00ffffff-no-rj' }
    ];

    const industryLeaders = [
        { name: 'Rachana Ranade', category: 'EducationFinance', followers: '438K', image: 'https://yt3.googleusercontent.com/ytc/AIdro_lVqZM6PxPBqjYLO0pNhCKxKqLLUP1n8JrZxRkujP=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Reshi Magada', category: 'Finance', followers: '140K', image: 'https://yt3.googleusercontent.com/ytc/AIdro_k7xPHZiQqXuWGbRm5X1xY5Y_6zJHQOvxJJm2N7=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Simrun Chopra', category: 'Fitness', followers: '593K', image: 'https://yt3.googleusercontent.com/ytc/AIdro_mKZx4fVqKN-8HEF5xBQJF8RvYPiYFUJfHp0UoV7w=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Sarah Hussain', category: 'Food', followers: '472K', image: 'https://yt3.googleusercontent.com/ytc/AIdro_nVqZL6WxPBqjYMO0pNhCKxKqLLUP1n8JrZxRkujR=s900-c-k-c0x00ffffff-no-rj' }
    ];

    return (
        <div className="creators-page">
            {/* Hero Section */}
            <section className="creators-hero">
                <div className="container hero-container">
                    <div className="hero-text">
                        <h1>Collaborate with your<br />favourite brands</h1>
                        <p className="hero-subtitle">Join 100,000+ Indian Creators</p>
                        <div className="hero-cta">
                            <button className="signup-btn" onClick={() => navigate('/login')}>Sign Up Now</button>
                            <div className="app-icons">
                                <span className="app-icon">▶️</span>
                                <span className="app-icon"><svg viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg></span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-collage">
                        {/* Simplified collage using images */}
                        <div className="collage-grid">
                            <div className="collage-item item-1"></div>
                            <div className="collage-item item-2"></div>
                            <div className="collage-item item-3"></div>
                            <div className="collage-item item-4"></div>
                            <div className="collage-item item-5"></div>
                            <div className="collage-item item-6"></div>
                            <div className="collage-item item-7"></div>
                            <div className="collage-item item-8"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="powering-brands">
                <div className="container">
                    <h2 className="section-title">Powering Industry Brands</h2>
                    <div className="brands-grid">
                        {brands.map((brand, index) => (
                            <div key={index} className="brand-item">
                                <span className="brand-logo">{brand.logo}</span>
                                <span className="brand-name">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="creator-testimonials">
                <div className="container">
                    <h2 className="section-title">What our creator friends say</h2>
                    <div className="testimonials-grid">
                        {testimonials.map((t, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-image-wrapper">
                                    <img src={t.image} alt={t.name} />
                                    <div className="play-button">▶</div>
                                </div>
                                <h3>{t.name}</h3>
                                <p>{t.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Price Index Section */}
            <section className="seamless-execution">
                <div className="container">
                    <h2 className="section-title">No delayed payments.<br />Only Seamless execution.</h2>
                    <div className="price-index-display">
                        <div className="price-index-card">
                            <div className="price-index-header">
                                <span>Influencer.in Price Index</span>
                                <p>Evaluate the potential cost for different types of influencer collaborations based on profile performance analytics.</p>
                            </div>
                            <div className="price-index-visual">
                                {/* Placeholder for the price index graphic */}
                                <div className="visual-graphic">
                                    <div className="play-btn-large">▶</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="calculate-now-btn" onClick={() => navigate('/login')}>CALCULATE NOW</button>
                </div>
            </section>

            {/* Industry Leaders Section */}
            <section className="industry-leaders">
                <div className="container">
                    <h2 className="section-title">Working with the best in the industry</h2>
                    <div className="leaders-grid">
                        {industryLeaders.map((leader, index) => (
                            <div key={index} className="leader-card">
                                <div className="leader-image">
                                    <img src={leader.image} alt={leader.name} />
                                </div>
                                <h3>{leader.name}</h3>
                                <p>{leader.category}</p>
                                <div className="leader-stats">
                                    <span>📸 {leader.followers} Followers</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community Banner */}
            <section className="join-community-banner">
                <div className="container banner-container">
                    <button className="join-banner-btn" onClick={() => navigate('/login')}>JOIN OUR CREATOR COMMUNITY TODAY!</button>
                    <div className="banner-app-icons">
                        <span className="app-icon">▶️</span>
                        <span className="app-icon"><svg viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg></span>
                    </div>
                </div>
            </section>

            {/* Creator Guide Section */}
            <section className="creator-guide">
                <div className="container">
                    <h2 className="guide-title text-left">Our Creator Guide!</h2>
                    <div className="guide-content">
                        <div className="guide-info">
                            <p>The know-hows, case studies, tools and everything you need to kickstart your creator journey!</p>
                            <button className="start-journey-btn" onClick={() => navigate('/login')}>START YOUR JOURNEY WITH US TODAY!</button>
                            <div className="guide-app-icons">
                                <span className="app-icon">▶️</span>
                                <span className="app-icon"><svg viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg></span>
                            </div>
                        </div>
                        <div className="guide-cards">
                            <div className="guide-card card-1">
                                <div className="card-video">
                                    <img src="https://yt3.googleusercontent.com/ytc/AIdro_k4xPGZiQqXuWGbRm5X1xY5Y_6zJHQOvxJJm2N8=s900-c-k-c0x00ffffff-no-rj" alt="Guide 1" />
                                    <div className="play-overlay">▶</div>
                                </div>
                            </div>
                            <div className="guide-card card-2">
                                <div className="card-video">
                                    <img src="https://yt3.googleusercontent.com/ytc/AIdro_lKZx5fVqKN-7HEF5xBQJF8RvYPiYFUJfHp0UoV6w=s900-c-k-c0x00ffffff-no-rj" alt="Guide 2" />
                                    <div className="play-overlay">▶</div>
                                </div>
                            </div>
                            <div className="guide-card card-3">
                                <div className="card-video card-yellow">
                                    <div className="circle-logo">TA C</div>
                                    <div className="play-overlay">▶</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CreatorsPage;
