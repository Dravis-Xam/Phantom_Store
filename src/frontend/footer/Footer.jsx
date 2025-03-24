import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa"
import './footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import logo from '../../assets/P.gif';


export default function Footer() {

    const [collapsedSections, setCollapsedSections] = useState({
        about: true,
        knowUs: true,
        products: true
    });

    const toggleSection = (section) => {
        setCollapsedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };


  return (
    <div>
        <div className='footer'>
            <div className='social-container'>
                <div className='social-title'>
                    <img src={logo} alt="" />
                    <h2>Phantom Store</h2>
                </div>
                <p className='store-description'>
                    A one-stop shop where one can get any app and download securely for free. From video games to business apps, we bring a wide variety of apps to your convenience on any device.</p>
                <div className="social-links-container">
                    <div className="social-link">
                        <a href="" target='_blank'>
                        <FaFacebook /></a>
                    </div>
                    <div className="social-link">
                        <a href="" target='_blank'>
                        <FaXTwitter /></a>
                    </div>
                    <div className="social-link">
                        <a href="" target='_blank'>
                        <FaInstagramSquare /></a>
                    </div>
                    <div className="social-link">
                        <a href="" target='_blank'>
                        <FaLinkedinIn /></a>
                    </div>
                    <div className="social-link">
                        <a href="" target='_blank'>
                        <FaDiscord /></a>
                    </div>
                </div>
            </div>
            <div className='about-store-container'>
                <div className="about-title">
                    <h3>About Store</h3>
                    <button 
                        onClick={() => toggleSection('about')}
                        style={{ transform: `rotate(${collapsedSections.about ? '0deg' : '180deg'})` }}
                    >
                        <FaChevronDown />
                    </button>
                </div>
                <div className={`about-store-links ${collapsedSections.about ? 'collapsed' : ''}`}>
                    <a href="">FAQs</a>
                    <a href="">Support</a>
                    <a href="">Contact Us</a>
                    <a href="">Blog</a>
                </div>
            </div>

            <div className='know-us-container'>
                <div className="know-us-title">
                    <h3>Know Us</h3>
                    <button 
                        onClick={() => toggleSection('knowUs')}
                        style={{ transform: `rotate(${collapsedSections.knowUs ? '0deg' : '180deg'})` }}
                    >
                        <FaChevronDown />
                    </button>
                </div>
                <div className={`know-us-links ${collapsedSections.knowUs ? 'collapsed' : ''}`}>
                    <a href="">The Company</a>
                    <a href="">Products</a>
                    <a href="">About Us</a>
                    <a href="">Careers</a>
                </div>
            </div>

            <div className='our-products-container'>
                <div className="our-products-title">
                    <h3>Our Products</h3>
                    <button 
                        onClick={() => toggleSection('products')}
                        style={{ transform: `rotate(${collapsedSections.products ? '0deg' : '180deg'})` }}
                    >
                        <FaChevronDown />
                    </button>
                </div>
                <div className={`our-products-links ${collapsedSections.products ? 'collapsed' : ''}`}>
                    <a href="">App Store</a>
                    <a href="">iOS</a>
                    <a href="">TVs</a>
                </div>
            </div>
        <br />
        </div>
        <div className="copyright-section">
            <span>&copy;2025</span>
            <span>Copyright</span>
            <span>Terms and conditions apply</span>
        </div>
    </div>
  )
}
