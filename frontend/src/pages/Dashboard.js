import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import DashboardFeatures from '../components/DashboardFeatures';

const Dashboard = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Fashion / Lifestyle');

  const banners = [
    {
      id: '01',
      title: "Collaborating with 500+ Gaming streamers for BGMI to drive results",
      cta: "Talk to us",
      image: "https://www.influencer.in/wp-content/uploads/2024/09/Homepage-Banner.png",
      bgColor: "linear-gradient(135deg, #422144 0%, #832765 100%)"
    },
    {
      id: '02',
      title: "Check out our Mobile Version for on-the-go influencer discovery",
      cta: "Try Now",
      image: "https://www.influencer.in/wp-content/uploads/2024/09/Mobile-Version.jpg",
      bgColor: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)"
    },
    {
      id: '03',
      title: "Teaming up with celebrities for Samsonite and reaching a whopping 100 audience",
      cta: "Talk to us",
      image: "https://www.influencer.in/wp-content/uploads/2024/02/samsonite-banner.webp",
      bgColor: "linear-gradient(135deg, #1a2a44 0%, #2a4483 100%)"
    },
    {
      id: '04',
      title: "70% of brands have increased their influencer marketing spends in 2025",
      cta: "Read More!",
      image: "https://www.influencer.in/wp-content/uploads/2023/10/banners2.webp",
      bgColor: "linear-gradient(135deg, #4A2B21 0%, #832742 100%)"
    }
  ];

  const [activeBanner, setActiveBanner] = useState(0);

  const categories = [
    'Fashion / Lifestyle',
    'Travel',
    'Food',
    'Beauty',
    'Fitness',
    'Tech',
    'Comedy',
    'Parenting',
    'Finance',
    'Gaming'
  ];

  const sampleInfluencers = {
    'Fashion / Lifestyle': [
      { id: 1, name: 'Komal Pandey', category: 'Fashion/Lifestyle', followers: '1.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Komal-Pandey.jpg', instagram: 'https://instagram.com/komalpandeyofficial' },
      { id: 2, name: 'Siddharth Batra', category: 'Fashion/Lifestyle', followers: '221K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Siddharth-Batra.jpg', instagram: 'https://instagram.com/siddharthbatra' },
      { id: 3, name: 'Masoom Minawala', category: 'Fashion/Lifestyle', followers: '1.1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Masoom-Minawala.webp', instagram: 'https://instagram.com/masoomminawala' },
      { id: 4, name: 'Santoshi Shetty', category: 'Fashion/Lifestyle', followers: '757K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Santoshi-Shetty.webp', instagram: 'https://instagram.com/santoshishetty' },
      { id: 5, name: 'Kritika Khurana', category: 'Fashion/Lifestyle', followers: '1.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Kritika-Khurana.jpg', instagram: 'https://instagram.com/thatbohogirl' },
      { id: 6, name: 'Aashna Shroff', category: 'Fashion/Lifestyle', followers: '913K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Aashna-Shroff.jpg', instagram: 'https://instagram.com/aashnashroff' },
      { id: 7, name: 'Sejal Kumar', category: 'Fashion/Lifestyle', followers: '860K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Sejal.webp', instagram: 'https://instagram.com/sejalkumar' },
      { id: 8, name: 'Sakshi Sindwani', category: 'Fashion/Lifestyle', followers: '469K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Sakshi-Sindwani.jpg', instagram: 'https://instagram.com/sakshisindwani' },
    ],
    'Travel': [
      { id: 9, name: 'Kritika Goel', category: 'Travel', followers: '109K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Kritika-Goel.webp', instagram: 'https://instagram.com/kritikagoel' },
      { id: 10, name: 'Shenaz', category: 'Travel', followers: '882K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Shenaz.webp', instagram: 'https://instagram.com/shenaztreasury' },
      { id: 11, name: 'Tanya Khanijow', category: 'Travel', followers: '402K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Tanya-Khanijow.webp', instagram: 'https://instagram.com/tanyakhanijow' },
      { id: 12, name: 'Anunay Sood', category: 'Travel', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/anunay-sood.webp', instagram: 'https://instagram.com/anunaysood' },
      { id: 44, name: 'Ankita Kumar', category: 'Travel', followers: '198K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Ankita-Kumar.webp', instagram: 'https://instagram.com/ankita' },
      { id: 45, name: 'Radhika Nomllers', category: 'Travel', followers: '277K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Radhika-Nomllers.webp', instagram: 'https://instagram.com/radhika' },
      { id: 46, name: 'Isa Khan', category: 'Travel', followers: '328K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Isa-Khan.webp', instagram: 'https://instagram.com/isa' },
      { id: 47, name: 'Brinda Sharma', category: 'Travel', followers: '580K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Brinda-.webp', instagram: 'https://instagram.com/brinda' },
    ],
    'Food': [
      { id: 13, name: 'Ranveer Brar', category: 'Food', followers: '1.6M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/ranveer-brar.webp', instagram: 'https://instagram.com/ranveerbrar' },
      { id: 14, name: 'Kunal Kapur', category: 'Food', followers: '1.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/kunal-kapur.webp', instagram: 'https://instagram.com/chefkunal' },
      { id: 15, name: 'Sarah Hussain', category: 'Food', followers: '472K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/sarah-hussain.webp', instagram: 'https://instagram.com/sarahhussain' },
      { id: 16, name: 'Amar Sirohi', category: 'Food', followers: '950K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/amar-sirohi.webp', instagram: 'https://instagram.com/amar' },
      { id: 48, name: 'Neha Shah', category: 'Food', followers: '222K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/neha-shah.webp', instagram: 'https://instagram.com/neha' },
      { id: 49, name: 'Abinas Nayak', category: 'Food', followers: '184K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/abinas-nayak.webp', instagram: 'https://instagram.com/abinas' },
      { id: 50, name: 'Kirti Bhoutika', category: 'Food', followers: '236K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/chef-kirti-bhoutika.webp', instagram: 'https://instagram.com/kirti' },
      { id: 51, name: 'Shivesh Bhatia', category: 'Food', followers: '678K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/shivesh-bhatia.webp', instagram: 'https://instagram.com/shivesh' },
    ],
    'Beauty': [
      { id: 17, name: 'Mrunal Panchal', category: 'Beauty', followers: '3.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Mrunal-Panchal.jpg', instagram: 'https://instagram.com/mrunalpanchal' },
      { id: 18, name: 'Somya Gupta', category: 'Beauty', followers: '849K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Somya-Gupta.jpg', instagram: 'https://instagram.com/somyagupta' },
      { id: 19, name: 'Shreya Jain', category: 'Beauty', followers: '451K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Shreya-Jain.jpg', instagram: 'https://instagram.com/shreyajain28' },
      { id: 20, name: 'Malvika Sitlani', category: 'Beauty', followers: '519K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Malvika-Sitlani-.jpg', instagram: 'https://instagram.com/malvikasitlani' },
      { id: 52, name: 'Juhi Godambe', category: 'Beauty', followers: '504K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Juhi-Godambe.jpg', instagram: 'https://instagram.com/juhi' },
      { id: 53, name: 'Swati Verma', category: 'Beauty', followers: '1.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Swati-Verma.jpg', instagram: 'https://instagram.com/swati' },
      { id: 54, name: 'Debasree Banerjee', category: 'Beauty', followers: '308K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Debasree-Banerjee.jpg', instagram: 'https://instagram.com/debasree' },
      { id: 55, name: 'Shruti Arjun Anand', category: 'Beauty', followers: '575K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Shruti-Arjun-Anand.jpg', instagram: 'https://instagram.com/shruti' },
    ],
    'Fitness': [
      { id: 21, name: 'Simrun Chopra', category: 'Fitness', followers: '669K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/simran.webp', instagram: 'https://instagram.com/simrunchopra' },
      { id: 22, name: 'Namrata Purohit', category: 'Fitness', followers: '393K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/namrat.webp', instagram: 'https://instagram.com/namratapurohit' },
      { id: 23, name: 'Yasmin Karachiwala', category: 'Fitness', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/yasmin.webp', instagram: 'https://instagram.com/yasmin' },
      { id: 24, name: 'Ranveer Allahbadia', category: 'Fitness', followers: '2.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/2-1.jpg', instagram: 'https://instagram.com/beerbiceps' },
      { id: 56, name: 'Pooja Makhija', category: 'Fitness', followers: '347K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/pooja.webp', instagram: 'https://instagram.com/pooja' },
      { id: 57, name: 'Luke Coutinho', category: 'Fitness', followers: '438K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/luke.webp', instagram: 'https://instagram.com/luke' },
      { id: 58, name: 'Rohit Khatri', category: 'Fitness', followers: '546K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/rohit.webp', instagram: 'https://instagram.com/rohit' },
      { id: 59, name: 'Rujuta Diwekar', category: 'Fitness', followers: '1.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/rujuta.webp', instagram: 'https://instagram.com/rujuta' },
    ],
    'Tech': [
      { id: 25, name: 'Gaurav Chaudhary', category: 'Tech', followers: '2.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4.jpg', instagram: 'https://instagram.com/technicalguruji' },
      { id: 26, name: 'Manoj Saru', category: 'Tech', followers: '449K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/3.jpg', instagram: 'https://instagram.com/manojsaru' },
      { id: 27, name: 'TrakinTech', category: 'Tech', followers: '384K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/2.jpg', instagram: 'https://instagram.com/trakintech' },
      { id: 28, name: 'Techno Ruhez', category: 'Tech', followers: '281K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8.jpg', instagram: 'https://instagram.com/technoruhez' },
      { id: 60, name: 'Kashif Ali', category: 'Tech', followers: '369K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/9.jpg', instagram: 'https://instagram.com/kashif' },
      { id: 61, name: 'Praval Sharma', category: 'Tech', followers: '99.9K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/5.jpg', instagram: 'https://instagram.com/praval' },
      { id: 62, name: 'Ranjit Kumar', category: 'Tech', followers: '51.3K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/7.jpg', instagram: 'https://instagram.com/ranjit' },
      { id: 63, name: 'Shlok Srivastava', category: 'Tech', followers: '1.1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/6.jpg', instagram: 'https://instagram.com/shlok' },
    ],
    'Comedy': [
      { id: 29, name: 'Bhuvan Bam', category: 'Comedy', followers: '14.8M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Bhuvan-Bam.webp', instagram: 'https://instagram.com/bhuvan.bam' },
      { id: 30, name: 'Mostlysane', category: 'Comedy', followers: '4.6M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Prajakta-Koli.webp', instagram: 'https://instagram.com/mostlysane' },
      { id: 31, name: 'Ashish Chanchlani', category: 'Comedy', followers: '12.4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Ashish-Chanchlani.webp', instagram: 'https://instagram.com/ashishchanchlani' },
      { id: 32, name: 'CarryMinati', category: 'Comedy', followers: '14.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-3.webp', instagram: 'https://instagram.com/carryminati' },
      { id: 64, name: 'Zakir Khan', category: 'Comedy', followers: '5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/3-3.webp', instagram: 'https://instagram.com/zakir' },
      { id: 65, name: 'Anubhav Singh Bassi', category: 'Comedy', followers: '3M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/6-3.webp', instagram: 'https://instagram.com/bassi' },
      { id: 66, name: 'Nishant Tanwar', category: 'Comedy', followers: '800K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4-2.webp', instagram: 'https://instagram.com/nishant' },
      { id: 67, name: 'Abhishek Upmanyu', category: 'Comedy', followers: '4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/5-3.webp', instagram: 'https://instagram.com/abhishek' },
    ],
    'Parenting': [
      { id: 33, name: 'Ritcha Verma', category: 'Parenting', followers: '104K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/ritcha-verma.webp', instagram: 'https://instagram.com/ritchaverma' },
      { id: 34, name: 'Mili Jhaveri', category: 'Parenting', followers: '151K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/mili-jhaveri.webp', instagram: 'https://instagram.com/milijhaveri' },
      { id: 35, name: 'Harpreeth Suri', category: 'Parenting', followers: '118K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/harpreeth-suri.webp', instagram: 'https://instagram.com/momwearsprada' },
      { id: 36, name: 'Smriti Khanna', category: 'Parenting', followers: '1.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/smriti-khanna.webp', instagram: 'https://instagram.com/smritikhanna' },
      { id: 68, name: 'Saru Mukherjee Sharma', category: 'Parenting', followers: '107K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/saru-mukherjee-sharma.webp', instagram: 'https://instagram.com/saru' },
      { id: 69, name: 'Yuvika Abrol', category: 'Parenting', followers: '100K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/yuvika-abrol.webp', instagram: 'https://instagram.com/yuvika' },
      { id: 70, name: 'Anandita Agrawal', category: 'Parenting', followers: '110K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/anandita-agrawal.webp', instagram: 'https://instagram.com/anandita' },
      { id: 71, name: 'Prerna', category: 'Parenting', followers: '78K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/prerna.webp', instagram: 'https://instagram.com/prerna' },
    ],
    'Finance': [
      { id: 37, name: 'Sharan Hegde', category: 'Finance', followers: '767K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/1-1.jpg', instagram: 'https://instagram.com/financewithsharan' },
      { id: 38, name: 'Rachana Ranade', category: 'Finance', followers: '438K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Rachana-Phadke-Ranade.jpg', instagram: 'https://instagram.com/rachanaranade' },
      { id: 39, name: 'Ankur Warikoo', category: 'Finance', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Ankur-Warikoo.jpg', instagram: 'https://instagram.com/warikoo' },
      { id: 40, name: 'Neha Nagar', category: 'Finance', followers: '772K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/5-1.jpg', instagram: 'https://instagram.com/nehanagar' },
      { id: 72, name: 'Pranjal Kamra', category: 'Finance', followers: '900K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/7-1.jpg', instagram: 'https://instagram.com/pranjal' },
      { id: 73, name: 'Jay Kapoor', category: 'Finance', followers: '300K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/10-1.jpg', instagram: 'https://instagram.com/jay' },
      { id: 74, name: 'Anushka Rathod', category: 'Finance', followers: '600K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-1.jpg', instagram: 'https://instagram.com/anushka' },
      { id: 75, name: 'CA Rachana Phadke Ranade', category: 'Finance', followers: '1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/Rachana-Phadke-Ranade.jpg', instagram: 'https://instagram.com/rachana' },
    ],
    'Gaming': [
      { id: 41, name: 'CarryMinati', category: 'Gaming', followers: '14.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/8-3.webp', instagram: 'https://instagram.com/carryminati' },
      { id: 42, name: 'Nischay Malhan', category: 'Gaming', followers: '3.2M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/2-2.webp', instagram: 'https://instagram.com/triggeredinsaan' },
      { id: 43, name: 'Dynamo Gaming', category: 'Gaming', followers: '2.1M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/4-3.webp', instagram: 'https://instagram.com/dynamo_gamingof' },
      { id: 44, name: 'Anshu Bisht', category: 'Gaming', followers: '443K', image: 'https://www.influencer.in/wp-content/uploads/2022/03/1-3.webp', instagram: 'https://instagram.com/anshubisht' },
      { id: 76, name: 'Mortal', category: 'Gaming', followers: '5.3M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/9-2.webp', instagram: 'https://instagram.com/mortal' },
      { id: 77, name: 'Scout', category: 'Gaming', followers: '4M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/10-2.webp', instagram: 'https://instagram.com/scout' },
      { id: 78, name: 'Payal Gaming', category: 'Gaming', followers: '2.5M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/12-2.webp', instagram: 'https://instagram.com/payal' },
      { id: 79, name: 'Mythpat', category: 'Gaming', followers: '3M', image: 'https://www.influencer.in/wp-content/uploads/2022/03/6-2.webp', instagram: 'https://instagram.com/mythpat' },
    ],
  };

  useEffect(() => {
    setInfluencers(sampleInfluencers[activeCategory] || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);


  const handleCardClick = (influencer) => {
    navigate(`/influencer/${influencer.id}`);
  };

  const handleViewInsights = (e, influencer) => {
    e.stopPropagation();
    navigate(`/influencer/${influencer.id}`);
  };

  const instagramLogo = (
    <svg viewBox="0 0 448 512" width="16" height="16" className="instagram-icon-svg">
      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );

  return (
    <div className="dashboard-page">
      {/* Hero Carousel Section */}
      <section className="hero-carousel-section" style={{ background: banners[activeBanner].bgColor }}>
        <div className="carousel-container container">
          <div className="carousel-left">
            <div className="social-sidebar">
              <span className="social-dot">f</span>
              <span className="social-dot">ig</span>
              <span className="social-dot">yt</span>
            </div>
            <div className="carousel-nav">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`nav-item ${activeBanner === index ? 'active' : ''}`}
                  onClick={() => setActiveBanner(index)}
                >
                  <span className="nav-number">{banner.id}</span>
                  <div className="nav-line"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-middle">
            <div className="image-frame">
              <img key={activeBanner} src={banners[activeBanner].image} alt="Banner" className="banner-img" />
            </div>
          </div>

          <div className="carousel-right">
            <h1 className="banner-title">
              {banners[activeBanner].title}
            </h1>
            <button className="banner-cta-btn">
              {banners[activeBanner].cta}
            </button>
          </div>

          <div className="enquire-now-tag">
            <span>ENQUIRE NOW</span>
          </div>
        </div>
      </section>

      <DashboardFeatures />

      {/* Influencer Grid Section */}
      <section className="influencer-discovery-section">
        <div className="container">
          <h2 className="discovery-title">7,50,000+ Influencers across India</h2>

          <div className="category-tabs-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="influencers-grid">
            {influencers.map((inf) => (
              <div key={inf.id} className="influencer-card" onClick={() => handleCardClick(inf)}>
                <div className="influencer-image-wrapper">
                  {inf.image ? (
                    <img src={inf.image} alt={inf.name} className="influencer-img" />
                  ) : (
                    <div className="influencer-initials" style={{ backgroundColor: '#FDB714' }}>
                      {inf.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="influencer-info">
                  <h3 className="inf-name">{inf.name}</h3>
                  <p className="inf-category">{inf.category}</p>
                  <div className="inf-stats">
                    <span className="insta-icon">{instagramLogo}</span>
                    <span className="followers-count">{inf.followers} Followers</span>
                  </div>
                  <button
                    className="view-insights-btn"
                    onClick={(e) => handleViewInsights(e, inf)}
                  >
                    View Insights
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="discovery-footer">
            <button className="view-all-btn" onClick={() => navigate('/creators')}>View All Influencers</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
