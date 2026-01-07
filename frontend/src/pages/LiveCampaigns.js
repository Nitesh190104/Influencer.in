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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/blackbuck.png",
            videoLink: "https://www.youtube.com/watch?v=q_ayG5L9aRI",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/TataCLiQ.png",
            videoLink: "https://www.youtube.com/watch?v=xvKlZ08AQf4",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/GOCOLORS.webp",
            videoLink: "https://www.youtube.com/watch?v=_lDzNA7xLXg",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/PropahLady.webp",
            videoLink: "https://www.youtube.com/watch?v=LR0LuWCa1KM",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/wetter.png",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Leap-Finance.webp",
            videoLink: "https://www.youtube.com/watch?v=h91uH2kJ0sE",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/flipkart.png",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/dabur.webp",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Q-Jobs.webp",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Gamezy-camp.png",
            videoLink: "https://www.youtube.com/watch?v=lGodK4WG4l0",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Nayra-Influencer-Campaign.webp",
            videoLink: "https://www.instagram.com/reel/CbhuINeggoC/?utm_medium=copy_link",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/sunteck.png",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Jodii-Campaign-BM.webp",
            videoLink: "https://www.youtube.com/watch?v=-jpLpCUTfF4",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Sony-Music-Campaign.webp",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/zest.png",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/juiter-campaigns.webp",
            videoLink: "https://www.instagram.com/reel/CVGCRniFkbl/",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/dhan.webp",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/battleground.png",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/Clash-of-Titans-campaign-1.webp",
            videoLink: "https://www.youtube.com/watch?v=PCi6_9dmK3Q",
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
            image: "https://www.influencer.in/wp-content/uploads/2023/03/dhani.webp",
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
                                {camp.videoLink ? (
                                    <a href={camp.videoLink} target="_blank" rel="noopener noreferrer" className="campaign-video-link">
                                        <div className="video-thumb-container">
                                            <img src={camp.image} alt={camp.title} className="campaign-thumb" />
                                        </div>
                                    </a>
                                ) : (
                                    <div className="video-thumb-container">
                                        <img src={camp.image} alt={camp.title} className="campaign-thumb" />
                                    </div>
                                )}
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
