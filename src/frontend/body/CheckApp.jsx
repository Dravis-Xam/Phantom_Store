import React from 'react'
import './checkapp.css'
import { useCheckApp } from '../../CheckAppContext';
import { IoCloseSharp } from "react-icons/io5";

export default function CheckApp() {

  const { hideCheckApp, selectedApp } = useCheckApp();

  if (!selectedApp) return;

  return (
    <div className="modal-overlay">
      <div className='check-app-container'>
        <button className="back-btn" onClick={hideCheckApp}><IoCloseSharp /></button>
        <img src="https://play-lh.googleusercontent.com/K6dIu3r6hzEnvOF2Vfvfd_6pj0MTB4Vfj29TOkT3Wb6YiXC9crwvxkA83WjoLkaocg=w526-h296-rw" alt="" className='app-background-image'/>
        <h1 className="app-title">OTR - Offroad Car Driving Game</h1>
        <p className="developer">DogByte Games</p>
        
        <div className="app-meta">
          <span className="ads-warning">Contains ads: in-app purchases</span>
          
          <div className="rating-section">
            <div className="star-rating">
              <span className="stars">4.4 ★</span>
              <span className="reviews">49.4K reviews</span>
            </div>
            
            <div className="download-info">
              <span className="downloads">50M+ Downloads</span>
              <span className="age-rating">Rated for 3+</span>
            </div>
          </div>
        </div>

        <div className="install-actions">
          <button className="install-button windows-install">
            Install on Windows
            <span className="beta-notice">Google Play Games beta is required</span>
          </button>
          <button className="install-button other-devices">Install on more devices</button>
        </div>

        <div className="secondary-actions">
          <button className="share-button">Share</button>
          <a href="#" className="waitlist-link">Add to waitlist</a>
        </div>

        <div className="legal-notice">
          <small>
            By downloading the beta and the game, you agree to the{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">Google Terms of Service®</a> and{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">Google Play Terms of Service®</a>.{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">Learn more!?</a>
          </small>
        </div>
      </div>
    </div>
  )
}