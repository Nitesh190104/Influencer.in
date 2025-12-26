import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveCampaigns.css';

const LiveCampaigns = () => {
    const navigate = useNavigate();

    const handleApplyNow = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const campaigns = [
        {
            brand: "BLACKBUCK",
            title: "Blackbuck Demand",
            description: "BlackBuck is India's largest trucking network, delivering reliability, efficiency and seamless experience for shippers and truckers.",
            requirements: [
                "Entertainment/Lifestyle - All Languages",
                "Performance",
                "10K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1586339949916-3e945cbe6a39?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "TATA CLiQ",
            title: "Tata CLiQ",
            description: "To promote products available on the website.",
            requirements: [
                "Fashion, Lifestyle, Beauty, Tech",
                "Instagram",
                "50K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "GO COLORS",
            title: "Celebrating Women - Phase 2",
            description: "The campaign is centered around product promotion and optimising sales",
            requirements: [
                "Female influencers from all categories. Hindi/English",
                "Instagram",
                "50K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1481399124169-474e731d7fec?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "PUMA",
            title: "PropahLady",
            description: "To promote their new collection called SS22 during the International Women's Week by giving several offers and perks through photoshoot at select stores. This idea was rolled out through Influencer Marketing.",
            requirements: [
                "Fashion",
                "Instagram",
                "10K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "WETTER",
            title: "Wetter Online",
            description: "The campaign was to create awareness for the farmers especially about their weather app called Mausam & Radar app.",
            requirements: [
                "Farming - Hindi",
                "Instagram, Youtube",
                "100K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "LEAP FINANCE",
            title: "Leap Finance",
            description: "Leap finance is a one-stop destination for Indian students to fund their overseas education. It is a performance campaign, that is running to get more students to apply for loans for abroad studies through Leap Finance",
            requirements: [
                "Lifestyle/Finance - Hindi, English",
                "Performance",
                "20K - 200K"
            ],
            image: "https://images.unsplash.com/photo-1523240715639-93f8fa096ee2?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "FLIPKART",
            title: "Men's fashion",
            description: "The campaign was aound promoting winter fashion apparels available for Men on Flipkart.",
            requirements: [
                "Fashion",
                "Instagram",
                "10K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "DABUR",
            title: "Dabur Honey, DCP, Dabur Hommade, DLT",
            description: "The campaign is centered around promoting the 4 brands of Dabur and optimising sales",
            requirements: [
                "Regional influencers from MP, CG, Maharashtra and Gujarat. Languages- Hindi, Marathi, Gujarati",
                "Engagement focused",
                "100K - 10M"
            ],
            image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "Q JOBS",
            title: "Q Jobs",
            description: "It is platform to help blue collar job seekers find jobs closer to where they are, based on their interests and skills. It has different genres of influencers for a performance campaign to get more downlaods of the app",
            requirements: [
                "Entertainment/Job Providers - Hindi, Kannada, Telugu, Tamil",
                "Performance",
                "50K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "GAMEZY",
            title: "Gamezy Video Camapaign",
            description: "To create brand awareness and drive more app installs for Gamezy app which is a multi-gaming platform.",
            requirements: [
                "Gaming, Sports, Fantasy, Earning, App Review, Comedy, Entertainment, Lifestyle / All languages",
                "Youtube, Instagram",
                "5K - 600K"
            ],
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "NAYRA",
            title: "Nayra Influencer Campaign",
            description: "The campaign is centered around product promotion and optimising sales.",
            requirements: [
                "Lifestyle, Beauty, Astrologers, Interior Designers / English, Hindi",
                "Instagram",
                "50K - 700K"
            ],
            image: "https://images.unsplash.com/photo-1481399124169-474e731d7fec?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "SUNTECK REALTY",
            title: "Sunteck Realty Campaign",
            description: "The campaign is centered around awareness towards the location - Vasai, where the brand projects are coming up soon.",
            requirements: [
                "Food, Travel, Comedy, Dancer, TV actor (all based out of Mumbai) / English, Hindi, Marathi",
                "Instagram",
                "45K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "BHARAT MATRIMONY",
            title: "Jodii Campaign",
            description: "To create awareness about the app amongst vernacular audience",
            requirements: [
                "Punjabi, Odia, Malayalam",
                "Instagram",
                "50K - 700K"
            ],
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "SONY MUSIC",
            title: "Sony Music Campaign",
            description: "To create awareness about the launches amongst vernacular audience",
            requirements: [
                "Tamil, Telugu",
                "Instagram",
                "5K - 100K"
            ],
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "ZEST MONEY",
            title: "Zest Money Campaign",
            description: "Brand awareness",
            requirements: [
                "Hindi/English",
                "Instagram",
                "25K - 100K"
            ],
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "JUPITER",
            title: "Feature Campaign",
            description: "Feature and brand awareness",
            requirements: [
                "English",
                "Instagram/Youtube",
                "50K - 600K"
            ],
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "DHAN",
            title: "Contest Campaign",
            description: "Contest Announcement",
            requirements: [
                "Hindi/English",
                "Instagram",
                "20K - 75K"
            ],
            image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "BGMI",
            title: "BGMI Launch Campaign",
            description: "To create awareness about BGMI's relaunch in india",
            requirements: [
                "Gaming/All Languages",
                "Youtube, Instagram",
                "50K - 10M"
            ],
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            imageOnLeft: true
        },
        {
            brand: "COT",
            title: "Clash of Titans awareness campaign",
            description: "To create awareness about COT'S launch in india",
            requirements: [
                "Gaming/Hindi, English",
                "Youtube, Instagram",
                "10K - 1M"
            ],
            image: "https://images.unsplash.com/photo-1552824236-07778198d22d?w=800&q=80",
            imageOnLeft: false
        },
        {
            brand: "DHANI",
            title: "Dhani OF Performance campaign",
            description: "To make Dhani the one stop shop for all personal finance and for everyones everyday needs",
            requirements: [
                "Finance/ Most languages",
                "Instagram",
                "10 - 100K"
            ],
            image: "https://images.unsplash.com/photo-1542222024-c39e2281f121?w=800&q=80",
            imageOnLeft: true
        }
    ];

    return (
        <div className="live-campaigns-page">
            {/* Hero Section */}
            <section className="campaigns-hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="highlight-box">Campaigns</span> made<br />simply for you
                        </h1>
                        <p className="hero-subtitle">
                            You just can't miss on these<br />
                            impactful campaigns.<br />
                            Connect, Collaborate and Create with us!
                        </p>
                    </div>
                    <div className="hero-illustration">
                        <div className="instagram-frame">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80" alt="Instagram Campaign" />
                            <div className="frame-overlay">
                                <span className="instagram-logo">Instagram</span>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="decor-hashtag">#</div>
                        <div className="decor-heart">❤️</div>
                        <div className="decor-plus">+</div>
                        <div className="decor-thumbs">👍</div>
                    </div>
                </div>
            </section>

            {/* Campaign Sections */}
            <div className="campaign-sections-container">
                {campaigns.map((camp, index) => (
                    <section key={index} className={`campaign-row ${camp.imageOnLeft ? 'img-left' : 'img-right'}`}>
                        <div className="container campaign-flex">
                            <div className="campaign-image-box">
                                <div className="video-thumb-container">
                                    <img src={camp.image} alt={camp.title} className="campaign-thumb" />
                                    <div className="play-button-overlay">
                                        <div className="play-icon">▶</div>
                                    </div>
                                </div>
                            </div>
                            <div className="campaign-info-box">
                                <p className="why-choose">WHY CHOOSE {camp.brand}?</p>
                                <h2 className="campaign-title-text">{camp.title}</h2>
                                <p className="campaign-desc-text">{camp.description}</p>
                                <ul className="requirements-list">
                                    {camp.requirements.map((req, i) => (
                                        <li key={i}>
                                            <span className="req-num">{i + 1}</span>
                                            <span className="req-text">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="apply-now-btn" onClick={handleApplyNow}>Apply Now</button>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default LiveCampaigns;
