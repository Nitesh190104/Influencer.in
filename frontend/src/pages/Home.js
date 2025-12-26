import React from 'react';
import HeroSection from '../components/HeroSection';
import DiscoverSection from '../components/DiscoverSection';
import BrandsSection from '../components/BrandsSection';
import ApproachSection from '../components/ApproachSection';
import InfluencersSection from '../components/InfluencersSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <section className="best-roi">
        <DiscoverSection />
      </section>
      <BrandsSection />
      <section className="conversion-campaign">
        <ApproachSection />
      </section>
      <InfluencersSection />
      <ContactSection />
    </main>
  );
};


export default Home;
