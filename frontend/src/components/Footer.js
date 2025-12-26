import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Top Creators in India</h3>
            <ul>
              <li>Automobile Influencers</li>
              <li>Comedy Influencers</li>
              <li>Education Influencers</li>
              <li>Finance Influencers</li>
              <li>Parenting Influencers</li>
              <li>Beauty Influencers</li>
              <li>Fitness Influencers</li>
              <li>Food Influencers</li>
              <li>Gaming Influencers</li>
              <li>Tech Influencers</li>
              <li>Travel Influencers</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Influencer Products</h3>
            <ul>
              <li><Link to="/dashboard-gate">Influencer Dashboard</Link></li>
              <li>Fair Pair Index</li>
            </ul>

            <h3 className="mt-3">Case Studies</h3>
            <ul>
              <li>Gamezy Case Study</li>
              <li>Oziva Case Study</li>
              <li>PUBG Case Study</li>
              <li>PUMA Case Study</li>
              <li>Weather & Radar Case Study</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Live Campaigns</h3>
            <ul>
              <li>Blog</li>
              <li>Guides</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Useful Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Talent Management</li>
              <li>Join Our Creators Community</li>
              <li>Meet The Team</li>
              <li>Career at Influencer.in</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Disclosure</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <div className="social-icon linkedin">in</div>
              <div className="social-icon facebook">f</div>
              <div className="social-icon youtube">▶</div>
              <div className="social-icon twitter">t</div>
              <div className="social-icon instagram">ig</div>
            </div>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Fashion & Beauty</h3>
          <div className="category-links">
            <a href="#fashion">Fashion Influencers</a>
            <a href="#black-fashion">Black Fashion Influencers</a>
            <a href="#sustainable">Sustainable Fashion Influencers</a>
            <a href="#models">Beautiful Instagram Models</a>
            <a href="#skincare">Skincare Influencers</a>
            <a href="#makeup">Indian Makeup Influencers</a>
            <a href="#curly">Curly Hair Influencers</a>
            <a href="#cosmetic">Cosmetic Influencers</a>
            <a href="#artist">Makeup Artist</a>
            <a href="#hair">Hair Influencers</a>
            <a href="#lifestyle">Lifestyle Influencers</a>
            <a href="#shoes">Shoe Influencers</a>
            <a href="#jewellery">Jewellery Influencers</a>
            <a href="#beard">Beard Models</a>
            <a href="#indian-actress">Indian Actress</a>
            <a href="#male-instagram">Male Instagram Models</a>
            <a href="#male-fashion">Male Fashion Influencers</a>
            <a href="#male-models">Male Models With Long Hair</a>
            <a href="#delhi-fashion">Delhi Fashion Influencers</a>
            <a href="#mumbai-fashion">Mumbai Fashion Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Entertainment & Creators</h3>
          <div className="category-links">
            <a href="#cinema">Cinema Influencers</a>
            <a href="#movie">Movie Influencers</a>
            <a href="#music">Music Influencers</a>
            <a href="#meme">Meme Pages on Instagram</a>
            <a href="#standup">Indian Stand Up Comedians</a>
            <a href="#comedy">Comedy Influencers</a>
            <a href="#dance">Dance Influencers</a>
            <a href="#choreographers">Indian Choreographers</a>
            <a href="#journalist">Journalist Influencers</a>
            <a href="#art">Art Influencers</a>
            <a href="#gardening">Gardening Influencers</a>
            <a href="#family">Family Influencers</a>
            <a href="#instagram-inf">Instagram Influencers</a>
            <a href="#fishing">Fishing Influencers</a>
            <a href="#amazon">Amazon Influencers</a>
            <a href="#animal">Animal Influencers</a>
            <a href="#cloud">Cloud Influencers</a>
            <a href="#young">Young Influencers</a>
            <a href="#knowledge">Knowledge Management Influencers</a>
            <a href="#richest">Richest Influencers</a>
            <a href="#bengali">Bengali Models</a>
            <a href="#entrepreneur">Entrepreneur Influencers</a>
            <a href="#nano">Nano Influencers</a>
            <a href="#indian-instagram">Indian Instagram Models</a>
            <a href="#political">Political Influencers</a>
            <a href="#management">Management Influencers</a>
            <a href="#luxury">Luxury Influencers</a>
            <a href="#book">Book Influencers</a>
            <a href="#comic">Comic Book Influencers</a>
            <a href="#real-estate">Real Estate Influencers</a>
            <a href="#most-followed">Most Followed Asian</a>
            <a href="#punjabi">Instagram Punjabi Models</a>
            <a href="#bikini">Instagram Bikini Models</a>
            <a href="#global">Global Instagram Influencers</a>
            <a href="#most-followed-inf">Most Followed Influencers</a>
            <a href="#gen-z">Gen Z Influencers</a>
            <a href="#retail">Retail Influencers</a>
            <a href="#spiritual">Spiritual Leaders</a>
            <a href="#millennial">Millennial Influencers</a>
            <a href="#macro">Macro Influencers</a>
            <a href="#dating">Dating Influencers</a>
            <a href="#famous">Famous Painters</a>
            <a href="#indian-actors">Indian Actors</a>
            <a href="#women">Women Influencers</a>
            <a href="#digital-bangalore">Digital Influencers in Bangalore</a>
            <a href="#indian-teenage">Indian Teenage Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Tech & Gaming</h3>
          <div className="category-links">
            <a href="#tech-coding">Tech Coding Influencers</a>
            <a href="#cybersecurity">Cybersecurity Influencers</a>
            <a href="#digital-marketing">Digital Marketing Influencers</a>
            <a href="#crypto">Crypto Influencers</a>
            <a href="#ai">Artificial Intelligence Influencers</a>
            <a href="#mumbai-tech">Mumbai Tech Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Travel & Food</h3>
          <div className="category-links">
            <a href="#healthy-food">Healthy Food Influencers</a>
            <a href="#travel">Travel Influencers</a>
            <a href="#food-inf">Food Influencers</a>
            <a href="#coffee">Coffee Influencers</a>
            <a href="#cooking">Cooking Influencers</a>
            <a href="#motorcycle">Motorcycle Influencers</a>
            <a href="#vegan">Vegan Influencers</a>
            <a href="#female-travel">Female Travel Influencers</a>
            <a href="#kolkata-food">Kolkata Food Influencers</a>
            <a href="#delhi-food">Delhi Food Influencers</a>
            <a href="#pune-food">Pune Food Influencers</a>
            <a href="#hyderabad-food">Hyderabad Food Influencers</a>
            <a href="#bangalore-food">Bangalore Food Influencers</a>
            <a href="#jaipur-food">Jaipur Food Influencers</a>
            <a href="#mumbai-food">Mumbai Food Influencers</a>
            <a href="#couple-travel">Couple Travel Influencers</a>
            <a href="#mumbai-travel">Mumbai Travel Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Fitness & Sports</h3>
          <div className="category-links">
            <a href="#golf">Golf Influencers</a>
            <a href="#mental-health">Mental Health Influencers</a>
            <a href="#health">Health Influencers</a>
            <a href="#yoga">Yoga Influencers</a>
            <a href="#running">Running Influencers</a>
            <a href="#bodybuilding">Bodybuilding Influencers</a>
            <a href="#fitness">Fitness Influencers</a>
            <a href="#male-fitness">Male Fitness Models</a>
            <a href="#fitness-bangalore">Fitness Influencers in Bangalore</a>
            <a href="#indian-female-bodybuilders">Indian Female Bodybuilders</a>
            <a href="#mumbai-fitness">Mumbai Fitness Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Finance & Ecommerce</h3>
          <div className="category-links">
            <a href="#finance-youtube">Finance Influencers Youtube</a>
            <a href="#finance-instagram">Finance Influencer Instagram</a>
            <a href="#ecommerce">Ecommerce Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Parenting & Pet</h3>
          <div className="category-links">
            <a href="#cat">Cat Influencers</a>
            <a href="#dog">Dog Influencers</a>
            <a href="#mommy">Mommy Influencers</a>
            <a href="#kolkata-mom">Kolkata Mom Influencers</a>
            <a href="#mumbai-mom">Mumbai Mom Influencers</a>
          </div>
        </div>

        <div className="footer-categories">
          <h3>Location wise Instagram Influencers</h3>
          <div className="category-links">
            <a href="#delhi">Delhi Influencers</a>
            <a href="#delhi-lifestyle">Delhi Lifestyle Influencers</a>
            <a href="#haryana">Haryana Influencers</a>
            <a href="#himachal">Himachal Pradesh Influencers</a>
            <a href="#jammu">Jammu Kashmir Influencers</a>
            <a href="#punjab">Punjab Influencers</a>
            <a href="#bareilly">Bareilly Influencers</a>
            <a href="#lucknow">Lucknow Influencers</a>
            <a href="#dehradun">Dehradun Influencers</a>
            <a href="#kanpur">Kanpur Influencers</a>
            <a href="#faridabad">Faridabad Influencers</a>
            <a href="#shimla">Shimla Influencers</a>
            <a href="#varanasi">Varanasi Influencers</a>
            <a href="#noida">Noida Influencers</a>
            <a href="#moradabad">Moradabad Influencers</a>
            <a href="#meerut">Meerut Influencers</a>
            <a href="#prayagraj">Prayagraj Influencers</a>
            <a href="#ghaziabad">Ghaziabad Influencers</a>
            <a href="#mathura">Mathura Influencers</a>
            <a href="#gorakhpur">Gorakhpur Influencers</a>
            <a href="#jhansi">Jhansi Influencers</a>
            <a href="#uttarakhand">Uttarakhand Influencers</a>
            <a href="#uttar-pradesh">Uttar Pradesh Influencers</a>
            <a href="#gurugram">Gurugram Influencers</a>
            <a href="#guntur">Guntur Influencers</a>
            <a href="#kerala">Kerala Influencers</a>
            <a href="#puducherry">Puducherry Influencers</a>
            <a href="#telangana">Telangana Influencers</a>
            <a href="#south-indian">South Indian Influencers</a>
            <a href="#tamil-nadu">Tamil Nadu Influencers</a>
            <a href="#andhra-pradesh">Andhra Pradesh Influencers</a>
            <a href="#karnataka">Karnataka Influencers</a>
            <a href="#chennai">Chennai Influencers</a>
            <a href="#coimbatore">Coimbatore Influencers</a>
            <a href="#erode">Erode Influencers</a>
            <a href="#south-indian-actors">South Indian Actors</a>
            <a href="#madurai">Madurai Influencers</a>
            <a href="#salem">Salem Influencers</a>
            <a href="#thanjavur">Thanjavur Influencers</a>
            <a href="#thiruvananthapuram">Thiruvananthapuram Influencers</a>
            <a href="#tirunelveli">Tirunelveli Influencers</a>
            <a href="#tiruvannamalai">Tiruvannamalai Influencers</a>
            <a href="#kochi">Kochi Influencers</a>
            <a href="#kollam">Kollam Influencers</a>
            <a href="#thrissur">Thrissur Influencers</a>
            <a href="#kannur">Kannur Influencers</a>
            <a href="#mangaluru">Mangaluru Influencers</a>
            <a href="#mysuru">Mysuru Influencers</a>
            <a href="#hubballi-dharwad">Hubballi Dharwad Influencers</a>
            <a href="#kalaburagi">Kalaburagi Influencers</a>
            <a href="#belagavi">Belagavi Influencers</a>
            <a href="#vijayapura">Vijayapura Influencers</a>
            <a href="#karnal">Karnal Influencers</a>
            <a href="#kakinada">Kakinada Influencers</a>
            <a href="#kozhikode">Kozhikode Influencers</a>
            <a href="#visakhapatnam">Visakhapatnam Influencers</a>
            <a href="#warangal">Warangal Influencers</a>
            <a href="#hyderabad">Hyderabad Influencers</a>
            <a href="#assam">Assam Influencers</a>
            <a href="#arunachal">Arunachal Pradesh Influencers</a>
            <a href="#manipur">Manipur Influencers</a>
            <a href="#meghalaya">Meghalaya Influencers</a>
            <a href="#mizoram">Mizoram Influencers</a>
            <a href="#nagaland">Nagaland Influencers</a>
            <a href="#sikkim">Sikkim Influencers</a>
            <a href="#tripura">Tripura Influencers</a>
            <a href="#west-bengal">West Bengal Influencers</a>
            <a href="#bihar">Bihar Influencers</a>
            <a href="#guwahati">Guwahati Influencers</a>
            <a href="#bhubaneswar">Bhubaneswar Influencers</a>
            <a href="#cuttack">Cuttack Influencers</a>
            <a href="#rourkela">Rourkela Influencers</a>
            <a href="#dhanbad">Dhanbad Influencers</a>
            <a href="#ranchi">Ranchi Influencers</a>
            <a href="#jamshedpur">Jamshedpur Influencers</a>
            <a href="#asansol">Asansol Influencers</a>
            <a href="#siliguri">Siliguri Influencers</a>
            <a href="#kolkata">Kolkata Influencers</a>
            <a href="#durgapur">Durgapur Influencers</a>
            <a href="#madhya-pradesh">Madhya Pradesh Influencers</a>
            <a href="#chhattisgarh">Chhattisgarh Influencers</a>
            <a href="#bhopal">Bhopal Influencers</a>
            <a href="#gwalior">Gwalior Influencers</a>
            <a href="#indore">Indore Influencers</a>
            <a href="#jabalpur">Jabalpur Influencers</a>
            <a href="#bilaspur">Bilaspur Influencers</a>
            <a href="#bhilai">Bhilai Influencers</a>
            <a href="#srinagar">Srinagar Influencers</a>
            <a href="#jalandhar">Jalandhar Influencers</a>
            <a href="#chandigarh">Chandigarh Influencers</a>
            <a href="#hamirpur">Hamirpur Influencers</a>
            <a href="#agra">Agra Influencers</a>
            <a href="#rajasthan">Rajasthan Influencers</a>
            <a href="#aurangabad">Aurangabad Influencers</a>
            <a href="#jamnagar">Jamnagar Influencers</a>
            <a href="#goa">Goa Influencers</a>
            <a href="#nashik">Nashik Influencers</a>
            <a href="#mumbai-beauty">Mumbai Beauty Influencers</a>
            <a href="#bhavnagar">Bhavnagar Influencers</a>
            <a href="#ahmedabad">Ahmedabad Influencers</a>
            <a href="#bokaro">Bokaro Steel City Influencers</a>
            <a href="#patna">Patna Influencers</a>
            <a href="#bhiwandi">Bhiwandi Influencers</a>
            <a href="#amritsar">Amritsar Influencers</a>
            <a href="#rajkot">Rajkot Influencers</a>
            <a href="#malappuram">Malappuram Influencers</a>
            <a href="#vasai">Vasai Virar Influencers</a>
            <a href="#jodhpur">Jodhpur Influencers</a>
            <a href="#sangli">Sangli Influencers</a>
            <a href="#kolhapur">Kolhapur Influencers</a>
            <a href="#nanded">Nanded Influencers</a>
            <a href="#anand">Anand Influencers</a>
            <a href="#kurnool">Kurnool Influencers</a>
            <a href="#firozabad">Firozabad Influencers</a>
            <a href="#ratlam">Ratlam Influencers</a>
            <a href="#bikaner">Bikaner Influencers</a>
            <a href="#maharashtra">Maharashtra Influencers</a>
            <a href="#mumbai">Mumbai Influencers</a>
            <a href="#bangalore">Bangalore Influencers</a>
            <a href="#mumbai-inf">Mumbai Influencers</a>
            <a href="#aligarh">Aligarh Influencers</a>
            <a href="#gujarat">Gujarat Influencers</a>
            <a href="#surat">Surat Influencers</a>
            <a href="#jalgaon">Jalgaon Influencers</a>
            <a href="#amravati">Amravati Influencers</a>
            <a href="#marathi">Marathi Influencers</a>
            <a href="#jaipur">Jaipur Influencers</a>
            <a href="#nellore">Nellore Influencers</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Product of Social Beat</p>
          <p>Copyright © 2025. All rights reserved with Influencer.in</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
