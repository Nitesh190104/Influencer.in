import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApplicantsModal from '../components/ApplicantsModal';
import './BrandCampaigns.css';

const BrandCampaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Fashion',
    minFollowers: 1000,
    maxApplicants: 10,
    budget: '',
    platforms: [],
    requirements: '',
    deliverables: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/campaigns/brand/my-campaigns', {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      // Validate required fields
      if (!formData.title || !formData.title.trim()) {
        alert('Please fill in the Campaign Title (scroll to top of form)');
        return;
      }

      if (!formData.description || !formData.description.trim()) {
        alert('Please fill in the Description (scroll to top of form)');
        return;
      }

      if (!formData.category) {
        alert('Please select a Category');
        return;
      }

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        minFollowers: parseInt(formData.minFollowers) || 0,
        maxApplicants: parseInt(formData.maxApplicants) || 10,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        platforms: formData.platforms,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        deliverables: formData.deliverables.split('\n').filter(d => d.trim()),
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        status: formData.status
      };

      console.log('Submitting campaign:', payload);

      let response;
      if (editingCampaign) {
        response = await axios.put(`http://localhost:5000/api/campaigns/${editingCampaign._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        response = await axios.post('http://localhost:5000/api/campaigns', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      console.log('Campaign response:', response.data);

      if (response.data.success) {
        alert(editingCampaign ? 'Campaign updated successfully!' : 'Campaign created successfully!');
        setShowCreateModal(false);
        setEditingCampaign(null);
        resetForm();
        fetchCampaigns();
      }
    } catch (error) {
      console.error('Failed to save campaign:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 'Failed to create campaign';
      const errorDetails = error.response?.data?.details;
      
      if (errorDetails && errorDetails.length > 0) {
        const detailMessages = errorDetails.map(d => `${d.field}: ${d.message}`).join('\n');
        alert(`${errorMessage}\n\nMissing fields:\n${detailMessages}`);
      } else {
        alert(errorMessage);
      }
    }
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      category: campaign.category,
      minFollowers: campaign.minFollowers,
      maxApplicants: campaign.maxApplicants,
      budget: campaign.budget || '',
      platforms: campaign.platforms || [],
      requirements: campaign.requirements?.join('\n') || '',
      deliverables: campaign.deliverables?.join('\n') || '',
      startDate: campaign.startDate ? campaign.startDate.split('T')[0] : '',
      endDate: campaign.endDate ? campaign.endDate.split('T')[0] : '',
      status: campaign.status
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCampaigns();
    } catch (error) {
      console.error('Failed to delete campaign:', error);
      alert('Failed to delete campaign');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Fashion',
      minFollowers: 1000,
      maxApplicants: 10,
      budget: '',
      platforms: [],
      requirements: '',
      deliverables: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
  };

  const handleViewApplicants = (campaign) => {
    setSelectedCampaign(campaign);
    setShowApplicantsModal(true);
  };

  if (loading) {
    return (
      <div className="campaigns-loading">
        <div className="loading-spinner"></div>
        <p>Loading campaigns...</p>
      </div>
    );
  }

  return (
    <div className="brand-campaigns-container">
      <div className="campaigns-header">
        <div className="campaigns-header-left">
          <button 
            className="back-to-dashboard-btn"
            onClick={() => navigate('/brand-dashboard')}
            title="Back to Dashboard"
          >
            <span className="back-arrow">←</span>
            <span>Back</span>
          </button>
          <div>
            <h1>My Campaigns</h1>
            <p>Create and manage your influencer marketing campaigns</p>
          </div>
        </div>
        <button 
          className="create-campaign-btn"
          onClick={() => {
            setEditingCampaign(null);
            resetForm();
            setShowCreateModal(true);
          }}
        >
          <span className="plus-icon">+</span>
          Create Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="no-campaigns">
          <div className="no-campaigns-icon">📢</div>
          <h3>No campaigns yet</h3>
          <p>Create your first campaign to start collaborating with influencers</p>
          <button 
            className="create-first-btn"
            onClick={() => setShowCreateModal(true)}
          >
            Create Your First Campaign
          </button>
        </div>
      ) : (
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            <div key={campaign._id} className="campaign-card">
              <div className="campaign-header">
                <span className={`status-badge ${campaign.status}`}>
                  {campaign.status}
                </span>
                <div className="campaign-actions">
                  <button onClick={() => handleEdit(campaign)} title="Edit">✏️</button>
                  <button onClick={() => handleDelete(campaign._id)} title="Delete">🗑️</button>
                </div>
              </div>

              <h3>{campaign.title}</h3>
              <p className="campaign-description">{campaign.description}</p>

              <div className="campaign-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{campaign.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Min Followers:</span>
                  <span className="meta-value">{campaign.minFollowers.toLocaleString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Max Applicants:</span>
                  <span className="meta-value">{campaign.maxApplicants}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Applicants:</span>
                  <span className="meta-value highlight">
                    {campaign.applicants?.length || 0} / {campaign.maxApplicants}
                  </span>
                </div>
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

              <button 
                className="view-applicants-btn"
                onClick={() => handleViewApplicants(campaign)}
              >
                View Applicants ({campaign.applicants?.length || 0})
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Campaign Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="campaign-form">
              <div className="form-group">
                <label>Campaign Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Promotion of Monster Energy Drink"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your campaign goals, target audience, and what you're looking for..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Fashion">Fashion</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Tech">Tech</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Finance">Finance</option>
                    <option value="Parenting">Parenting</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Minimum Followers *</label>
                  <input
                    type="number"
                    name="minFollowers"
                    value={formData.minFollowers}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Max Applicants *</label>
                  <input
                    type="number"
                    name="maxApplicants"
                    value={formData.maxApplicants}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Platforms</label>
                <div className="platform-checkboxes">
                  {['instagram', 'facebook', 'youtube', 'tiktok', 'twitter'].map(platform => (
                    <label key={platform} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                      />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Requirements (one per line)</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="e.g.,&#10;Must create 3 Instagram posts&#10;Must include product shots&#10;Tag @brandname in all posts"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Deliverables (one per line)</label>
                <textarea
                  name="deliverables"
                  value={formData.deliverables}
                  onChange={handleInputChange}
                  placeholder="e.g.,&#10;3x Instagram Feed Posts&#10;5x Instagram Stories&#10;1x YouTube Video"
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applicants Modal */}
      {showApplicantsModal && selectedCampaign && (
        <ApplicantsModal
          campaign={selectedCampaign}
          onClose={() => {
            setShowApplicantsModal(false);
            setSelectedCampaign(null);
          }}
          onUpdate={() => {
            fetchCampaigns();
          }}
        />
      )}
    </div>
  );
};

export default BrandCampaigns;