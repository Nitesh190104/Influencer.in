import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfluencersSection.css';

const InfluencersSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Fashion / Lifestyle');
  const [influencers, setInfluencers] = useState([]);

  const categories = [
    'Fashion / Lifestyle', 'Travel', 'Food', 'Beauty', 'Fitness',
    'Tech', 'Comedy', 'Parenting', 'Finance', 'Gaming'
  ];

  const sampleInfluencers = {
    'Fashion / Lifestyle': [
      { id: 1, name: 'Komal Pandey', category: 'Fashion/Lifestyle', followers: '1.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Komal-Pandey.jpg' },
      { id: 2, name: 'Siddharth Batra', category: 'Fashion/Lifestyle', followers: '221K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Siddharth-Batra.jpg' },
      { id: 3, name: 'Masoom Minawala', category: 'Fashion/Lifestyle', followers: '1.1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Masoom-Minawala.webp' },
      { id: 4, name: 'Santoshi Shetty', category: 'Fashion/Lifestyle', followers: '757K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Santoshi-Shetty.webp' },
      { id: 40, name: 'Kritika Khurana', category: 'Fashion/Lifestyle', followers: '1.7M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Kritika-Khurana.jpg' },
      { id: 41, name: 'Aashna Shroff', category: 'Fashion/Lifestyle', followers: '950K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Aashna-Shroff.jpg' },
      { id: 42, name: 'Sejal Kumar', category: 'Fashion/Lifestyle', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Sejal.webp' },
      { id: 43, name: 'Sakshi Sindwani', category: 'Fashion/Lifestyle', followers: '500K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Sakshi-Sindwani.jpg' },
    ],
    'Travel': [
      { id: 5, name: 'Kritika Goel', category: 'Travel', followers: '109K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Kritika-Goel.webp' },
      { id: 6, name: 'Shenaz', category: 'Travel', followers: '882K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Shenaz.webp' },
      { id: 7, name: 'Tanya Khanijow', category: 'Travel', followers: '402K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Tanya-Khanijow.webp' },
      { id: 8, name: 'Anunay Sood', category: 'Travel', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/anunay-sood.webp' },
      { id: 44, name: 'Ankita Kumar', category: 'Travel', followers: '198K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Ankita-Kumar.webp' },
      { id: 45, name: 'Radhika Nomllers', category: 'Travel', followers: '277K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Radhika-Nomllers.webp' },
      { id: 46, name: 'Isa Khan', category: 'Travel', followers: '328K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Isa-Khan.webp' },
      { id: 47, name: 'Brinda Sharma', category: 'Travel', followers: '580K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Brinda-.webp' },
    ],
    'Food': [
      { id: 9, name: 'Ranveer Brar', category: 'Food', followers: '1.6M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/ranveer-brar.webp' },
      { id: 10, name: 'Kunal Kapur', category: 'Food', followers: '1.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/kunal-kapur.webp' },
      { id: 11, name: 'Sarah Hussain', category: 'Food', followers: '472K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/sarah-hussain.webp' },
      { id: 12, name: 'Amar Sirohi', category: 'Food', followers: '950K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/amar-sirohi.webp' },
      { id: 48, name: 'Neha Shah', category: 'Food', followers: '222K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/neha-shah.webp' },
      { id: 49, name: 'Abinas Nayak', category: 'Food', followers: '184K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/abinas-nayak.webp' },
      { id: 50, name: 'Kirti Bhoutika', category: 'Food', followers: '236K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/chef-kirti-bhoutika.webp' },
      { id: 51, name: 'Shivesh Bhatia', category: 'Food', followers: '678K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/shivesh-bhatia.webp' },
    ],
    'Beauty': [
      { id: 13, name: 'Mrunal Panchal', category: 'Beauty', followers: '3.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Mrunal-Panchal.jpg' },
      { id: 14, name: 'Somya Gupta', category: 'Beauty', followers: '849K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Somya-Gupta.jpg' },
      { id: 15, name: 'Shreya Jain', category: 'Beauty', followers: '451K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Shreya-Jain.jpg' },
      { id: 16, name: 'Malvika Sitlani', category: 'Beauty', followers: '519K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Malvika-Sitlani-.jpg' },
      { id: 52, name: 'Juhi Godambe', category: 'Beauty', followers: '504K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Juhi-Godambe.jpg' },
      { id: 53, name: 'Swati Verma', category: 'Beauty', followers: '1.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Swati-Verma.jpg' },
      { id: 54, name: 'Debasree Banerjee', category: 'Beauty', followers: '308K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Debasree-Banerjee.jpg' },
      { id: 55, name: 'Shruti Arjun Anand', category: 'Beauty', followers: '575K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Shruti-Arjun-Anand.jpg' },
    ],
    'Fitness': [
      { id: 17, name: 'Simrun Chopra', category: 'Fitness', followers: '669K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/simran.webp' },
      { id: 18, name: 'Namrata Purohit', category: 'Fitness', followers: '393K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/namrat.webp' },
      { id: 19, name: 'Yasmin Karachiwala', category: 'Fitness', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/yasmin.webp' },
      { id: 20, name: 'Ranveer Allahbadia', category: 'Fitness', followers: '2.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/2-1.jpg' },
      { id: 56, name: 'Pooja Makhija', category: 'Fitness', followers: '347K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/pooja.webp' },
      { id: 57, name: 'Luke Coutinho', category: 'Fitness', followers: '438K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/luke.webp' },
      { id: 58, name: 'Rohit Khatri', category: 'Fitness', followers: '546K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/rohit.webp' },
      { id: 59, name: 'Rujuta Diwekar', category: 'Fitness', followers: '1.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/rujuta.webp' },
    ],
    'Tech': [
      { id: 21, name: 'Gaurav Chaudhary', category: 'Tech', followers: '2.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4.jpg' },
      { id: 22, name: 'Manoj Saru', category: 'Tech', followers: '449K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/3.jpg' },
      { id: 23, name: 'TrakinTech', category: 'Tech', followers: '384K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/2.jpg' },
      { id: 24, name: 'Techno Ruhez', category: 'Tech', followers: '281K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8.jpg' },
      { id: 60, name: 'Kashif Ali', category: 'Tech', followers: '369K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/9.jpg' },
      { id: 61, name: 'Praval Sharma', category: 'Tech', followers: '99.9K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/5.jpg' },
      { id: 62, name: 'Ranjit Kumar', category: 'Tech', followers: '51.3K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/7.jpg' },
      { id: 63, name: 'Shlok Srivastava', category: 'Tech', followers: '1.1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/6.jpg' },
    ],
    'Comedy': [
      { id: 25, name: 'Bhuvan Bam', category: 'Comedy', followers: '14.8M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Bhuvan-Bam.webp' },
      { id: 26, name: 'Mostlysane', category: 'Comedy', followers: '4.6M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Prajakta-Koli.webp' },
      { id: 27, name: 'Ashish Chanchlani', category: 'Comedy', followers: '12.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Ashish-Chanchlani.webp' },
      { id: 28, name: 'CarryMinati', category: 'Comedy', followers: '14.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-3.webp' },
      { id: 64, name: 'Zakir Khan', category: 'Comedy', followers: '5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/3-3.webp' },
      { id: 65, name: 'Anubhav Singh Bassi', category: 'Comedy', followers: '3M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/6-3.webp' },
      { id: 66, name: 'Nishant Tanwar', category: 'Comedy', followers: '800K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4-2.webp' },
      { id: 67, name: 'Abhishek Upmanyu', category: 'Comedy', followers: '4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/5-3.webp' },
    ],
    'Parenting': [
      { id: 29, name: 'Ritcha Verma', category: 'Parenting', followers: '104K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/ritcha-verma.webp' },
      { id: 30, name: 'Mili Jhaveri', category: 'Parenting', followers: '151K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/mili-jhaveri.webp' },
      { id: 31, name: 'Harpreeth Suri', category: 'Parenting', followers: '118K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/harpreeth-suri.webp' },
      { id: 32, name: 'Smriti Khanna', category: 'Parenting', followers: '1.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/smriti-khanna.webp' },
      { id: 68, name: 'Saru Mukherjee Sharma', category: 'Parenting', followers: '107K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/saru-mukherjee-sharma.webp' },
      { id: 69, name: 'Yuvika Abrol', category: 'Parenting', followers: '100K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/yuvika-abrol.webp' },
      { id: 70, name: 'Anandita Agrawal', category: 'Parenting', followers: '110K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/anandita-agrawal.webp' },
      { id: 71, name: 'Prerna', category: 'Parenting', followers: '78K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/prerna.webp' },
    ],
    'Finance': [
      { id: 33, name: 'Sharan Hegde', category: 'Finance', followers: '767K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/1-1.jpg' },
      { id: 34, name: 'Rachana Ranade', category: 'Finance', followers: '438K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Rachana-Phadke-Ranade.jpg' },
      { id: 35, name: 'Ankur Warikoo', category: 'Finance', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Ankur-Warikoo.jpg' },
      { id: 36, name: 'Neha Nagar', category: 'Finance', followers: '772K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/5-1.jpg' },
      { id: 72, name: 'Pranjal Kamra', category: 'Finance', followers: '900K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/7-1.jpg' },
      { id: 73, name: 'Jay Kapoor', category: 'Finance', followers: '300K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/10-1.jpg' },
      { id: 74, name: 'Anushka Rathod', category: 'Finance', followers: '600K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-1.jpg' },
      { id: 75, name: 'CA Rachana Phadke Ranade', category: 'Finance', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Rachana-Phadke-Ranade.jpg' },
    ],
    'Gaming': [
      { id: 37, name: 'CarryMinati', category: 'Gaming', followers: '14.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-3.webp' },
      { id: 38, name: 'Nischay Malhan', category: 'Gaming', followers: '3.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/2-2.webp' },
      { id: 39, name: 'Dynamo Gaming', category: 'Gaming', followers: '2.1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4-3.webp' },
      { id: 40, name: 'Anshu Bisht', category: 'Gaming', followers: '443K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/1-3.webp' },
      { id: 76, name: 'Mortal', category: 'Gaming', followers: '5.3M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/9-2.webp' },
      { id: 77, name: 'Scout', category: 'Gaming', followers: '4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/10-2.webp' },
      { id: 78, name: 'Payal Gaming', category: 'Gaming', followers: '2.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/12-2.webp' },
      { id: 79, name: 'Mythpat', category: 'Gaming', followers: '3M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/6-2.webp' },
    ],
  };

  useEffect(() => {
    setInfluencers(sampleInfluencers[activeCategory] || []);
  }, [activeCategory]);

  const instagramLogo = (
    <svg viewBox="0 0 448 512" width="16" height="16" className="instagram-icon-svg">
      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );

  return (
    <section className="influencers-section">
      <div className="container">
        <h2>7,50,000+ Influencers <span className="highlight">across India</span></h2>

        <div className="category-tabs">
          {categories.map((category) => (
            <div
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="influencers-grid">
          {influencers.map((inf) => (
            <div key={inf.id} className="influencer-card" onClick={() => navigate('/login')}>
              <div className="influencer-photo">
                <img src={inf.image} alt={inf.name} className="influencer-img" />
              </div>
              <div className="influencer-info-compact">
                <h3 className="inf-name-small">{inf.name}</h3>
                <div className="inf-stats-small">
                  <span className="insta-icon-small">{instagramLogo}</span>
                  <span className="followers-count-small">{inf.followers} Followers</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-more">
          <button className="view-more-btn" onClick={() => navigate('/creators')}>VIEW MORE</button>
        </div>
      </div>
    </section>
  );
};

export default InfluencersSection;
