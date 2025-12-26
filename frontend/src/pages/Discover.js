import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Discover.css';

const Discover = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Fashion / Lifestyle');

  const categories = [
    'Fashion / Lifestyle',
    'Travel',
    'Food',
    'Beauty',
    'Fitness',
    'Tech',
    'Edutech',
    'Parenting',
    'Finance',
    'Gaming'
  ];

  // Sample influencer data - You can replace this with actual API calls
  const sampleInfluencers = {
    'Fashion / Lifestyle': [
      { id: 1, name: 'Sejal Kumar', category: 'Fashion/Lifestyle', followers: '860K', initials: 'SK', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', instagram: 'https://instagram.com/sejalkumar' },
      { id: 2, name: 'Komal Pandey', category: 'Fashion/Lifestyle', followers: '1.8M', initials: 'KP', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/komalpandeyofficial' },
      { id: 3, name: 'Masoom Minawala', category: 'Fashion/Lifestyle', followers: '1.2M', initials: 'MM', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/masoomminawala' },
      { id: 4, name: 'Santoshi Shetty', category: 'Fashion/Lifestyle', followers: '650K', initials: 'SS', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', instagram: 'https://instagram.com/santoshishetty' },
      { id: 5, name: 'Kritika Khurana', category: 'Fashion/Lifestyle', followers: '1.5M', initials: 'KK', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/thatbohogirl' },
      { id: 6, name: 'Aashna Shroff', category: 'Fashion/Lifestyle', followers: '1.1M', initials: 'AS', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', instagram: 'https://instagram.com/aashnashroff' },
      { id: 7, name: 'Juhi Godambe', category: 'Fashion/Lifestyle', followers: '890K', initials: 'JG', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', instagram: 'https://instagram.com/juhigodambe' },
      { id: 8, name: 'Otherwarya', category: 'Fashion/Lifestyle', followers: '420K', initials: 'OW', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', instagram: 'https://instagram.com/otherwarya' },
    ],
    'Travel': [
      { id: 9, name: 'Shivya Nath', category: 'Travel', followers: '456K', initials: 'SN', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', instagram: 'https://instagram.com/shivya' },
      { id: 10, name: 'Shenaz Treasury', category: 'Travel', followers: '780K', initials: 'ST', color: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', instagram: 'https://instagram.com/shenaztreasury' },
      { id: 11, name: 'Tanya Khanijow', category: 'Travel', followers: '690K', initials: 'TK', color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', instagram: 'https://instagram.com/tanyakhanijow' },
      { id: 12, name: 'Larissa DSa', category: 'Travel', followers: '520K', initials: 'LD', color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', instagram: 'https://instagram.com/larissadsa' },
      { id: 13, name: 'Anunay Sood', category: 'Travel', followers: '410K', initials: 'AS', color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', instagram: 'https://instagram.com/anunaysood' },
      { id: 14, name: 'Kamiya Jani', category: 'Travel', followers: '1.2M', initials: 'KJ', color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', instagram: 'https://instagram.com/kamiyajani' },
      { id: 15, name: 'Savi and Vid', category: 'Travel', followers: '890K', initials: 'SV', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/bruisedpassports' },
      { id: 16, name: 'Aishah Ahmed', category: 'Travel', followers: '380K', initials: 'AA', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/aishafahmed' },
    ],
    'Food': [
      { id: 17, name: 'Ranveer Brar', category: 'Food', followers: '2.5M', initials: 'RB', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/ranveerbrar' },
      { id: 18, name: 'Kunal Kapur', category: 'Food', followers: '1.8M', initials: 'KK', color: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', instagram: 'https://instagram.com/chefkunal' },
      { id: 19, name: 'Pooja Dhingra', category: 'Food', followers: '920K', initials: 'PD', color: 'linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%)', instagram: 'https://instagram.com/poojadhingra' },
      { id: 20, name: 'Amar Sirohi', category: 'Food', followers: '1.3M', initials: 'AS', color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', instagram: 'https://instagram.com/foodpharmer' },
      { id: 21, name: 'Saloni Kukreja', category: 'Food', followers: '580K', initials: 'SK', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', instagram: 'https://instagram.com/salonikukreja' },
      { id: 22, name: 'Harsh Goenka', category: 'Food', followers: '450K', initials: 'HG', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', instagram: 'https://instagram.com/thedelhiboy' },
      { id: 23, name: 'Saransh Goila', category: 'Food', followers: '760K', initials: 'SG', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', instagram: 'https://instagram.com/saranshgoila' },
      { id: 24, name: 'Archana Doshi', category: 'Food', followers: '390K', initials: 'AD', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/archanadoshiofficial' },
    ],
    'Beauty': [
      { id: 25, name: 'Malvika Sitlani', category: 'Beauty', followers: '1.4M', initials: 'MS', color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', instagram: 'https://instagram.com/malvikasitlani' },
      { id: 26, name: 'Debasree Banerjee', category: 'Beauty', followers: '980K', initials: 'DB', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', instagram: 'https://instagram.com/debasreee' },
      { id: 27, name: 'Shreya Jain', category: 'Beauty', followers: '1.1M', initials: 'SJ', color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', instagram: 'https://instagram.com/shreyajain28' },
      { id: 28, name: 'Jovita George', category: 'Beauty', followers: '820K', initials: 'JG', color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', instagram: 'https://instagram.com/jovitaggmu' },
      { id: 29, name: 'Sukhneet Wadhwa', category: 'Beauty', followers: '650K', initials: 'SW', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', instagram: 'https://instagram.com/sukhneet' },
      { id: 30, name: 'Roshni Bhatia', category: 'Beauty', followers: '720K', initials: 'RB', color: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', instagram: 'https://instagram.com/roshnibhatia' },
      { id: 31, name: 'Corallista', category: 'Beauty', followers: '890K', initials: 'CO', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/corallista' },
      { id: 32, name: 'Simran Bhatia', category: 'Beauty', followers: '580K', initials: 'SB', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', instagram: 'https://instagram.com/simranbhatiamakeupartist' },
    ],
    'Fitness': [
      { id: 33, name: 'Yasmin Karachiwala', category: 'Fitness', followers: '1.2M', initials: 'YK', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', instagram: 'https://instagram.com/yasminkarachiwala' },
      { id: 34, name: 'Sahil Khan', category: 'Fitness', followers: '3.5M', initials: 'SK', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', instagram: 'https://instagram.com/sahilkhan' },
      { id: 35, name: 'Jeet Selal', category: 'Fitness', followers: '980K', initials: 'JS', color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', instagram: 'https://instagram.com/himalayanjeet' },
      { id: 36, name: 'Rohit Khatri', category: 'Fitness', followers: '1.5M', initials: 'RK', color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', instagram: 'https://instagram.com/rohitkhatrifitness' },
      { id: 37, name: 'Shwetambari Shetty', category: 'Fitness', followers: '680K', initials: 'SS', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/shwetambarishetty' },
      { id: 38, name: 'Sumit Singh', category: 'Fitness', followers: '720K', initials: 'SS', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', instagram: 'https://instagram.com/sumitsingh' },
      { id: 39, name: 'Madiha Imam', category: 'Fitness', followers: '840K', initials: 'MI', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/madihaimam' },
      { id: 40, name: 'Pratik Mohite', category: 'Fitness', followers: '560K', initials: 'PM', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', instagram: 'https://instagram.com/pratikmohite' },
    ],
    'Tech': [
      { id: 41, name: 'Technical Guruji', category: 'Tech', followers: '22M', initials: 'TG', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', instagram: 'https://instagram.com/technicalguruji' },
      { id: 42, name: 'Trakin Tech', category: 'Tech', followers: '8.5M', initials: 'TT', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/trakintech' },
      { id: 43, name: 'Geeky Ranjit', category: 'Tech', followers: '6.2M', initials: 'GR', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/geekyranjit' },
      { id: 44, name: 'Beebom', category: 'Tech', followers: '4.8M', initials: 'BB', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', instagram: 'https://instagram.com/beebomco' },
      { id: 45, name: 'C4ETech', category: 'Tech', followers: '3.9M', initials: 'C4', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', instagram: 'https://instagram.com/c4etech' },
      { id: 46, name: 'Tech Burner', category: 'Tech', followers: '7.2M', initials: 'TB', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', instagram: 'https://instagram.com/techburnerofficial' },
      { id: 47, name: 'MKBHD India', category: 'Tech', followers: '2.5M', initials: 'MK', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', instagram: 'https://instagram.com/mkbhdindia' },
      { id: 48, name: 'Tech With Tim', category: 'Tech', followers: '1.8M', initials: 'TT', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', instagram: 'https://instagram.com/techwithtim' },
    ],
    'Edutech': [
      { id: 49, name: 'Alakh Pandey', category: 'Edutech', followers: '5.2M', initials: 'AP', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', instagram: 'https://instagram.com/alakh.pandey' },
      { id: 50, name: 'Khan Sir', category: 'Edutech', followers: '4.8M', initials: 'KS', color: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', instagram: 'https://instagram.com/khansirpatna' },
      { id: 51, name: 'Vedantu', category: 'Edutech', followers: '3.5M', initials: 'VE', color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', instagram: 'https://instagram.com/vedantu' },
      { id: 52, name: 'Unacademy', category: 'Edutech', followers: '6.1M', initials: 'UN', color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', instagram: 'https://instagram.com/unacademy' },
      { id: 53, name: 'Amit Bhadana', category: 'Edutech', followers: '8.9M', initials: 'AB', color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', instagram: 'https://instagram.com/theamitbhadana' },
      { id: 54, name: 'Sandeep Maheshwari', category: 'Edutech', followers: '3.2M', initials: 'SM', color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', instagram: 'https://instagram.com/sandeepmaheshwari' },
      { id: 55, name: 'Study IQ Education', category: 'Edutech', followers: '2.7M', initials: 'SI', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', instagram: 'https://instagram.com/studyiqeducation' },
      { id: 56, name: 'Dear Sir', category: 'Edutech', followers: '1.9M', initials: 'DS', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', instagram: 'https://instagram.com/dearsirofficial' },
    ],
    'Parenting': [
      { id: 57, name: 'Karanvir Bohra', category: 'Parenting', followers: '2.1M', initials: 'KB', color: 'linear-gradient(135deg, #9B59B6, #8E44AD)', instagram: 'https://instagram.com/karanvirbohra' },
      { id: 58, name: 'Kareena Kapoor', category: 'Parenting', followers: '11.5M', initials: 'KK', color: 'linear-gradient(135deg, #E74C3C, #C0392B)', instagram: 'https://instagram.com/kareenakapoorkhan' },
      { id: 59, name: 'Teejay Sidhu', category: 'Parenting', followers: '1.8M', initials: 'TS', color: 'linear-gradient(135deg, #3498DB, #2980B9)', instagram: 'https://instagram.com/bombaysunshine' },
      { id: 60, name: 'Ruchi Kaushal', category: 'Parenting', followers: '890K', initials: 'RK', color: 'linear-gradient(135deg, #F39C12, #E67E22)', instagram: 'https://instagram.com/ruchikaushal' },
      { id: 61, name: 'Smita Sabharwal', category: 'Parenting', followers: '650K', initials: 'SS', color: 'linear-gradient(135deg, #16A085, #1ABC9C)', instagram: 'https://instagram.com/smitasabharwal' },
      { id: 62, name: 'Suchitra Krishnamoorthi', category: 'Parenting', followers: '720K', initials: 'SK', color: 'linear-gradient(135deg, #E67E22, #D35400)', instagram: 'https://instagram.com/suchitrakrishnamoorthi' },
      { id: 63, name: 'Mira Rajput', category: 'Parenting', followers: '3.5M', initials: 'MR', color: 'linear-gradient(135deg, #9B59B6, #8E44AD)', instagram: 'https://instagram.com/mira.kapoor' },
      { id: 64, name: 'Soha Ali Khan', category: 'Parenting', followers: '4.2M', initials: 'SA', color: 'linear-gradient(135deg, #E74C3C, #C0392B)', instagram: 'https://instagram.com/sakpataudi' },
    ],
    'Finance': [
      { id: 65, name: 'Sharan Hegde', category: 'Finance', followers: '2.5M', initials: 'SH', color: 'linear-gradient(135deg, #27AE60, #229954)', instagram: 'https://instagram.com/financewithsharan' },
      { id: 66, name: 'Rachana Ranade', category: 'Finance', followers: '1.8M', initials: 'RR', color: 'linear-gradient(135deg, #2ECC71, #27AE60)', instagram: 'https://instagram.com/rachanaranade' },
      { id: 67, name: 'CA Rachana Phadke', category: 'Finance', followers: '980K', initials: 'RP', color: 'linear-gradient(135deg, #16A085, #1ABC9C)', instagram: 'https://instagram.com/carachana' },
      { id: 68, name: 'Ankur Warikoo', category: 'Finance', followers: '3.2M', initials: 'AW', color: 'linear-gradient(135deg, #27AE60, #229954)', instagram: 'https://instagram.com/warikoo' },
      { id: 69, name: 'Pranjal Kamra', category: 'Finance', followers: '1.5M', initials: 'PK', color: 'linear-gradient(135deg, #2ECC71, #27AE60)', instagram: 'https://instagram.com/pranjalkamra' },
      { id: 70, name: 'CA Neeraj Arora', category: 'Finance', followers: '890K', initials: 'NA', color: 'linear-gradient(135deg, #16A085, #1ABC9C)', instagram: 'https://instagram.com/caneerajarora' },
      { id: 71, name: 'Abhishek Kar', category: 'Finance', followers: '750K', initials: 'AK', color: 'linear-gradient(135deg, #27AE60, #229954)', instagram: 'https://instagram.com/abhishekkar' },
      { id: 72, name: 'Zerodha Varsity', category: 'Finance', followers: '1.2M', initials: 'ZV', color: 'linear-gradient(135deg, #2ECC71, #27AE60)', instagram: 'https://instagram.com/zerodha.varsity' },
    ],
    'Gaming': [
      { id: 73, name: 'Techno Gamerz', category: 'Gaming', followers: '18M', initials: 'TG', color: 'linear-gradient(135deg, #E74C3C, #C0392B)', instagram: 'https://instagram.com/technogamerz' },
      { id: 74, name: 'Total Gaming', category: 'Gaming', followers: '25M', initials: 'TG', color: 'linear-gradient(135deg, #C0392B, #922B21)', instagram: 'https://instagram.com/totalg4ming' },
      { id: 75, name: 'Dynamo Gaming', category: 'Gaming', followers: '10.5M', initials: 'DG', color: 'linear-gradient(135deg, #8E44AD, #7D3C98)', instagram: 'https://instagram.com/dynamo_gamingof' },
      { id: 76, name: 'Scout', category: 'Gaming', followers: '8.9M', initials: 'SC', color: 'linear-gradient(135deg, #9B59B6, #8E44AD)', instagram: 'https://instagram.com/scoutop' },
      { id: 77, name: 'Mortal', category: 'Gaming', followers: '7.2M', initials: 'MO', color: 'linear-gradient(135deg, #34495E, #2C3E50)', instagram: 'https://instagram.com/8bithehe' },
      { id: 78, name: 'CarryMinati', category: 'Gaming', followers: '12.5M', initials: 'CM', color: 'linear-gradient(135deg, #E74C3C, #C0392B)', instagram: 'https://instagram.com/carryminati' },
      { id: 79, name: 'GamerFleet', category: 'Gaming', followers: '5.8M', initials: 'GF', color: 'linear-gradient(135deg, #F39C12, #E67E22)', instagram: 'https://instagram.com/gamerfleet' },
      { id: 80, name: 'Triggered Insaan', category: 'Gaming', followers: '9.2M', initials: 'TI', color: 'linear-gradient(135deg, #E67E22, #D35400)', instagram: 'https://instagram.com/triggeredinsaan' },
    ],
  };

  useEffect(() => {
    // Load influencers for the active category
    setInfluencers(sampleInfluencers[activeCategory] || []);
  }, [activeCategory]);

  const handleInfluencerClick = (instagramUrl) => {
    window.open(instagramUrl, '_blank');
  };

  const handleCardClick = (influencer) => {
    navigate(`/influencer/${influencer.id}`);
  };

  const handleViewInsights = (e, influencer) => {
    e.stopPropagation();
    navigate(`/influencer/${influencer.id}`);
  };

  return (
    <div className="discover-page">
      <div className="container">
        <h1 className="discover-title">
          <span className="count">7,50,000+</span> Influencers{' '}
          <span className="highlight">across India</span>
        </h1>

        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="influencers-grid">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="influencer-card"
              onClick={() => handleInfluencerClick(influencer.instagram)}
            >
              <div className="influencer-image" style={{ background: influencer.color }}>
                <div className="initials">{influencer.initials}</div>
                <div className="card-overlay">
                  <div className="arrow-icon">↗</div>
                  <h3>{influencer.name}</h3>
                  <p className="category-text">{influencer.category}</p>
                  <div className="followers-badge">
                    <span className="instagram-icon">📷</span>
                    <span>{influencer.followers} Followers</span>
                  </div>
                  <button 
                    className="view-insights-btn"
                    onClick={(e) => handleViewInsights(e, influencer)}
                  >
                    View Insights
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
