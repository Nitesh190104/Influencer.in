import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GamingInfluencers.css';

function GamingInfluencers() {
    const navigate = useNavigate();

    const gamingInfluencers = [
        {
            id: 101,
            name: 'Anshu Bisht',
            category: 'Gaming',
            followers: '443K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/1-3.webp'
        },
        {
            id: 102,
            name: 'Nischay Malhan',
            category: 'Gaming',
            followers: '3.2M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/2-2.webp'
        },
        {
            id: 103,
            name: 'Rony Dasgupta',
            category: 'Gaming',
            followers: '721K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/3-2.webp'
        },
        {
            id: 104,
            name: 'Dyanmo Gaming',
            category: 'Gaming',
            followers: '2.1M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/4-3.webp'
        },
        {
            id: 105,
            name: 'Lokesh Gamer',
            category: 'Gaming',
            followers: '3M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/5-3.webp'
        },
        {
            id: 106,
            name: 'A_S gaming',
            category: 'Gaming',
            followers: '1.7M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/6-3-1.jpg'
        },
        {
            id: 107,
            name: 'Techno Gamerz',
            category: 'Gaming',
            followers: '1.8M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/7-2.webp'
        },
        {
            id: 108,
            name: 'CarryMinati',
            category: 'Gaming',
            followers: '14.2M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-3.webp'
        },
        {
            id: 109,
            name: 'Tanmay Bhatt',
            category: 'ComedyGaming',
            followers: '1.5M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/9-3.webp'
        },
        {
            id: 110,
            name: 'MythPat',
            category: 'Gaming',
            followers: '1.7M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/10-3.webp'
        }
    ];

    const instagramLogo = (
        <svg viewBox="0 0 448 512" width="18" height="18" className="instagram-svg">
            <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
    );

    const handleCardClick = (influencer) => {
        navigate('/login');
    };

    const handleJoinCommunity = (e) => {
        e.preventDefault();
        navigate('/creators');
    };

    const handleProtectedAction = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="gaming-page">
            <div className="gaming-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <span onClick={() => navigate('/')}>home</span> ›
                        <span> top creators</span> ›
                        <span> gaming influencers</span>
                    </div>
                    <div className="hero-content">
                        <div className="hero-text-content">
                            <h1 className="gaming-title">Top Gaming Influencers<br />in India</h1>
                            <div className="gaming-description">
                                <p>With crazy live streams, amazing commentary and a whole lot of adrenaline rush, game influencers can be a great asset to boost your brand's visibility. Gaming influencers have some of the most niched audiences who are loyal and consume their content on a daily basis.</p>
                                <p>Gaming influencers have a great engagement with their followers and this guarantees good leverage for brands collaborating with the best gaming influencers in India.</p>
                                <p>Thus, brands can try and leverage the top Indian gamers for building awareness and some level of credibility through influencer marketing campaigns.</p>
                                <p>We have curated a list of the top gaming influencers in India for you to work with by choosing which one best suits your brand's mage.</p>
                            </div>

                        </div>

                        <div className="hero-image-content">
                            {/* Placeholder for the gamer illustration from screenshot */}
                            <div className="gamer-illustration">
                                🎮 🎧 🕹️
                                {/* You would put an <img> here */}
                            </div>

                            <div className="hero-actions">
                                <button className="join-community-btn" onClick={handleJoinCommunity}>
                                    Join our community
                                </button>
                                <div className="app-buttons">
                                    <span className="app-icon" onClick={handleJoinCommunity}>▶️</span> {/* Play Store placeholder */}
                                    <span className="app-icon" onClick={handleJoinCommunity}><svg viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg></span> {/* Apple placeholder */}
                                </div>
                                <span className="get-in-touch-link" onClick={handleProtectedAction}>Get in Touch</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="gaming-grid-section">
                <div className="container">
                    <h3 className="section-subtitle">These top Indian gamers are all set to take your brand's online presence to the next level.</h3>
                    <div className="influencers-grid">
                        {gamingInfluencers.map((influencer) => (
                            <div
                                key={influencer.id}
                                className="influencer-card"
                            >
                                <div className="influencer-image-wrapper">
                                    <img src={influencer.image} alt={influencer.name} className="influencer-img" />
                                    <div className="influencer-overlay">
                                        <div className="overlay-content">
                                            <h3 className="overlay-name">{influencer.name}</h3>
                                            <p className="overlay-category">{influencer.category}</p>
                                            <div className="overlay-followers">
                                                <span className="instagram-icon">{instagramLogo}</span>
                                                <span>{influencer.followers}</span>
                                            </div>
                                            <button
                                                className="overlay-insights-button"
                                                onClick={() => handleCardClick(influencer)}
                                            >
                                                View Insights
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="gaming-table-section">
                <div className="container">
                    <h2 className="table-title">List of Top Gaming Bloggers & Influencers in India (2024)</h2>
                    <div className="table-wrapper">
                        <table className="influencers-table">
                            <thead>
                                <tr>
                                    <th>Influencer Name</th>
                                    <th>Category/Industry</th>
                                    <th>Instagram Followers</th>
                                    <th>Youtube Subscribers</th>
                                    <th>Engagement Rate</th>
                                    <th>Contact Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gamingInfluencers.map((influencer) => (
                                    <tr key={influencer.id}>
                                        <td className="name-cell">
                                            <div className="table-profile">
                                                <div className="table-image-wrapper">
                                                    <img src={influencer.image} alt={influencer.name} className="table-img" />
                                                </div>
                                                <span>{influencer.name}</span>
                                            </div>
                                        </td>
                                        <td>{influencer.category}</td>
                                        <td>{influencer.followers}</td>
                                        <td>10M Subscribers</td> {/* Hardcoded for demo/placeholder */}
                                        <td>7.20%</td> {/* Hardcoded for demo/placeholder */}
                                        <td>
                                            <button
                                                className="contact-btn"
                                                onClick={handleProtectedAction}
                                            >
                                                View Contact
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default GamingInfluencers;
