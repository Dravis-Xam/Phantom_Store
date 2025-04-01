import React, { useState, useEffect } from 'react';
import { FaAngleDoubleUp } from "react-icons/fa";
import './gtt.css'

export default function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down 100vh
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top handler
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
      <div className={`go-to-top-container ${isVisible ? 'visible' : ''}`}>
        <button className='goToTopBtn' onClick={scrollToTop} aria-label="Scroll to top">
            <FaAngleDoubleUp />
        </button>
    </div>
    );
}