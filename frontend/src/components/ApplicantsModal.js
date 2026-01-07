import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApplicantsModal.css';

const ApplicantsModal = ({ campaign, onClose, onUpdate }) => {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState({});

    useEffect(() => {
        fetchApplicants();
    }, [campaign._id]);

    const fetchApplicants = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching applicants for campaign:', campaign._id);
            
            const response = await axios.get(
                `/api/campaigns/${campaign._id}/applicants`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log('Applicants response:', response.data);

            if (response.data.success) {
                console.log('Setting applicants:', response.data.data.applicants);
                setApplicants(response.data.data.applicants);
            }
        } catch (error) {
            console.error('Failed to fetch applicants:', error);
            console.error('Error response:', error.response?.data);
            
            // Show error message to user
            if (error.response?.status === 403) {
                alert('Access denied: ' + (error.response?.data?.message || 'You do not have permission to view these applicants'));
            } else {
                alert('Failed to load applicants: ' + (error.response?.data?.message || error.message));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (applicantId, status) => {
        setProcessing(prev => ({ ...prev, [applicantId]: true }));

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `/api/campaigns/${campaign._id}/applicants/${applicantId}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                // Update local state
                setApplicants(prev =>
                    prev.map(app =>
                        app._id === applicantId ? { ...app, status } : app
                    )
                );
                
                // Notify parent to refresh
                if (onUpdate) {
                    onUpdate();
                }

                // Show success message
                if (status === 'accepted') {
                    alert('Influencer accepted! A notification has been sent to them.');
                }
            }
        } catch (error) {
            console.error('Failed to update applicant status:', error);
            alert('Failed to update status. Please try again.');
        } finally {
            setProcessing(prev => ({ ...prev, [applicantId]: false }));
        }
    };

    const handleMessageInfluencer = (applicant) => {
        // Navigate to messages with user ID in URL
        navigate(`/messages?user=${applicant.influencerId._id}`);
        onClose();
    };

    const formatFollowers = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        }
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count?.toString() || '0';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="applicants-modal-overlay" onClick={onClose}>
            <div className="applicants-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="applicants-modal-header">
                    <div>
                        <h2>Campaign Applicants</h2>
                        <p className="campaign-title">{campaign.title}</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="applicants-modal-body">
                    {loading ? (
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Loading applicants...</p>
                        </div>
                    ) : applicants.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <h3>No Applications Yet</h3>
                            <p>Influencers haven't applied to this campaign yet.</p>
                        </div>
                    ) : (
                        <div className="applicants-list">
                            {applicants.map((applicant) => (
                                <div key={applicant._id} className={`applicant-card ${applicant.status}`}>
                                    <div className="applicant-header">
                                        <div className="applicant-profile">
                                            <div
                                                className="applicant-avatar"
                                                style={{
                                                    backgroundColor: applicant.influencerId?.avatarColor || '#667eea'
                                                }}
                                            >
                                                {applicant.influencerId?.avatarIcon || 
                                                 applicant.influencerName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="applicant-info">
                                                <h3>{applicant.influencerName}</h3>
                                                <p className="applicant-email">{applicant.influencerId?.email}</p>
                                                <div className="applicant-stats">
                                                    <span className="stat-item">
                                                        <span className="stat-icon">👥</span>
                                                        {formatFollowers(applicant.followers)} followers
                                                    </span>
                                                    <span className="stat-item">
                                                        <span className="stat-icon">📅</span>
                                                        Applied {formatDate(applicant.appliedAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`status-badge ${applicant.status}`}>
                                            {applicant.status}
                                        </div>
                                    </div>

                                    {applicant.influencerId?.bio && (
                                        <div className="applicant-bio">
                                            <p>{applicant.influencerId.bio}</p>
                                        </div>
                                    )}

                                    <div className="applicant-actions">
                                        {applicant.status === 'pending' && (
                                            <>
                                                <button
                                                    className="action-btn accept-btn"
                                                    onClick={() => handleStatusUpdate(applicant._id, 'accepted')}
                                                    disabled={processing[applicant._id]}
                                                >
                                                    {processing[applicant._id] ? (
                                                        <span className="btn-loading">Processing...</span>
                                                    ) : (
                                                        <>
                                                            <span className="btn-icon">✓</span>
                                                            Accept
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    className="action-btn reject-btn"
                                                    onClick={() => handleStatusUpdate(applicant._id, 'rejected')}
                                                    disabled={processing[applicant._id]}
                                                >
                                                    {processing[applicant._id] ? (
                                                        <span className="btn-loading">Processing...</span>
                                                    ) : (
                                                        <>
                                                            <span className="btn-icon">✕</span>
                                                            Reject
                                                        </>
                                                    )}
                                                </button>
                                            </>
                                        )}
                                        {applicant.status === 'accepted' && (
                                            <button
                                                className="action-btn message-btn"
                                                onClick={() => handleMessageInfluencer(applicant)}
                                            >
                                                <span className="btn-icon">💬</span>
                                                Message Influencer
                                            </button>
                                        )}
                                        {applicant.status === 'rejected' && (
                                            <span className="rejected-text">Application Rejected</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="applicants-modal-footer">
                    <div className="applicants-summary">
                        <span className="summary-item">
                            <strong>{applicants.length}</strong> Total Applications
                        </span>
                        <span className="summary-item">
                            <strong>{applicants.filter(a => a.status === 'accepted').length}</strong> Accepted
                        </span>
                        <span className="summary-item">
                            <strong>{applicants.filter(a => a.status === 'pending').length}</strong> Pending
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicantsModal;
