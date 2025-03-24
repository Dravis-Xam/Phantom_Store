import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import { MdOutlineCategory } from "react-icons/md";
import { PiDownloadSimpleFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaGifts } from "react-icons/fa";
import checked from '../../assets/checked.png';
import download from '../../assets/download.gif';
import hourglass from '../../assets/hourglass.gif';
import trophy from '../../assets/trophy.gif';
import { IoShareSocial } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";
import { FaLaptop } from "react-icons/fa";

export default function Nav() {
  const styles = {width: 35, height: 35 }
  return (
    <div className='nav'>
      <div className='link-container'>
        <button>
          <span style={styles} className='link-icon'><IoHomeOutline /></span>
          Home
        </button>
        
      </div>
      <div className='link-container'>
        <button>
          <span style={styles} className='link-icon'><FaGamepad /></span>
          Games
        </button>
        
      </div>
      <div className='link-container'>
        <button>
          <span style={styles} className='link-icon'><GrAppsRounded /></span>
          Apps
        </button>
        
      </div>
      <div className='link-container link-link'>
        <button>
          <span style={styles} className='link-icon'><MdOutlineCategory /></span>
           Categories
        </button>
        <div className="category-dropdown">
          <div className="category-dropdown-container">
            <a href=""><IoGameController />Games</a>
            <a href=""><IoShareSocial />Social</a>
            <a href=""><IoIosMusicalNotes />Music</a>
            <a href=""><FaLaptop />PC apps</a>
          </div>
        </div>
      </div>
      <div className='link-container more-link'>
        <button>
        <span style={styles} className='link-icon'><GiHamburgerMenu /></span>
          More
        </button>
        <div className="more-dropdown">
          <div className="more-container">
            <div className="more-stats">
              <div className='more-stats-title'><span className='floating-count-label'>3</span><img src={download} alt="..." /><span className="text">Downloads</span></div>
              <div><img src={trophy} alt="..." /><span className="text">Achievements</span></div>
              <div><span className='floating-count-label'>3</span><img src={hourglass} alt="..." /><span className="text">Pending Downloads</span></div>
            </div>
            <button className='option-button'>
              <PiDownloadSimpleFill />Downloads
            </button>
            <button className='option-button'>
              <MdLibraryBooks />Library
            </button>
            <button className='option-button'>
              <IoIosSettings />Settings
            </button>
            <button className='option-button'>
              <FaGifts />Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
