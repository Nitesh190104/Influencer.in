import React from 'react';
import './BrandsSection.css';

const BrandsSection = () => {
  return (
    <section className="brands-section">
      <div className="container">
        <h2><span className="impact-light">Driving</span> <span className="highlight">Business Impact</span></h2>

        <div className="brand-logos-row">
          <img src="https://www.influencer.in/wp-content/uploads/2023/09/flipkart.png" alt="Flipkart" className="brand-impact-logo" />
          <img src="https://www.influencer.in/wp-content/uploads/2023/09/tata-cliq.jpg" alt="Tata CLIQ" className="brand-impact-logo" />
          <img src="https://www.influencer.in/wp-content/uploads/2023/07/boat.png" alt="boat" className="brand-impact-logo" />
          <img src="https://www.influencer.in/wp-content/uploads/2024/10/samsung.png" alt="Samsung" className="brand-impact-logo" />
          <img src="https://www.influencer.in/wp-content/uploads/2024/10/gocolorss.png" alt="Go Colors" className="brand-impact-logo" />
        </div>
      </div>
    </section>
  );
};



export default BrandsSection;
