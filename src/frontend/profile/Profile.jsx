import React, { useState, useEffect } from 'react';
import { FaHistory, FaExchangeAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineAccountCircle, MdOutlinePassword } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      const loginTime = localStorage.getItem('loginTime');

      if (storedUser && token && loginTime) {
        const now = new Date().getTime();
        const timeDiff = now - parseInt(loginTime);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const remainingDays = 30 - daysDiff;

        setDaysRemaining(remainingDays);

        if (remainingDays <= 0) {
          // Session expired
          handleLogout();
        } else {
          setUser(JSON.parse(storedUser));
          
          // Show reminder if 3 days or less remaining
          if (remainingDays <= 3) {
            alert(`Your session will expire in ${remainingDays} day(s). Please log in again soon.`);
          }
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login');
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className='profile-icon-container'>
      {user ? (
        <>
          <button className='profile-btn' onClick={toggleProfile}>
            <div className='profile-icon'><MdOutlineAccountCircle /></div>
            <span className='username'>{user.username || 'Profile'}</span>
          </button>
          
          <div className={`profile-overlay ${isProfileOpen ? 'active' : ''}`} onClick={toggleProfile}></div>
          
          <div className={`profile-container ${isProfileOpen ? 'active' : ''}`}>
            <button className='profile-close-btn' onClick={toggleProfile}>
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
              <h3>{user.username || 'User'}</h3>
              <p className='user-email'>{user.email}</p>
              {daysRemaining && (
                <p className='session-info'>
                  Session expires in: {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            
            <ul className='profile-options'>
              <li>
                <button className='profile-option'>
                  <FaHistory />
                  <span>History</span>
                </button>
              </li>
              <li>
                <button className='profile-option'>
                  <FaExchangeAlt />
                  <span>Change email</span>
                </button>
              </li>
              <li>
                <button className='profile-option'>
                  <MdOutlinePassword />
                  <span>Change password</span>
                </button>
              </li>
              <li>
                <button className='profile-option'>
                  <IoLibrary />
                  <span>Library</span>
                </button>
              </li>
              <li>
                <button className='profile-option logout' onClick={handleLogout}>
                  <IoIosLogOut />
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <button className='profile-btn' onClick={() => navigate('/login')}>
          <MdOutlineAccountCircle />
          <span className='username'>Sign In</span>
        </button>
      )}
    </div>
  );
}