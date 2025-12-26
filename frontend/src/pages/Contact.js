import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyWebsite: '',
        lookingFor: '',
        message: ''
    });

    const [status, setStatus] = useState('');
    const [activeLocation, setActiveLocation] = useState('Mumbai');

    const addresses = {
        Mumbai: (
            <p>S 14, Solitaire Corporate Park,<br />
                B1402, Guru Hargovindji Rd,<br />
                Chakala, Andheri East, Mumbai,<br />
                Maharashtra 400093</p>
        ),
        Bangalore: (
            <p>1st Floor, KMJ Ascend, 19, 17th C Main Rd,<br />
                KHB Colony, 5th Block, Koramangala,<br />
                Bengaluru, Karnataka 560095</p>
        ),
        Chennai: (
            <p>3rd floor, Samson Towers,<br />
                403, Pantheon Road,<br />
                Sulaiman Zackria Avenue,<br />
                Egmore, Chennai, Tamil Nadu 600008</p>
        ),
        Delhi: (
            <p>7th Floor, 108,<br />
                Udyog Vihar Phase 1,<br />
                Udyog Vihar, Sector 20,<br />
                Gurugram, Haryana 122016</p>
        )
    };

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
        <div className="contact-page-wrapper">
            <div className="contact-container">
                <div className="contact-left">
                    <h1>Let's get in touch</h1>
                    <p>We're open for any suggestion or just to have a chat</p>

                    <div className="contact-info-block">
                        <div className="info-icon">🏢</div>
                        <div className="info-text">Diginfluenz Pvt Ltd</div>
                    </div>

                    <div className="contact-info-block">
                        <div className="info-icon">📧</div>
                        <div className="info-text">Enquiry@influencer.in</div>
                    </div>

                    <div className="office-locations">
                        <h3>Office Locations</h3>
                        <div className="location-tabs">
                            {Object.keys(addresses).map((loc) => (
                                <span
                                    key={loc}
                                    className={`location-tab ${activeLocation === loc ? 'active' : ''}`}
                                    onClick={() => setActiveLocation(loc)}
                                >
                                    {loc === 'Mumbai' && <i className="fas fa-location-arrow"></i>} {/* Placeholder for icon if needed */}
                                    {loc}
                                </span>
                            ))}
                        </div>
                        <div className="location-address">
                            <div className="address-icon">📍</div>
                            {addresses[activeLocation]}
                        </div>
                    </div>
                </div>

                <div className="contact-right">
                    <h2>Get in touch</h2>
                    <form className="contact-form-main" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="companyWebsite"
                                placeholder="Company Website"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group radio-group">
                            <label>I'm Looking for:</label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="lookingFor"
                                    value="Conversion Campaigns"
                                    checked={formData.lookingFor === 'Conversion Campaigns'}
                                    onChange={handleChange}
                                /> Conversion Campaigns
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="lookingFor"
                                    value="Brand Lift"
                                    checked={formData.lookingFor === 'Brand Lift'}
                                    onChange={handleChange}
                                /> Brand Lift
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="lookingFor"
                                    value="Brand Building"
                                    checked={formData.lookingFor === 'Brand Building'}
                                    onChange={handleChange}
                                /> Brand Building
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="lookingFor"
                                    value="Barter"
                                    checked={formData.lookingFor === 'Barter'}
                                    onChange={handleChange}
                                /> Barter
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="lookingFor"
                                    value="All of the above"
                                    checked={formData.lookingFor === 'All of the above'}
                                    onChange={handleChange}
                                /> All of the above
                            </label>
                        </div>

                        <button type="submit" className="submit-button">SUBMIT</button>
                        {status && <p className="form-feedback">{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
