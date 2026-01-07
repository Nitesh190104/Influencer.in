import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InfluencerCampaigns.css';

const InfluencerCampaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCampaigns();
    fetchTotalFollowers();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setCampaigns(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalFollowers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/social-accounts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const total = response.data.data.reduce((sum, acc) => sum + (acc.followers || 0), 0);
        setTotalFollowers(total);
      }
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
  };

  const handleApply = async (campaign) => {
    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('user')).id;

      // Check if already applied
      const hasApplied = campaign.applicants?.some(app => app.influencerId === userId);
      
      if (hasApplied) {
        alert('You have already applied to this campaign');
        return;
      }

      if (totalFollowers < campaign.minFollowers) {
        alert(`You need at least ${campaign.minFollowers.toLocaleString()} followers to apply. You currently have ${totalFollowers.toLocaleString()} followers.`);
        return;
      }

      const response = await axios.post(
        `/api/campaigns/${campaign._id}/apply`,
        { followers: totalFollowers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Application submitted successfully!');
        fetchCampaigns();
        setSelectedCampaign(null);
      }
    } catch (error) {
      console.error('Failed to apply:', error);
      alert(error.response?.data?.message || 'Failed to apply to campaign');
    }
  };

  const checkEligibility = (campaign) => {
    return totalFollowers >= campaign.minFollowers;
  };

  const hasApplied = (campaign) => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return campaign.applicants?.some(app => app.influencerId === userId);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    if (filter === 'eligible') return checkEligibility(campaign);
    if (filter === 'applied') return hasApplied(campaign);
    return true;
  });

  if (loading) {
    return (
      <div className="campaigns-loading">
        <div className="loading-spinner"></div>
        <p>Loading campaigns...</p>
      </div>
    );
  }

  return (
    <div className="influencer-campaigns-container">
      <div className="campaigns-header">
        <div className="campaigns-header-left">
          <button 
            className="back-to-dashboard-btn"
            onClick={() => navigate('/influencer-dashboard')}
            title="Back to Dashboard"
          >
            <span className="back-arrow">←</span>
            <span>Back</span>
          </button>
          <div>
            <h1>Available Campaigns</h1>
            <p>Discover and apply for brand collaboration opportunities</p>
          </div>
        </div>
        <div className="followers-badge">
          <span className="followers-icon">👥</span>
          <div>
            <div className="followers-label">Your Total Followers</div>
            <div className="followers-count">{totalFollowers.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Campaigns ({campaigns.length})
        </button>
        <button 
          className={filter === 'eligible' ? 'active' : ''}
          onClick={() => setFilter('eligible')}
        >
          Eligible ({campaigns.filter(c => checkEligibility(c)).length})
        </button>
        <button 
          className={filter === 'applied' ? 'active' : ''}
          onClick={() => setFilter('applied')}
        >
          Applied ({campaigns.filter(c => hasApplied(c)).length})
        </button>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="no-campaigns">
          <div className="no-campaigns-icon">🔍</div>
          <h3>No campaigns found</h3>
          <p>Check back later for new collaboration opportunities</p>
        </div>
      ) : (
        <div className="campaigns-grid">
          {filteredCampaigns.map(campaign => {
            const eligible = checkEligibility(campaign);
            const applied = hasApplied(campaign);
            const isFull = campaign.applicants?.length >= campaign.maxApplicants;

            return (
              <div key={campaign._id} className={`campaign-card ${!eligible ? 'ineligible' : ''}`}>
                <div className="campaign-brand">
                  <div className="brand-avatar">
                    {campaign.brandName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="brand-name">{campaign.brandName}</div>
                    <div className="campaign-category">{campaign.category}</div>
                  </div>
                </div>

                <h3>{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>

                <div className="campaign-requirements">
                  <div className="requirement-item">
                    <span className="req-icon">👥</span>
                    <div>
                      <div className="req-label">Min Followers</div>
                      <div className="req-value">{campaign.minFollowers.toLocaleString()}</div>
                    </div>
                    {!eligible && <span className="not-eligible">❌</span>}
                    {eligible && <span className="eligible">✅</span>}
                  </div>

                  <div className="requirement-item">
                    <span className="req-icon">🎯</span>
                    <div>
                      <div className="req-label">Spots Available</div>
                      <div className="req-value">
                        {campaign.applicants?.length || 0} / {campaign.maxApplicants}
                      </div>
                    </div>
                  </div>

                  {campaign.budget && (
                    <div className="requirement-item">
                      <span className="req-icon">💰</span>
                      <div>
                        <div className="req-label">Budget</div>
                        <div className="req-value">${campaign.budget.toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                </div>

                {campaign.platforms && campaign.platforms.length > 0 && (
                  <div className="campaign-platforms">
                    {campaign.platforms.map(platform => (
                      <span key={platform} className={`platform-tag ${platform}`}>
                        {platform}
                      </span>
                    ))}
                  </div>
                )}

                <div className="campaign-actions">
                  <button 
                    className="details-btn"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    View Details
                  </button>

                  {applied ? (
                    <button className="applied-btn" disabled>
                      ✓ Applied
                    </button>
                  ) : isFull ? (
                    <button className="full-btn" disabled>
                      Campaign Full
                    </button>
                  ) : !eligible ? (
                    <button className="ineligible-btn" disabled>
                      Not Eligible
                    </button>
                  ) : (
                    <button 
                      className="apply-btn"
                      onClick={() => handleApply(campaign)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="modal-overlay" onClick={() => setSelectedCampaign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedCampaign.title}</h2>
                <p className="modal-brand">{selectedCampaign.brandName} • {selectedCampaign.category}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedCampaign(null)}>×</button>
            </div>

            <div className="modal-body">
              <section className="detail-section">
                <h3>📝 Description</h3>
                <p>{selectedCampaign.description}</p>
              </section>

              <section className="detail-section">
                <h3>📋 Requirements</h3>
                <ul className="detail-list">
                  <li>Minimum {selectedCampaign.minFollowers.toLocaleString()} followers</li>
                  {selectedCampaign.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </section>

              {selectedCampaign.deliverables && selectedCampaign.deliverables.length > 0 && (
                <section className="detail-section">
                  <h3>🎯 Deliverables</h3>
                  <ul className="detail-list">
                    {selectedCampaign.deliverables.map((del, idx) => (
                      <li key={idx}>{del}</li>
                    ))}
                  </ul>
                </section>
              )}

              {selectedCampaign.platforms && selectedCampaign.platforms.length > 0 && (
                <section className="detail-section">
                  <h3>📱 Platforms</h3>
                  <div className="campaign-platforms">
                    {selectedCampaign.platforms.map(platform => (
                      <span key={platform} className={`platform-tag ${platform}`}>
                        {platform}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section className="detail-section">
                <h3>ℹ️ Campaign Details</h3>
                <div className="detail-grid">
                  <div>
                    <strong>Spots Available:</strong> {selectedCampaign.applicants?.length || 0} / {selectedCampaign.maxApplicants}
                  </div>
                  {selectedCampaign.budget && (
                    <div>
                      <strong>Budget:</strong> ${selectedCampaign.budget.toLocaleString()}
                    </div>
                  )}
                  {selectedCampaign.startDate && (
                    <div>
                      <strong>Start Date:</strong> {new Date(selectedCampaign.startDate).toLocaleDateString()}
                    </div>
                  )}
                  {selectedCampaign.endDate && (
                    <div>
                      <strong>End Date:</strong> {new Date(selectedCampaign.endDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </section>

              <div className="modal-actions">
                {hasApplied(selectedCampaign) ? (
                  <button className="applied-btn-large" disabled>
                    ✓ Already Applied
                  </button>
                ) : !checkEligibility(selectedCampaign) ? (
                  <button className="ineligible-btn-large" disabled>
                    Not Eligible - Need {selectedCampaign.minFollowers.toLocaleString()} followers
                  </button>
                ) : selectedCampaign.applicants?.length >= selectedCampaign.maxApplicants ? (
                  <button className="full-btn-large" disabled>
                    Campaign Full
                  </button>
                ) : (
                  <button 
                    className="apply-btn-large"
                    onClick={() => handleApply(selectedCampaign)}
                  >
                    Apply to This Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerCampaigns;
