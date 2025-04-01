import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import { MdOutlineCategory } from "react-icons/md";
import { PiDownloadSimpleFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaGifts } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";
import { FaLaptop } from "react-icons/fa";
import checked from '../../assets/checked.png';
import download from '../../assets/download.gif';
import hourglass from '../../assets/hourglass.gif';
import trophy from '../../assets/trophy.gif';
import { Link } from 'react-router-dom';

export default function Nav({ onSectionChange }) {
  const iconStyles = { width: 35, height: 35 };
  const [activeSection, setActiveSection] = useState('home');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [pendingDownloads] = useState(3);
  const [completedDownloads] = useState(5);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowCategoryDropdown(false);
    setShowMoreDropdown(false);
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const handleCategorySelect = (category) => {
    handleSectionChange(category);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowMoreDropdown(false);
  };

  const toggleMoreDropdown = () => {
    setShowMoreDropdown(!showMoreDropdown);
    setShowCategoryDropdown(false);
  };

  return (
    <nav className="nav" role="navigation">
      {/* Home Link */}
      <div className="link-container">
        <button 
          className={`nav-button ${activeSection === 'home' ? 'active' : ''}`}
          aria-label="Home"
          onClick={() => handleSectionChange('home')}
        >
          <span className="link-icon" style={iconStyles}>
            <IoHomeOutline />
          </span>
          <span className="link-text">Home</span>
        </button>
      </div>

      {/* Games Link */}
      <div className="link-container">
        <button 
          className={`nav-button ${activeSection === 'games' ? 'active' : ''}`}
          aria-label="Games"
          onClick={() => handleSectionChange('games')}
        >
          <span className="link-icon" style={iconStyles}>
            <FaGamepad />
          </span>
          <span className="link-text">Games</span>
        </button>
      </div>

      {/* Apps Link */}
      <div className="link-container">
        <button 
          className={`nav-button ${activeSection === 'apps' ? 'active' : ''}`}
          aria-label="Apps"
          onClick={() => handleSectionChange('apps')}
        >
          <span className="link-icon" style={iconStyles}>
            <GrAppsRounded />
          </span>
          <span className="link-text">Apps</span>
        </button>
      </div>

      {/* Categories Dropdown */}
      <div className="link-container link-link">
        <button 
          className={`nav-button ${activeSection.startsWith('category-') ? 'active' : ''}`}
          aria-label="Categories"
          aria-haspopup="true"
          aria-expanded={showCategoryDropdown}
          onClick={toggleCategoryDropdown}
        >
          <span className="link-icon" style={iconStyles}>
            <MdOutlineCategory />
          </span>
          <span className="link-text">Categories</span>
        </button>
        
        {showCategoryDropdown && (
          <div className="category-dropdown" role="menu">
            <div className="category-dropdown-container">
              <button 
                className={`dropdown-item ${activeSection === 'category-games' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('category-games')}
                role="menuitem"
              >
                <IoGameController /> Games
              </button>
              <button 
                className={`dropdown-item ${activeSection === 'category-social' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('category-social')}
                role="menuitem"
              >
                <IoShareSocial /> Social
              </button>
              <button 
                className={`dropdown-item ${activeSection === 'category-music' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('category-music')}
                role="menuitem"
              >
                <IoIosMusicalNotes /> Music
              </button>
              <button 
                className={`dropdown-item ${activeSection === 'category-pc-apps' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('category-pc-apps')}
                role="menuitem"
              >
                <FaLaptop /> PC apps
              </button>
            </div>
          </div>
        )}
      </div>

      {/* More Options Dropdown */}
      <div className="link-container more-link">
        <button
          className={`nav-button ${activeSection.startsWith('more-') ? 'active' : ''}`}
          aria-label="More options"
          aria-haspopup="true"
          aria-expanded={showMoreDropdown}
          onClick={toggleMoreDropdown}
        >
          <span className="link-icon" style={iconStyles}>
            <GiHamburgerMenu />
          </span>
          <span className="link-text">More</span>
        </button>
        
        {showMoreDropdown && (
          <div className="more-dropdown" role="menu">
            <div className="more-container">
              {/* Stats Section */}
              <div className="more-stats">
                <div className="more-stats-item">
                  <span className="floating-count-label">
                    {completedDownloads > 0 ? (
                      <img src={checked} alt="Completed" height={15} width={15} />
                    ) : (
                      completedDownloads
                    )}
                  </span>
                  <img src={download} alt="Download progress" />
                  <span className="text">Downloads</span>
                </div>
                <div className="more-stats-item">
                  <img src={trophy} alt="Achievements" />
                  <span className="text">Achievements</span>
                </div>
                <div className="more-stats-item">
                  <span className="floating-count-label">{pendingDownloads}</span>
                  <img src={hourglass} alt="Pending downloads" />
                  <span className="text">Pending Downloads</span>
                </div>
              </div>

              {/* Action Buttons */}
              <Link to="/downloads">
              <button 
                className={`option-button ${activeSection === 'more-downloads' ? 'active' : ''}`}
                onClick={() => handleSectionChange('more-downloads')}
                role="menuitem"
              >
                <PiDownloadSimpleFill /> Downloads
              </button>
              </Link>
              <Link to="/recents">
              <button 
                className={`option-button ${activeSection === 'more-recents' ? 'active' : ''}`}
                onClick={() => handleSectionChange('more-recents')}
                role="menuitem"
              >
                <MdLibraryBooks /> Recents
              </button>
              </Link>
              <Link to="/settings">
              <button 
                className={`option-button ${activeSection === 'more-settings' ? 'active' : ''}`}
                onClick={() => handleSectionChange('more-settings')}
                role="menuitem"
              >
                <IoIosSettings /> Settings
              </button>
              </Link>
              <Link to="/rewards">
              <button 
                className={`option-button ${activeSection === 'more-rewards' ? 'active' : ''}`}
                onClick={() => handleSectionChange('more-rewards')}
                role="menuitem"
              >
                <FaGifts /> Rewards
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}