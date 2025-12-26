import React, { useState } from 'react';
import './DashboardFeatures.css';

const DashboardFeatures = () => {
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
        <section className="dashboard-features">
            <div className="features-container">
                <h2 className="features-main-heading">
                    An Influencer platform to discover and get the <span className="roi-highlight">Best ROI</span> for your brand
                </h2>

                <div className="features-content-grid">
                    {/* Left Sidebar Tabs */}
                    <div className="features-tabs-sidebar">
                        {tabs.map(tab => (
                            <div
                                key={tab}
                                className={`feature-tab-item ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                <span>{tab}</span>
                                {activeTab === tab && <div className="active-arrow">▶</div>}
                            </div>
                        ))}
                    </div>

                    {/* Middle Mockup Visual */}
                    <div className="features-mockup-area">
                        <div className="mockup-container">
                            <img
                                src="https://www.influencer.in/wp-content/uploads/2024/10/Discover.webp"
                                alt="Platform Mockup"
                                className="mockup-image"
                            />
                        </div>
                    </div>


                    {/* Right Side Text/CTA */}
                    <div className="features-cta-sidebar">
                        <p className="feature-description">
                            {tabContent[activeTab].description}
                        </p>
                        <div className="feature-signup-block">
                            <h3 className="signup-title">{tabContent[activeTab].signupText}</h3>
                            <button className="signup-free-btn">SIGNUP FOR FREE</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="features-impact-section">
                    <h2 className="impact-heading">
                        <span className="impact-light">Driving</span> <span className="impact-highlight">Business Impact</span>
                    </h2>

                    <div className="brand-logos-row">
                        <img src="https://www.influencer.in/wp-content/uploads/2023/09/flipkart.png" alt="Flipkart" className="brand-impact-logo" />
                        <img src="https://www.influencer.in/wp-content/uploads/2023/09/tata-cliq.jpg" alt="Tata CLIQ" className="brand-impact-logo" />
                        <img src="https://www.influencer.in/wp-content/uploads/2023/07/boat.png" alt="boat" className="brand-impact-logo" />
                        <img src="https://www.influencer.in/wp-content/uploads/2024/10/samsung.png" alt="Samsung" className="brand-impact-logo" />
                        <img src="https://www.influencer.in/wp-content/uploads/2024/10/gocolorss.png" alt="Go Colors" className="brand-impact-logo" />
                    </div>
                </div>


            </div>
        </section>
    );
};

export default DashboardFeatures;
