import React, { useState, useEffect } from 'react';
import { FaHistory } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Make sure to create this CSS file

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged-in user when component mounts
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login'); // Redirect to login page
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  if (!user) {
    return (
      <div className='profile-icon-container'>
        <button className='login-btn' onClick={() => navigate('/login')}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className='profile-icon-container'>
      <button className='profile-btn' onClick={toggleProfile}>
        <MdOutlineAccountCircle />
        <span className='username'>{user.username || user.email}</span>
      </button>
      
      {isProfileOpen && (
        <div className='profile-container'>
          <button className='profileCloseBtn' onClick={toggleProfile}>
            <IoMdClose />
          </button>
          
          <div className='profile-header'>
            {user.avatar ? (
              <img src={user.avatar} alt='Profile' className='profile-avatar' />
            ) : (
              <div className='profile-avatar-placeholder'>
                {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <h3>{user.username || 'Guest'}</h3>
            <p className='user-email'>{user.email}</p>
          </div>
          
          <ul className='profile-options'>
            <li className='profile-option-container'>
              <button>
                <FaHistory />
                <span>History</span>
              </button>
            </li>
            <li className='profile-option-container'>
              <button>
                <FaExchangeAlt />
                <span>Change email</span>
              </button>
            </li>
            <li className='profile-option-container'>
              <button>
                <MdOutlinePassword />
                <span>Change password</span>
              </button>
            </li>
            <li className='profile-option-container'>
              <button>
                <FaHistory />
                <span>Bind Account</span>
              </button>
            </li>
            <li className='profile-option-container'>
              <button>
                <IoLibrary />
                <span>Library</span>
              </button>
            </li>
            <li className='profile-option-container'>
              <button onClick={handleLogout}>
                <IoIosLogOut />
                <span>Log out</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}