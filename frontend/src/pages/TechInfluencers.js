import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TechInfluencers.css';

function TechInfluencers() {
    const navigate = useNavigate();

    const techInfluencers = [
        {
            id: 901,
            name: 'Harsh',
            category: 'Tech',
            followers: '28.3K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/1.jpg'
        },
        {
            id: 902,
            name: 'Kashif Ali',
            category: 'Tech',
            followers: '369K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/9.jpg'
        },
        {
            id: 903,
            name: 'Manoj Saru',
            category: 'Tech',
            followers: '449K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/3.jpg'
        },
        {
            id: 904,
            name: 'Guiding Tech',
            category: 'Tech',
            followers: '70.5K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/10.jpg'
        },
        {
            id: 905,
            name: 'Praval Sharma',
            category: 'Tech',
            followers: '99.9K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/5.jpg'
        },
        {
            id: 906,
            name: 'Techno Ruhez',
            category: 'Tech',
            followers: '281K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/8.jpg'
        },
        {
            id: 907,
            name: 'TrakinTech',
            category: 'Tech',
            followers: '384K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/2.jpg'
        },
        {
            id: 908,
            name: 'Ranjit Kumar',
            category: 'Tech',
            followers: '51.3K Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/7.jpg'
        },
        {
            id: 909,
            name: 'Gaurav Chaudhary',
            category: 'Tech',
            followers: '2.4M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/4.jpg'
        },
        {
            id: 910,
            name: 'Shlok Srivastava',
            category: 'Tech',
            followers: '1.1M Followers',
            image: 'https://www.influencer.in/wp-content/uploads/2022/03/6.jpg'
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
        <div className="tech-page">
            <div className="tech-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <span onClick={() => navigate('/')}>home</span> ›
                        <span> top creators</span> ›
                        <span> technology influencers</span>
                    </div>
                    <div className="hero-content">
                        <div className="hero-text-content">
                            <h1 className="tech-title">Top Tech Influencers<br />in India</h1>
                            <div className="tech-description">
                                <p>Technology and AI are trends that are here to stay! With entire businesses running online, technology influencers have escalated to become a powerful presence in the digital world.</p>
                                <p>With creative content on DIY software tips and insightful videos on how to use numerous software and tools efficiently, these tech influencers in India have gained a good amount of follower base who consume their content almost on a daily basis. These Tech influencers are largely sought after on social media by the tech geeks.</p>
                                <p>If you are a brand looking to tap into localised audiences and also boost your brand's virtual presence, you should consider leveraging the services of some of the top tech influencers on Instagram, YouTube and Facebook who are introduced below.</p>
                            </div>
                        </div>
                        <div className="hero-image-content">
                            <div className="tech-illustration">
                                {/* Placeholder for illustration */}
                                💻 🤖 🚀
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Banner Strip */}
            <div className="cta-banner-strip">
                <div className="container">
                    <div className="cta-content">
                        <p className="cta-text">There are quite a few tech influencers, India who are here to take your brand's online value spiralling upwards.</p>
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

            <div className="tech-grid-section">
                <div className="container">
                    <div className="influencers-grid">
                        {techInfluencers.map((influencer) => (
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

            <div className="tech-table-section">
                <div className="container">
                    <h2 className="table-title">List of Top Technology Bloggers & Influencers in India (2024)</h2>
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
                                {techInfluencers.map((influencer) => (
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
                                        <td>1.5M Subscribers</td>
                                        <td>2.5%</td>
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

export default TechInfluencers;
