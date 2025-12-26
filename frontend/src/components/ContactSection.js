import React, { useState } from 'react';
import axios from 'axios';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyWebsite: '',
    lookingFor: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Thank you! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyWebsite: '',
        lookingFor: '',
        message: ''
      });
    } catch (error) {
      setStatus('Error submitting form. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2>Drive better impact from <span className="highlight">Influencer Campaigns</span></h2>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="url"
              name="companyWebsite"
              placeholder="Company Website"
              value={formData.companyWebsite}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>I'm looking for:</label>
            <select
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
              required
            >
              <option value="">-- Select an option --</option>
              <option value="influencer-marketing">Influencer Marketing Campaign</option>
              <option value="brand-collaboration">Brand Collaboration</option>
              <option value="product-launch">Product Launch</option>
              <option value="content-creation">Content Creation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">SUBMIT</button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
