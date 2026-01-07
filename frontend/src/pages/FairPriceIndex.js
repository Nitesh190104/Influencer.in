import React, { useState } from 'react';
import './FairPriceIndex.css';

const FairPriceIndex = () => {
    const [platform, setPlatform] = useState('instagram');
    const [category, setCategory] = useState('');
    const [handle, setHandle] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = [
        { value: 'fashion_beauty', label: 'Fashion Beauty' },
        { value: 'parenting', label: 'Parenting' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'finance', label: 'Finance' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'tech', label: 'Tech' },
        { value: 'travel', label: 'Travel' },
        { value: 'food', label: 'Food' },
        { value: 'fitness', label: 'Fitness' },
        { value: 'comedy', label: 'Comedy' }
    ];

    const handleCalculate = () => {
        if (!category || !handle) {
            alert('Please fill in all fields');
            return;
        }
        setShowEmailModal(true);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            alert('Please enter your email');
            return;
        }

        setLoading(true);
        setShowEmailModal(false);

        try {
            // TODO: Replace with actual API endpoint
            // const response = await fetch('/api/calculate-price', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ platform, category, handle, email })
            // });
            // const data = await response.json();

            // Placeholder data for demonstration
            setTimeout(() => {
                setPriceData({
                    minPrice: '₹15,000',
                    maxPrice: '₹50,000',
                    avgPrice: '₹32,500',
                    followers: '125K',
                    engagement: '4.2%',
                    category: categories.find(c => c.value === category)?.label
                });
                setShowResults(true);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Error calculating price:', error);
            setLoading(false);
            alert('Error calculating price. Please try again.');
        }
    };

    const closeModal = () => {
        setShowEmailModal(false);
        setEmail('');
    };

    const resetForm = () => {
        setShowResults(false);
        setPriceData(null);
        setHandle('');
        setCategory('');
    };

    return (
        <div className="fair-price-index">
            <div className="fpi-background">
                <div className="fpi-container">
                    <div className="fpi-card">
                        <div className="fpi-header">
                            <div className="fpi-logo">
                                <span className="fpi-logo-icon">⋮⋮⋮</span>
                                <span className="fpi-logo-text">
                                    <span className="fpi-logo-brand">Influencer.in</span>
                                    <span className="fpi-logo-title"> Fair Price Index</span>
                                </span>
                            </div>
                            <p className="fpi-subtitle">
                                Evaluate the potential cost for different types of influencer collaborations
                                <br />
                                based on profile performance analytics.
                            </p>
                        </div>

                        {!showResults ? (
                            <>
                                <div className="fpi-tabs">
                                    <button
                                        className={`fpi-tab ${platform === 'instagram' ? 'active' : ''}`}
                                        onClick={() => setPlatform('instagram')}
                                    >
                                        <span className="fpi-tab-icon">📷</span>
                                        INSTAGRAM
                                    </button>
                                    <button
                                        className={`fpi-tab ${platform === 'youtube' ? 'active' : ''}`}
                                        onClick={() => setPlatform('youtube')}
                                    >
                                        <span className="fpi-tab-icon">▶</span>
                                        YOUTUBE
                                    </button>
                                </div>

                                <div className="fpi-form">
                                    <div className="fpi-form-group">
                                        <label htmlFor="category">Category</label>
                                        <select
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="fpi-select"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="fpi-form-group">
                                        <label htmlFor="handle">
                                            {platform === 'instagram' ? 'Instagram Handle *' : 'YouTube URL *'}
                                        </label>
                                        <div className="fpi-input-wrapper">
                                            {platform === 'instagram' && (
                                                <span className="fpi-input-prefix">@</span>
                                            )}
                                            <input
                                                type="text"
                                                id="handle"
                                                value={handle}
                                                onChange={(e) => setHandle(e.target.value)}
                                                placeholder={
                                                    platform === 'instagram'
                                                        ? 'Enter Instagram handle'
                                                        : 'Enter YouTube channel URL'
                                                }
                                                className="fpi-input"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCalculate}
                                        className="fpi-calculate-btn"
                                        disabled={loading}
                                    >
                                        {loading ? 'CALCULATING...' : 'CALCULATE'}
                                    </button>
                                </div>

                                <div className="fpi-footer">
                                    <p className="fpi-disclaimer">
                                        *This calculator only shows results for influencers with Business or Creator accounts
                                        and for whom data is publicly available. For more information, please feel free to{' '}
                                        <a href="/contact">reach out</a>. Please note: This is a beta version of the calculator.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="fpi-results">
                                <h2 className="fpi-results-title">Price Index Results</h2>
                                <div className="fpi-results-grid">
                                    <div className="fpi-result-card">
                                        <div className="fpi-result-label">Category</div>
                                        <div className="fpi-result-value">{priceData?.category}</div>
                                    </div>
                                    <div className="fpi-result-card">
                                        <div className="fpi-result-label">Followers</div>
                                        <div className="fpi-result-value">{priceData?.followers}</div>
                                    </div>
                                    <div className="fpi-result-card">
                                        <div className="fpi-result-label">Engagement Rate</div>
                                        <div className="fpi-result-value">{priceData?.engagement}</div>
                                    </div>
                                    <div className="fpi-result-card highlight">
                                        <div className="fpi-result-label">Estimated Price Range</div>
                                        <div className="fpi-result-value-range">
                                            <span className="price-min">{priceData?.minPrice}</span>
                                            <span className="price-separator"> - </span>
                                            <span className="price-max">{priceData?.maxPrice}</span>
                                        </div>
                                        <div className="fpi-result-avg">Average: {priceData?.avgPrice}</div>
                                    </div>
                                </div>
                                <button onClick={resetForm} className="fpi-reset-btn">
                                    Calculate Another
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fpi-modal-overlay" onClick={closeModal}>
                    <div className="fpi-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="fpi-modal-close" onClick={closeModal}>
                            ×
                        </button>
                        <h3 className="fpi-modal-title">Enter Your Email</h3>
                        <p className="fpi-modal-subtitle">
                            We'll send the price index results to your email
                        </p>
                        <form onSubmit={handleEmailSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                className="fpi-modal-input"
                                required
                            />
                            <button type="submit" className="fpi-modal-submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FairPriceIndex;
