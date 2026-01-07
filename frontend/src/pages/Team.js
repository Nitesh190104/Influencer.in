
import React from 'react';
import './Team.css';

function Team() {
  const teamMembers = [
    {
      name: 'SUNEIL CHAWLA',
      position: 'Co-Founder',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/Suneil-350x350-1.jpg',
      bio: 'Suneil Chawla is a Commerce Graduate from Loyola College and an alumnus of IIM Ahmedabad. Prior to co-founding social beat, he founded koolkart.com, a social e-commerce and price comparison engine.'
    },
    {
      name: 'VIKAS CHAWLA',
      position: 'Co-Founder',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/Vikas-350x350-1.jpg',
      bio: 'Vikas Chawla has experience as a product head, digital head & a product manager at TJ cycles. He is a management graduate from the London School of Economics (LSE).'
    },
    {
      name: 'ANKIT RASTOGI',
      position: 'CTO',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/ankit-350x350-1.jpg',
      bio: 'Ankit is passionate about building scalable mission-driven technologies, loves traveling, gaming, and coffee and has more than 13 years of experience in Technology & engineering.'
    },
    {
      name: 'ARUSHI GUPTA',
      position: 'Business Head – Influencer.in',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/Arushi-350x350-1.jpg',
      bio: 'Arushi has over 7 years of experience ranging from project management, marketing, and sales and has formerly worked at the British Council and Cambridge English Language assessment.'
    },
    {
      name: 'MONIKA CHETTRI',
      position: 'VP – Influencer Marketing & Client Success',
      image: 'https://www.influencer.in/wp-content/uploads/2024/05/p4.png',
      bio: 'Monika is a Delhi University graduate & a seasoned professional with over a decade of experience in the event management and content marketing industry.'
    },
    {
      name: 'KAUSHAL AGARWAL',
      position: 'AVP – Influencer Marketing',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Kaushal-Agarwal.png',
      bio: 'With nearly 9 years of experience in digital marketing, Kaushal has explored diverse verticals including Content, SEO, and Performance, before finding his true passion in Influencer Marketing.'
    },
    {
      name: 'VEDANSHI SARAOGI',
      position: 'Associate Creative Director',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/2.png',
      bio: 'A bilingual creative leader with over 8 years of experience. Vedanshi has helped shape the voice of 7+ brands across 7+ categories and platforms.'
    },
    {
      name: 'NIMISHA RAO',
      position: 'Manager – Influencer Marketing & Growth',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/Nimisha-Rao-350x350-1.jpg',
      bio: 'Nimisha hopped onto the opportunity and started her social media page and a blog about food and fashion when she realized it could be a career option.'
    },
    {
      name: 'MANAN KOHLI',
      position: 'Product Manager',
      image: 'https://www.influencer.in/wp-content/uploads/2024/01/1-8.jpg',
      bio: 'Manan loves to mix creativity with problem-solving. In his free time, he explores new ideas, enjoys different foods, and listens to soulful tunes.'
    },
    {
      name: 'RUKSAR KHAN',
      position: 'Manager – Influencer Marketing & Growth',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Ruksar-Khan.png',
      bio: 'Ruksar brings a dynamic blend of strategy, creativity, and relationship-building to the influencer ecosystem.'
    },
    {
      name: 'JIGNESH LALGE',
      position: 'Manager – Influencer Marketing',
      image: 'https://www.influencer.in/wp-content/uploads/2024/02/5-2.jpg',
      bio: 'Jignesh hails from Mumbai. He loves gaming and getting to work with gaming clients. He has developed his mission in Influencer Marketing over the years.'
    },
    {
      name: 'INDHUMATHY C S',
      position: 'Lead Accountant',
      image: 'https://www.influencer.in/wp-content/uploads/2022/06/3.jpg',
      bio: 'Indhu loves her profession and matches Finance & Accounts with learning new things. She loves to spend time with her family, cooking, and listening to music.'
    },
    {
      name: 'HRIYA SHARAN',
      position: 'Senior Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2024/05/p3.png',
      bio: 'Reading has been a lifelong passion of her. She finds solace and excitement in exploring different worlds through books.'
    },
    {
      name: 'UTKARSH JHA',
      position: 'Software Developer',
      image: 'https://www.influencer.in/wp-content/uploads/2022/11/Utkarsh.jpg',
      bio: 'Utkarsh is a B. Tech graduate but the love for coding has made him a Software Developer. He loves to learn new skills and party with friends.'
    },
    {
      name: 'SAKSHI G',
      position: 'Senior Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/sakshi-scaled-1-350x350-1.jpg',
      bio: 'Sakshi is always keen on bringing her extrovert personality to an advantage by showing off her marketing skills.'
    },
    {
      name: 'YASH PURAO',
      position: 'Creative Strategist',
      image: 'https://www.influencer.in/wp-content/uploads/2024/05/p2.png',
      bio: 'Yash gained practical hands-on experience in writing content and copies over 3 years, starting with no experience.'
    },
    {
      name: 'YASHNA PANDIA',
      position: 'Senior Social Media Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2022/07/10.jpg',
      bio: 'Yashna is an extreme extrovert & obsessed with Instagram. If given a chance she\'d travel 12 months a year.'
    },
    {
      name: 'SWETHA MENON',
      position: 'Senior Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Swetha-Menon.png',
      bio: 'Swetha is known for bringing teams together, keeping workflows seamless, and ensuring deadlines are never missed.'
    },
    {
      name: 'MUSKAN KHAN',
      position: 'Senior Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2023/09/4-1.jpg',
      bio: 'A true social butterfly. Muskan brings on meeting new people and forging meaningful connections.'
    },
    {
      name: 'GITESH SHASTRI',
      position: 'Senior Developer',
      image: 'https://www.influencer.in/wp-content/uploads/2022/06/2.jpg',
      bio: 'Gitesh Shastri is a full stack developer. He loves to code, learn new technologies, and watch cricket.'
    },
    {
      name: 'MOHAMMAD SHADAB',
      position: 'Senior Software Engineer',
      image: 'https://www.influencer.in/wp-content/uploads/2022/02/shadab-350x350-1.jpg',
      bio: 'Shadab is very enthusiastic about programming & gaming. He is a big time foodie and loves spicy food.'
    },
    {
      name: 'STEFANIA RODRIGUES',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Stefania.png',
      bio: 'Stefania brings fresh energy and enthusiasm to the team. She loves traveling, dancing, and exploring new pasta dishes.'
    },
    {
      name: 'SHWETHA KANNAN',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Shwetha-Kannan.png',
      bio: 'Shwetha brings a sharp understanding of influencer collaborations and content-driven impact.'
    },
    {
      name: 'BHAVIKA GULATI',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Bhavika-Gulati.png',
      bio: 'Bhavika loves keeping up with trends, watching reels, and expressing her creativity through painting.'
    },
    {
      name: 'JAYLAXMI GUDIGUDI',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Jaylaxmi-Gudigudi.png',
      bio: 'Passionate about connecting brands with key influencers and driving impactful campaigns.'
    },
    {
      name: 'KAVISHREE',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Kavishree.png',
      bio: 'Enthusiastic about digital trends and building strong relationships within the creator economy.'
    },
    {
      name: 'KRIPAL FALDU',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Kripal-Faldu.png',
      bio: 'Focused on data-driven influencer strategies that deliver measurable results.'
    },
    {
      name: 'KHUSHI SHAH',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Khushi-Shah.png',
      bio: 'Creative thinker who loves crafting unique campaign ideas and storytelling.'
    },
    {
      name: 'NEHA BASWALA',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Neha-Baswala.png',
      bio: 'Dedicated to finding the perfect match between brands and influencers for authentic collaboration.'
    },
    {
      name: 'RAKSHITA DWIVEDI',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Rakshita-dwivedi.png',
      bio: 'Expert in managing influencer relationships and ensuring smooth campaign execution.'
    },
    {
      name: 'ABUZAR',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Abuzar.png',
      bio: 'Passionate about the digital landscape and leveraging influencer power for brand growth.'
    },
    {
      name: 'RISHITA AGARWAL',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Rishita-Agarwal.png',
      bio: 'Skilled in campaign management and identifying emerging trends in social media.'
    },
    {
      name: 'SARTHAK SHARMA',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Sarthak-Sharma.png',
      bio: 'Driven by creativity and results, ensuring every campaign hits the mark.'
    },
    {
      name: 'TARUN',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Tarun.png',
      bio: 'Tech-savvy and trend-aware, focusing on innovative influencer marketing solutions.'
    },
    {
      name: 'RAHUL SHETTAR',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Rahul-Shettar.png',
      bio: 'Committed to excellence in campaign delivery and client satisfaction.'
    },
    {
      name: 'PRATHAM',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Pratham.png',
      bio: 'Energetic and focused, bringing a fresh perspective to influencer collaborations.'
    },
    {
      name: 'ANKITA KOHLY',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Ankita-Kohly.png',
      bio: 'Strategic thinker with a knack for identifying high-potential influencers.'
    },
    {
      name: 'VEDANT BHAGOTIA',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Vedant-Bhagotia.png',
      bio: 'Passionate about content creation and the business of influence.'
    },
    {
      name: 'SWATHY D',
      position: 'Influencer Marketing Specialist',
      image: 'https://www.influencer.in/wp-content/uploads/2025/11/Swathy-D.png',
      bio: 'Detailed-oriented and creative, ensuring every campaign detail is perfect.'
    }
  ];

  return (
    <div className="team-page">
      <div className="team-header">
        <h1>Meet The Team</h1>
      </div>

      <div className="team-container">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image-container">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="decorative-elements">
                  <span className="star-icon" style={{ top: '15%', left: '10%' }}>⭐</span>
                  <span className="arrow-icon" style={{ top: '20%', right: '15%' }}>➤➤➤</span>
                  <span className="hash-icon" style={{ bottom: '20%', left: '15%' }}>#</span>
                  <span className="dot-icon" style={{ bottom: '15%', right: '20%' }}>●</span>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
