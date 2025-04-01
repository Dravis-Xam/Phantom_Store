import React, { useState } from "react";
import './Sections.css';

// Downloads Section
function Downloads() {
    const [downloads, setDownloads] = useState([
        { id: 1, app: "Photo Editor", version: "2.1.3", date: "2024-03-15", size: "45MB", status: "Completed" },
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
                            {activity.type === 'download' ? '⬇️' : '🔄'}
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
    });
    const [savedReviews] = useState([
        { id: 1, app: "Photo Editor", review: "Great app!" },
    ]);
    const [developerMode, setDeveloperMode] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);

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

    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
        <div className={`settings-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="settings-grid">
                <div className="preferences-section">
                    <h2>Preferences</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                        />
                        Dark Mode
                    </label>
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

                    <label>
                        Name:
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                    </label>
                </div>

                <div className="reviews-section">
                    <h3>Saved Reviews</h3>
                    {savedReviews.map(review => (
                        <div key={review.id} className="review-item">
                            <h4>{review.app}</h4>
                            <p>{review.review}</p>
                        </div>
                    ))}
                </div>

                <div className="developer-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={developerMode}
                            onChange={(e) => setDeveloperMode(e.target.checked)}
                        />
                        Developer View
                    </label>
                    {developerMode && (
                        <div className="developer-options">
                            <button>Debug Console</button>
                            <button>API Settings</button>
                        </div>
                    )}
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export { Downloads, Recents, Settings, Rewards };