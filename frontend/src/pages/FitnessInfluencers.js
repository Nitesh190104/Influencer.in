import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FitnessInfluencers.css';

function FitnessInfluencers() {
    const navigate = useNavigate();

    const fitnessInfluencers = [
        {
            id: 701,
            name: 'Simrun Chopra',
            category: 'Fitness',
            followers: '669K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/simran.webp'
        },
        {
            id: 702,
            name: 'Pooja Makhija',
            category: 'Fitness',
            followers: '347K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/pooja.webp'
        },
        {
            id: 703,
            name: 'Namrata Purohit',
            category: 'Fitness',
            followers: '393K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/namrat.webp'
        },
        {
            id: 704,
            name: 'Luke Coutinho',
            category: 'Fitness',
            followers: '438K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/luke.webp'
        },
        {
            id: 705,
            name: 'Rohit Khatri',
            category: 'Fitness',
            followers: '546K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/rohit.webp'
        },
        {
            id: 706,
            name: 'Varun Verma',
            category: 'Fitness',
            followers: '736K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/varun.webp'
        },
        {
            id: 707,
            name: 'Yasmin Karachiwala',
            category: 'Fitness',
            followers: '1M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/yasmin.webp'
        },
        {
            id: 708,
            name: 'Biglee Murali',
            category: 'Fitness',
            followers: '1.1M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/biglee.webp'
        },
        {
            id: 709,
            name: 'Rujuta Diwekar',
            category: 'Fitness',
            followers: '1.2M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/rujuta.webp'
        },
        {
            id: 710,
            name: 'Ranveer Allahbadia',
            category: 'Fitness',
            followers: '2.5M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/2-1.jpg'
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
        <div className="fitness-page">
            <div className="fitness-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <span onClick={() => navigate('/')}>home</span> ›
                        <span> top creators</span> ›
                        <span> fitness influencers</span>
                    </div>
                    <div className="hero-content">
                        <div className="hero-text-content">
                            <h1 className="fitness-title">Top Fitness Influencers<br />in India</h1>
                            <div className="fitness-description">
                                <p>Fitness and health are arguably the most essential aspects of today's busy lifestyle. With so many people looking to turn a new page in their lives in terms of being healthier, fitness influencers have become a major force on most social media platforms.</p>
                                <p>From extensive workout videos to healthy binging options, these Indian fitness influencers have it all on their social media handles.</p>
                                <p>Instagram fitness influencers have created a great space for people to build an enriched relationship with fitness and these top fitness influencers in India act as a fine bridge for it.</p>
                                <p>Given that many people following crossfit influencers and Instagram fitness influencers are tuning in on similar videos on YouTube, a plethora of marketing opportunities have opened up especially for fitness brands to leverage.</p>
                            </div>
                        </div>
                        <div className="hero-image-content">
                            <div className="fitness-illustration">
                                {/* Placeholder for illustration */}
                                🏋️‍♀️ 🥗 🧘‍♂️
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Banner Strip */}
            <div className="cta-banner-strip">
                <div className="container">
                    <div className="cta-content">
                        <p className="cta-text">If you are looking to improve your brand's digital and localised presence, these top fitness influencers in India could be exactly what you are looking for!</p>
                        <div className="cta-actions">
                            <button className="join-community-btn" onClick={handleJoinCommunity}>
                                Join our community
                            </button>
                            <div className="app-buttons">
                                <span className="app-icon" onClick={handleJoinCommunity}>▶️</span>
                                <span className="app-icon" onClick={handleJoinCommunity}><svg viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg></span>
                            </div>
                            <span className="get-in-touch-link" onClick={handleProtectedAction}>Get in Touch</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fitness-grid-section">
                <div className="container">
                    <div className="influencers-grid">
                        {fitnessInfluencers.map((influencer) => (
                            <div
                                key={influencer.id}
                                className="influencer-card"
                            >
                                <div className="influencer-image-wrapper">
                                    <img src={influencer.image} alt={influencer.name} className="influencer-img" />
                                </div>
                                <h3 className="influencer-name">{influencer.name}</h3>
                                <p className="influencer-category">{influencer.category}</p>
                                <div className="influencer-followers">
                                    <span className="instagram-icon">{instagramLogo}</span> {influencer.followers}
                                </div>
                                <button
                                    className="view-insights-button"
                                    onClick={() => handleCardClick(influencer)}
                                >
                                    View Insights
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fitness-table-section">
                <div className="container">
                    <h2 className="table-title">List of Top Fitness Bloggers & Influencers in India (2024)</h2>
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
                                {fitnessInfluencers.map((influencer) => (
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
                                        <td>500K Subscribers</td>
                                        <td>1.2%</td>
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
        </div>
    );
}

export default FitnessInfluencers;
