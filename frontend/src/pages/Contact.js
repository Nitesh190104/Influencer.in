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
            await axios.post('/api/contact', formData);
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
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H192c-8.8 0-16-7.2-16-16V112zm64 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112z" /></svg>
                        </div>
                        <div className="info-text">Diginfluenz Pvt Ltd</div>
                    </div>

                    <div className="contact-info-block">
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg>
                        </div>
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
                                    {activeLocation === loc && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 512 512" style={{ marginRight: '6px' }}><path d="M192 104.8c0-9.2-5.8-17.3-14.6-20.5l-96-32c-12.8-4.3-25.9 5.2-25.9 18.7V349.5c0 6.6 3.6 12.8 9.4 16.1l96 64c9.9 6.6 23.3 .8 23.3-11.1V104.8zm64 340.5V172.5c0-6 4-11.3 9.9-12.1l176-24c11.9-1.6 22 7.7 22 19.6v239c0 6.6-3.6 12.8-9.4 16.1l-182.2 96c-9.5 5.2-21.3-1.6-21.3-12.5h0 .3zm-32-62.8l-72.3-48.2c-3.1-2.1-5-5.6-5-9.3V78l55.4 18.5c5.3 1.8 13.9 1.8 21.9 0L398 32.8V262l-155.1 21.1c-11.1 1.5-19.1 11-18.9 22.2v77.2z" /></svg>
                                    )}
                                    {loc}
                                </span>
                            ))}
                        </div>
                        <div className="location-address">
                            <div className="address-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" style={{ color: '#fff' }} viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                            </div>
                            {addresses[activeLocation]}
                        </div>
                    </div>
                </div>

                <div className="contact-right">
                    <h2>Get in touch</h2>
                    <div className="contact-form-box">
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
        </div>
    );
};

export default Contact;
