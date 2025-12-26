
import React from 'react';
import './Team.css';

function Team() {
  const teamMembers = [
    {
      name: 'SUNEIL CHAWLA',
      position: 'Co-Founder',
      image: '/team-images/suneil-chawla.jpg',
      bio: 'Suneil Chawla is a Commerce Graduate from Loyola College and an alumnus of IIM Ahmedabad. Prior to co-founding social beat, he founded koolkart.com, a social e-commerce and price comparison engine. He has worked extensively in marketing and technology, with management consultants bain & co. across Boston, Singapore, Mumbai, and Delhi.'
    },
    {
      name: 'VIKAS CHAWLA',
      position: 'Co-Founder',
      image: '/team-images/vikas-chawla.jpg',
      bio: 'Vikas Chawla has experience as a product head, digital head & a product manager at TJ cycles. In his previous role, he worked as an executive assistant to Mr. Mv Subbiah, Murugappa group and chairman, national skill development corp. He is a management graduate from the London School of Economics (LSE).'
    },
    {
      name: 'ANKIT RASTOGI',
      position: 'CTO',
      image: '/team-images/ankit-rastogi.jpg',
      bio: 'Ankit is passionate about building scalable mission-driven technologies, loves traveling, gaming, and coffee and has more than 13 years of experience in Technology & engineering. Before joining influencer.in, he has worked with multiple startups in the news video domain.'
    },
    {
      name: 'ARUSHI GUPTA',
      position: 'Business Head – Influencer.in',
      image: '/team-images/arushi-gupta.jpg',
      bio: 'Arushi has over 7 years of experience ranging from project management, marketing, and sales and has formerly worked at the British Council and Cambridge English Language assessment. She enjoys identifying a problem, conceptualizing a solution to execute it.'
    },
    {
      name: 'MONIKA CHETTRI',
      position: 'VP – Influencer Marketing & Client Success',
      image: '/team-images/monika-chettri.jpg',
      bio: 'Monika is a Delhi University graduate & a seasoned professional with over a decade of experience in the event management and content marketing industry. Throughout her career, she has been instrumental in the success of brands like 70EMG, LBB, One Impression and Voxo Media.'
    },
    {
      name: 'KAUSHAL AGARWAL',
      position: 'AVP – Influencer Marketing',
      image: '/team-images/kaushal-agarwal.jpg',
      bio: 'With nearly 9 years of experience in digital marketing, Kaushal has explored diverse verticals including Content, Social Media, SEO, ORM, Affiliate, and Performance, before finding his true passion in Influencer Marketing. Beyond work, Kaushal is an avid cricket and chess enthusiast.'
    },
    {
      name: 'VEDANSHI SARAOGI',
      position: 'Associate Creative Director',
      image: '/team-images/vedanshi-saraogi.jpg',
      bio: 'A bilingual creative leader with over 8 years of experience across integrated, mainline, influencer, and digital advertising. Vedanshi has helped shape the voice of 7+ brands across 7+ categories and platforms. From script to scroll, brief to belief, she\'s truly lived the full creative journey.'
    },
    {
      name: 'NIMISHA RAO',
      position: 'Manager – Influencer Marketing & Growth',
      image: '/team-images/nimisha-rao.jpg',
      bio: 'Nimisha has been a social media enthusiast since the time of orkut but never thought it could be a career option. But during her graduation when she found out it could, she hopped onto the opportunity and started her social media page and a blog about food and fashion.'
    },
    {
      name: 'MANAN KOHLI',
      position: 'Product Manager',
      image: '/team-images/manan-kohli.jpg',
      bio: 'Manan loves to mix creativity with problem-solving. In his free time, he explores new ideas, enjoys different foods, and listens to soulful tunes. With a good grasp of the business, social media and Tech & Product field, Manan navigates it well.'
    },
    {
      name: 'RUKSAR KHAN',
      position: 'Manager – Influencer Marketing & Growth',
      image: '/team-images/ruksar-khan.jpg',
      bio: 'Ruksar brings a dynamic blend of strategy, creativity, and relationship-building to the influencer ecosystem. Whether it\'s scaling campaigns or driving growth, she\'s always on the move — much like her life outside of work, where she\'s busy chasing toddlers and goals with equal passion!'
    },
    {
      name: 'JIGNESH LALGE',
      position: 'Manager – Influencer Marketing',
      image: '/team-images/jignesh-lalge.jpg',
      bio: 'Jignesh hails from Mumbai, and is currently based out in Gurgaon. He loves gaming and getting to work with gaming clients. He has a background in Civil Engineering, and has developed his mission in Influencer Marketing over the years.'
    },
    {
      name: 'INDHUMATHY C S',
      position: 'Lead Accountant',
      image: '/team-images/indhumathy-cs.jpg',
      bio: 'Indhu has completed her master\'s in commerce and also an MBA from Madras University. She loves her profession and experienced in Finance & Accounts but still she wants to learn new things. She loves to spend time with her family and friends. Cooking, tailoring and listening to music.'
    },
    {
      name: 'HRIYA SHARAN',
      position: 'Senior Influencer Marketing Specialist',
      image: '/team-images/hriya-sharan.jpg',
      bio: 'Reading has been a lifelong passion of her. She finds solace and excitement in exploring different worlds through books. Alongside her love for literature, she has a deep appreciation for culinary adventures. Trying out various cuisines allows her to immerse herself in different cultures.'
    },
    {
      name: 'UTKARSH JHA',
      position: 'Software Developer',
      image: '/team-images/utkarsh-jha.jpg',
      bio: 'Utkarsh is a B. Tech graduate in Electrical Engineering from Madan Mohan Malaviya University of Technology, but the love for coding and new technologies has made him a Software Developer. He loves to learn new skills and party with friends in his spare time.'
    },
    {
      name: 'SAKSHI G',
      position: 'Senior Influencer Marketing Specialist',
      image: '/team-images/sakshi-g.jpg',
      bio: 'Sakshi is a Business Management Graduate from IP University. She\'s always keen on bringing her extrovert personality to an advantage by showing off her marketing skills. You\'ll mostly find her discussing popular netflix shows or having a discussion over her sweet tooth.'
    },
    {
      name: 'YASH PURAO',
      position: 'Creative Strategist',
      image: '/team-images/yash-purao.jpg',
      bio: 'The journey began with Yash having absolutely no experience in social media (except for scrolling), he was selected as an Intern at a marketing agency. Over the course of the next 3 years, Yash gained practical hands-on experience in writing content and copies.'
    },
    {
      name: 'YASHNA PANDIA',
      position: 'Senior Social Media Specialist',
      image: '/team-images/yashna-pandia.jpg',
      bio: 'Yashna completed her bachelor\'s in business administration & has been running her own small business making personalized gifts. She\'s an extreme extrovert & obsessed with Instagram. If given a chance she\'d travel 12 months a year.'
    },
    {
      name: 'SWETHA MENON',
      position: 'Senior Influencer Marketing Specialist',
      image: '/team-images/swetha-menon.jpg',
      bio: 'Swetha is known for bringing teams together, keeping workflows seamless, and ensuring deadlines are never missed. With a strong command over influencer collaborations and campaign execution, she\'s all about creating impact with precision and teamwork.'
    },
    {
      name: 'MUSKAN KHAN',
      position: 'Senior Influencer Marketing Specialist',
      image: '/team-images/muskan-khan.jpg',
      bio: 'A true social butterfly, with an infectious love for socializing. Muskan brings on meeting new people and forging meaningful connections. Whether it\'s in her personal or professional life, she takes great care to nurture her relationships and ensure they flourish.'
    },
    {
      name: 'GITESH SHASTRI',
      position: 'Senior Developer',
      image: '/team-images/gitesh-shastri.jpg',
      bio: 'Gitesh Shastri is a full stack developer graduated from Delhi Technological University. He loves to code and learning new technologies. In his previous role he worked as full stack developer at Bololive. Loves to watch and play cricket.'
    },
    {
      name: 'MOHAMMAD SHADAB',
      position: 'Senior Software Engineer',
      image: '/team-images/mohammad-shadab.jpg',
      bio: 'Shadab is a B.tech. graduate from Aligarh muslim university. He is very enthusiastic about programming & gaming. In his free time, he loves to play with gadgets & explore new technologies. Apart from tech, he is a big time foodie and loves spicy food.'
    },
    {
      name: 'STEFANIA RODRIGUES',
      position: 'Influencer Marketing Specialist',
      image: '/team-images/stefania-rodrigues.jpg',
      bio: 'Stefania brings fresh energy and enthusiasm to the team, along with a passion for learning and creating impact in everything she takes on. Outside of work, she loves traveling, dancing, and exploring new pasta dishes – a perfect mix of adventure, rhythm, and great food!'
    },
    {
      name: 'SHWETHA KANNAN',
      position: 'Influencer Marketing Specialist',
      image: '/team-images/shwetha-kannan.jpg',
      bio: 'Shwetha brings a sharp understanding of influencer collaborations, campaign coordination, and content-driven impact. With a passion for meaningful partnerships and smooth execution, she adds fresh energy to the team.'
    },
    {
      name: 'BHAVIKA GULATI',
      position: 'Influencer Marketing Specialist',
      image: '/team-images/bhavika-gulati.jpg',
      bio: 'Bhavika brings a fresh, trend-savvy perspective to the team — always tuned in to what\'s new and what\'s next. She loves keeping up with trends, watching reels, and expressing her creativity through painting, making her the perfect blend of insight and artistry.'
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
