import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatorsPage.css';

// Import generated images
import creator1 from '../assets/creators/creator1.png';
import creator2 from '../assets/creators/creator2.png';
import creator3 from '../assets/creators/creator3.png';
import creator4 from '../assets/creators/creator4.png';
import creator5 from '../assets/creators/creator5.png';
import creator6 from '../assets/creators/creator6.png';
import creator7 from '../assets/creators/creator7.png';
import creator8 from '../assets/creators/creator8.png';
import laptopMockup from '../assets/laptop-mockup.png';
import dhaniLogo from '../assets/brands/dhani.png';
import blackbuckLogo from '../assets/brands/blackbuck.png';
import bgmiLogo from '../assets/brands/bgmi.png';
import whitehatLogo from '../assets/brands/whitehat.png';
import trellLogo from '../assets/brands/trell.png';

function CreatorsPage() {
    const navigate = useNavigate();

    const brands = [
        { name: 'Dhani', logo: dhaniLogo },
        { name: 'Blackbuck', logo: blackbuckLogo },
        { name: 'BGMI', logo: bgmiLogo },
        { name: 'WhiteHat Jr', logo: whitehatLogo },
        { name: 'Trell', logo: trellLogo }
    ];

    const testimonials = [
        {
            name: 'Naved Quereshi',
            role: 'Model, Influencer & Mktg Consultant',
            image: 'https://www.influencer.in/wp-content/themes/influencer-2022/images/video-one-img.jpg',
            videoLink: 'https://www.youtube.com/watch?v=i53G1h8BGb4'
        },
        {
            name: 'Pradaini Surva',
            role: 'Lifestyle and wellness',
            image: 'https://www.influencer.in/wp-content/themes/influencer-2022/images/video-two-img.jpg',
            videoLink: 'https://www.youtube.com/watch?v=ezgE5YcJkw8'
        },
        {
            name: 'Deepali Dhabu',
            role: 'Lifestyle Fashion Beauty',
            image: 'https://www.influencer.in/wp-content/themes/influencer-2022/images/Deepali-dhabu-cover.jpg',
            videoLink: 'https://www.youtube.com/watch?v=EmvuAhGqeZE'
        },
        {
            name: 'Raghav Rai',
            role: 'Photography',
            image: 'https://www.influencer.in/wp-content/themes/influencer-2022/images/video-four-img.jpg',
            videoLink: 'https://www.youtube.com/watch?v=RPsfVqN_VE0'
        },
       
    ];

    const industryLeaders = [
        {
            name: 'Santoshi Shetty',
            category: 'Fashion/Lifestyle',
            followers: '293K',
            subscribers: '1.2M',
            image: creator2
        },
        {
            name: 'Rachana Ranade',
            category: 'Education/Finance',
            followers: '438K',
            subscribers: '2.5M',
            image: creator4
        },
        {
            name: 'Reshi Magada',
            category: 'Finance',
            followers: '140K',
            subscribers: '890K',
            image: creator1
        },
        {
            name: 'Simrun Chopra',
            category: 'Fitness',
            followers: '593K',
            subscribers: '1.8M',
            image: creator7
        }
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
                            <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up Now</button>
                            <div className="app-icons">
                                <svg className="app-icon" viewBox="0 0 512 512" width="28" height="28">
                                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                </svg>
                                <svg className="app-icon" viewBox="0 0 384 512" width="28" height="28">
                                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="hero-collage">
                        <div className="collage-grid">
                            <div className="collage-item item-1" style={{ backgroundImage: `url(${creator1})` }}></div>
                            <div className="collage-item item-2" style={{ backgroundImage: `url(${creator2})` }}></div>
                            <div className="collage-item item-3" style={{ backgroundImage: `url(${creator3})` }}></div>
                            <div className="collage-item item-4" style={{ backgroundImage: `url(${creator4})` }}></div>
                            <div className="collage-item item-5" style={{ backgroundImage: `url(${creator5})` }}></div>
                            <div className="collage-item item-6" style={{ backgroundImage: `url(${creator6})` }}></div>
                            <div className="collage-item item-7" style={{ backgroundImage: `url(${creator7})` }}></div>
                            <div className="collage-item item-8" style={{ backgroundImage: `url(${creator8})` }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="powering-brands">
                <div className="container">
                    <h2 className="section-title">Powering Industry Brands</h2>
                    <div className="brands-card">
                        <div className="brands-grid">
                            {brands.map((brand, index) => (
                                <div key={index} className="brand-item">
                                    <img src={brand.logo} alt={brand.name} className="brand-logo-img" />
                                </div>
                            ))}
                        </div>
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
                                <a href={t.videoLink} target="_blank" rel="noopener noreferrer" className="testimonial-link">
                                    <div className="testimonial-image-wrapper">
                                        <img src={t.image} alt={t.name} />
                                    </div>
                                </a>
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
                    <div className="laptop-mockup-wrapper">
                        <img src={laptopMockup} alt="Influencer.in Price Index" className="laptop-image" />
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
                                <p className="leader-category">{leader.category}</p>
                                <div className="leader-stats">
                                    <span className="stat-item">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="#E4405F">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        {leader.followers}
                                    </span>
                                    <span className="stat-item">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF0000">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                        {leader.subscribers}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community Banner */}
            <section className="join-community-banner">
                <div className="container banner-container">
                    <button className="join-banner-btn" onClick={() => navigate('/signup')}>JOIN OUR CREATOR COMMUNITY TODAY!</button>
                    <div className="banner-app-icons">
                        <svg className="app-icon" viewBox="0 0 512 512" width="28" height="28">
                            <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                        </svg>
                        <svg className="app-icon" viewBox="0 0 384 512" width="28" height="28">
                            <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Creator Guide Section */}
            <section className="creator-guide">
                <div className="container">
                    <h2 className="guide-title">Our Creator Guide!</h2>
                    <div className="guide-content">
                        <div className="guide-info">
                            <p>The know-hows, case studies, tools and everything you need to kickstart your creator journey!</p>
                            <button className="start-journey-btn" onClick={() => navigate('/signup')}>START YOUR JOURNEY WITH US TODAY!</button>
                            <div className="guide-app-icons">
                                <svg className="app-icon" viewBox="0 0 512 512" width="28" height="28">
                                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                </svg>
                                <svg className="app-icon" viewBox="0 0 384 512" width="28" height="28">
                                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                </svg>
                            </div>
                        </div>
                        <div className="guide-cards">
                            <div className="guide-card card-1">
                                <div className="card-video">
                                    <img src={creator3} alt="Guide 1" />
                                    <div className="play-overlay">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="guide-card card-2">
                                <div className="card-video">
                                    <img src={creator6} alt="Guide 2" />
                                    <div className="play-overlay">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="guide-card card-3">
                                <div className="card-video card-yellow">
                                    <div className="circle-logo">TA C</div>
                                    <div className="play-overlay">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
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
