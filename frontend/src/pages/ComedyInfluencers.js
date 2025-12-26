import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComedyInfluencers.css';

function ComedyInfluencers() {
  const navigate = useNavigate();

  const comedyInfluencers = [
    { id: 81, name: 'Ashish Chanchalani', category: 'Comedy', followers: '14.6M', initials: 'AC', instagram: 'https://instagram.com/ashishchanchlani', youtube: '28.8M', engagement: '5.58%', image: 'https://www.influencer.in/wp-content/uploads/2022/04/Ashish-Chanchalani.webp' },
    { id: 82, name: 'Samay Raina', category: 'Comedy', followers: '551K', initials: 'SR', instagram: 'https://instagram.com/maisamayhoon', youtube: '1M', engagement: '2.21%', image: 'https://www.influencer.in/wp-content/uploads/2022/04/Samay-Raina.webp' },
    { id: 83, name: 'Kusha Kapila', category: 'Comedy', followers: '2.7M', initials: 'KK', instagram: 'https://instagram.com/kushakapila', youtube: '415K', engagement: '6.28%', image: 'https://www.influencer.in/wp-content/uploads/2022/04/Kusha-Kapila.webp' },
    { id: 84, name: 'Dolly Singh', category: 'Comedy', followers: '1.4M', initials: 'DS', instagram: 'https://instagram.com/dollysingh', youtube: '676K', engagement: '3.18%', image: 'https://www.influencer.in/wp-content/uploads/2022/04/Dolly-Singh.webp' },
    { id: 85, name: 'Harsh Beniwal', category: 'Comedy', followers: '5.7M', initials: 'HB', instagram: 'https://instagram.com/harshbeniwal', youtube: '15.1M', engagement: '6.13%', image: 'https://www.influencer.in/wp-content/uploads/2022/04/Harsh-Beniwal.webp' },
    { id: 86, name: 'Aishwarya Mohanraj', category: 'Comedy', followers: '662K', initials: 'AM', instagram: 'https://instagram.com/aishwaryamohanraj', youtube: '648K', engagement: '13.45%', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Aishwarya-Mohanraj.jpg' },
    { id: 87, name: 'RJ Abhinav', category: 'Comedy', followers: '2.7M', initials: 'RA', instagram: 'https://instagram.com/rjabhinav', youtube: '2.6M', engagement: '4.83%', image: 'https://www.influencer.in/wp-content/uploads/2022/03/RJ-Abhinav.jpg' },
    { id: 88, name: 'Kenny Sebastian', category: 'Comedy', followers: '1M', initials: 'KS', instagram: 'https://instagram.com/kennethseb', youtube: '2.2M', engagement: '3.43%', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Kenny-Sebastian.jpg' },
    { id: 89, name: 'Tanmay Bhatt', category: 'ComedyGaming', followers: '1.8M', initials: 'TB', instagram: 'https://instagram.com/tanmaybhat', youtube: '4.2M', engagement: '8.61%', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4-3.webp' },
  ];

  const instagramLogo = (
    <svg viewBox="0 0 448 512" width="18" height="18" className="instagram-svg">
      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );

  const handleCardClick = (influencer) => {
    navigate('/login');
  };

  const handleViewContact = (influencer) => {
    navigate('/login');
  };

  return (
    <div className="comedy-page">
      <div className="comedy-hero">
        <div className="container">
          <div className="breadcrumb">
            <span onClick={() => navigate('/')}>home</span> ›
            <span> top creators</span> ›
            <span> comedy influencers</span>
          </div>
          <h1 className="comedy-title">Top Comedy Influencers in India</h1>
          <div className="comedy-description">
            <p>Want to that little bit of amusement to your brand and make your customers chuckle a little? Well, Instagram comedians are here to slay.</p>
            <p>Comedy influencers in India have broken into the digital marketing world with a bang. Extensive fan following, crazy engaging content and a great consumption rate are some of the many factors that have helped comedy influencers on Instagram and YouTube turn into such a great marketing force.</p>
            <p>Irrespective of the discipline your brand belongs to, you can always leverage these Instagram comedians for building your brand recognition and tapping into potential prospects on a local as well as national level. One of the added benefits of using comedy influencers on Instagram for your brand campaign is the easiness that they bring to your brand.</p>
            <p>Here are some of the top comedy influencers in India that you could look to collaborate with for achieving your brand-building goals. These famous Indian comedians are all set to leverage your brand.</p>
          </div>
        </div>
      </div>

      <div className="comedy-grid-section">
        <div className="container">
          <div className="influencers-grid">
            {comedyInfluencers.map((influencer) => (
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
                  <span className="instagram-icon">{instagramLogo}</span> {influencer.followers} Followers
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

      <div className="comedy-table-section">
        <div className="container">
          <h2 className="table-title">List of Top Comedy Bloggers & Influencers in India (2024)</h2>
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
                {comedyInfluencers.map((influencer) => (
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
                    <td>{influencer.followers} Followers</td>
                    <td>{influencer.youtube} Subscribers</td>
                    <td>{influencer.engagement}</td>
                    <td>
                      <button
                        className="contact-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewContact(influencer);
                        }}
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

export default ComedyInfluencers;
