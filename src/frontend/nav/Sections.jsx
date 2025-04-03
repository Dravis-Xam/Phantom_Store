import React, { useState, useEffect } from "react";
import './Sections.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { FaEllipsisV, FaEdit, FaTrash, FaStar, FaShare, FaCheck } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import { GoDownload } from "react-icons/go";

// Downloads Section
function Downloads() {
    const [downloads, setDownloads] = useState([
        { id: 1, app: "Photo Editor", version: "2.1.3", date: "2024-03-15", size: "45MB", status: "Downloaded" },
        { id: 2, app: "Video Player", version: "1.0.0", date: "2024-03-14", size: "28MB", status: "Pending" },
    ]);

    return (
        <div className="downloads-container">
            <h2>Download Manager</h2>
            <div className="downloads-list">
                {downloads.sort((a, b) => new Date(b.date) - new Date(a.date)).map(download => (
                    <div key={download.id} className="download-item">
                        <div className="download-info">
                            <h3>{download.app}</h3>
                            <p>Version: {download.version}</p>
                            <p>Date: {download.date}</p>
                            <p>Size: {download.size}</p>
                        </div>
                        <div className={`download-status ${download.status.toLowerCase()}`}>
                            {download.status}
                        </div>
                        {(download.status.toLowerCase() === 'downloaded') ? <button className="uninstall-btn">Uninstall</button> : <button className="cancel-download-btn">Cancel</button>}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Rewards Section
function Rewards() {
    const [points, setPoints] = useState(150);
    const [discount, setDiscount] = useState(Math.floor(points / 100));
    const [titles, setTitles] = useState([
        { name: "Novice Downloader", earned: true },
        { name: "Power User", earned: points >= 100 },
        { name: "Premium Member", earned: false },
    ]);

    return (
        <div className="rewards-container">
            <div className="wallet-section">
                <h2>Your Points Wallet</h2>
                <div className="points-display">
                    <span className="points">{points}</span> points
                </div>
                <p>Earn 2 points per regular download, 10 points for premium apps</p>
                <p>Current discount: {discount}% off premium apps</p>
            </div>

            <div className="titles-section">
                <h3>Earned Titles</h3>
                <div className="titles-grid">
                    {titles.map((title, index) => (
                        <div key={index} className={`title-card ${title.earned ? 'earned' : ''}`}>
                            {title.name}
                            {title.earned && <span className="badge">Earned</span>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="offers-section">
                <h3>Special Offers</h3>
                <div className="offer-card">
                    <h4>Double Points Weekend</h4>
                    <p>Download apps this weekend to earn double points!</p>
                </div>
            </div>
        </div>
    );
}

// Recents Section
function Recents() {
    const [history, setHistory] = useState([
        { id: 1, app: "Music Player", date: "2024-03-15", type: "download" },
        { id: 2, app: "Document Scanner", date: "2024-03-14", type: "update" },
    ]);

    return (
        <div className="recents-container">
            <h2>Recent Activity</h2>
            <div className="activity-list">
                {history.sort((a, b) => new Date(b.date) - new Date(a.date)).map(activity => (
                    <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                            {activity.type === 'download' ? <GoDownload /> : <GrUpdate />}
                        </div>
                        <div className="activity-details">
                            <h3>{activity.app}</h3>
                            <p>{new Date(activity.date).toLocaleDateString()}</p>
                            <p className="activity-type">{activity.type}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="clear-history"
                onClick={() => setHistory([])}
            >
                Clear History
            </button>
        </div>
    );
}

// Settings Section
function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john@example.com",
        avatar: "",
        avatarPreview: ""
    });const [savedReviews, setSavedReviews] = useState([
        { id: 1, app: 'Weather App', review: 'Great weather predictions!' },
        { id: 2, app: 'Fitness Tracker', review: 'Helped me lose 10kg' },
        { id: 3, app: 'Music Player', review: 'Best audio quality' }
      ]);
      const [manageMode, setManageMode] = useState(false);
      const [selectedReviews, setSelectedReviews] = useState([]);
      const [activeDropdown, setActiveDropdown] = useState(null);
    
    const [developerMode, setDeveloperMode] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [toggleNotification, setToggleNotification] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalProfile, setOriginalProfile] = useState({...profile});

    const openDevelopersPanel = () => {
        // Option 1: Navigate to a route (if using React Router)
        //navigate('/developers-panel');
        
        // Option 2: Open in a new tab (if using plain HTML)
        window.open('/developers-panel.html', '_blank');
      };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        setUploadError(null);

        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setUploadError('Please select a valid image file (JPEG, PNG, GIF)');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setUploadError('File size too large (max 2MB)');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfile(prev => ({
                ...prev,
                avatarPreview: event.target.result
            }));
        };
        reader.readAsDataURL(file);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setProfile(prev => ({
                            ...prev,
                            avatar: URL.createObjectURL(file)
                        }));
                        setUploadProgress(0);
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        return () => clearInterval(interval);
    };

    const handleRemoveAvatar = () => {
        setProfile(prev => ({
            ...prev,
            avatar: "",
            avatarPreview: ""
        }));
        setUploadProgress(0);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        const changesExist = 
          profile.name !== originalProfile.name || 
          profile.email !== originalProfile.email;
        setHasChanges(changesExist);
    }, [profile, originalProfile]);

    const handleSave = () => {
        setIsEditing(false);
        setOriginalProfile({...profile});
        // to send the updated profile to your backend
        console.log('Profile saved:', profile);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({...prev, [name]: value}));
      };

    const handleLogout = () => {
        console.log("User logged out");
    };

    
    const toggleManageMode = () => {
        setManageMode(!manageMode);
        setSelectedReviews([]);
        setActiveDropdown(null);
      };
    
      const toggleReviewSelection = (id) => {
        setSelectedReviews(prev => 
          prev.includes(id) 
            ? prev.filter(reviewId => reviewId !== id) 
            : [...prev, id]
        );
      };
    
      const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
      };
    
      const handleEditReview = (id) => {
        console.log('Edit review:', id);
        setActiveDropdown(null);
        // Implement your edit logic here
      };
    
      const handleDelete = (id) => {
        setSavedReviews(savedReviews.filter(review => review.id !== id));
        setActiveDropdown(null);
      };
    
      const handleStar = (id) => {
        console.log('Star review:', id);
        setActiveDropdown(null);
        // Implement your star logic here
      };
    
      const handleShare = () => {
        console.log('Share reviews:', selectedReviews);
        // Implement your share logic here
      };

      const handleToggle = () => {
        setToggleNotification(!toggleNotification); // Toggle between true/false
      };

    return (
        <div className={`settings-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="settings-grid">
                <div className="preferences-section">
                    <h2>Preferences</h2>
                    <div className="preference">
                        <h4>Themes</h4>
                        <button 
                            className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                            <span className="mode-text">{darkMode ? 'Light mode' : 'Dark mode'}</span>
                        </button>
                    </div>
                    <div className="preference">
                        <h4>Notifications</h4>
                        <div className="notification-toggle-container">
                            <button 
                                className={`toggle-switch ${toggleNotification ? 'enabled' : 'disabled'}`}
                                onClick={handleToggle}
                                aria-label={toggleNotification ? 'disable notifications' : 'enable notifications'}
                            >
                                <span className="notification-text">{toggleNotification ? 'Enabled' : 'Disabled'}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="profile-section">
                    <h2>Profile Settings</h2>
                    <div className="avatar-upload">
                        <div className="avatar-preview">
                            {profile.avatarPreview || profile.avatar ? (
                                <img
                                    src={profile.avatarPreview || profile.avatar}
                                    alt="Profile preview"
                                    className="avatar-image"
                                />
                            ) : (
                                <div className="avatar-placeholder">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="upload-progress">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                        <div className="avatar-controls">
                            <label className="upload-button">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    style={{ display: 'none' }}
                                />
                                {profile.avatar ? 'Change Avatar' : 'Upload Avatar'}
                            </label>
                            {(profile.avatar || profile.avatarPreview) && (
                                <button
                                    className="remove-button"
                                    onClick={handleRemoveAvatar}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        {uploadError && (
                            <div className="upload-error">{uploadError}</div>
                        )}
                    </div>
                    
                    <div className="profile-form">
                        <div className="profile-inputs">
                            <div className="profile-input-group">
                                <label>Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={profile.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="profile-input-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button 
                            className="edit-btn"
                            onClick={handleEdit}
                            >
                            <FaEdit /> Edit
                            </button>
                            
                            {hasChanges && (
                            <button 
                                className="save-btn"
                                onClick={handleSave}
                            >
                                <FaSave /> Save Changes
                            </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="reviews-section">
                    <div className="reviews-header">
                        <h3>Saved Reviews</h3>
                        <button 
                        className={`manage-btn ${manageMode ? 'active' : ''}`}
                        onClick={toggleManageMode}
                        >
                        {manageMode ? 'Done' : 'Manage'}
                        </button>
                    </div>

                    {manageMode && selectedReviews.length > 0 && (
                        <div className="bulk-actions">
                        <button className="share-btn" onClick={handleShare}>
                            <FaShare /> Share Selected
                        </button>
                        </div>
                    )}

                    <div className="reviews-list">
                        {savedReviews.map(review => (
                        <div key={review.id} className={`review-item ${manageMode ? 'manage-mode' : ''}`}>
                            {manageMode && (
                            <div className="review-checkbox">
                                <input
                                type="checkbox"
                                checked={selectedReviews.includes(review.id)}
                                onChange={() => toggleReviewSelection(review.id)}
                                />
                            </div>
                            )}
                            
                            <div className="review-content">
                            <div className="review-header">
                                <h4>{review.app}</h4>
                                {!manageMode && (
                                <div className="review-actions">
                                    <button className="edit-btn" onClick={() => handleEditReview(review.id)}>
                                    <FaEdit />
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(review.id)}>
                                    <FaTrash />
                                    </button>
                                </div>
                                )}
                                {manageMode && (
                                <div className="options-dropdown">
                                    <button 
                                    className="options-btn"
                                    onClick={() => toggleDropdown(review.id)}
                                    >
                                    <FaEllipsisV />
                                    </button>
                                    {activeDropdown === review.id && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleStar(review.id)}>
                                        <FaStar /> Star
                                        </button>
                                        <button onClick={() => handleDelete(review.id)}>
                                        <FaTrash /> Remove
                                        </button>
                                    </div>
                                    )}
                                </div>
                                )}
                            </div>
                            <p>{review.review}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <button 
                    className="developer-button"
                    onClick={openDevelopersPanel}
                    aria-label="Open developer panel"
                >
                    <FaCode className="developer-icon" />
                    <span>Developer Panel</span>
                </button>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export { Downloads, Recents, Settings, Rewards };