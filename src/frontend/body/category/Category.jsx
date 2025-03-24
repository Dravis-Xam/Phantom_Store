import React, { useState, useRef } from 'react';
import CategoryAppCard from './CategoryAppCard';
import { GrFormNextLink } from 'react-icons/gr';
import { FaChevronUp } from "react-icons/fa";

export default function Category({ category }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const categoryInnerRef = useRef(null);
    const cardWidth = 300; // Should match your CSS min-width
    const gap = 25; // Should match your CSS gap
 

    let apps = [
        { id: 1, bg: 'https://cdn6.aptoide.com/imgs/e/a/0/ea06b0aea58b936c6f54ba4206a51189_fgraphic.jpg?w=404&h=228', title: 'RAND: Shadow Legends', icon: 'https://cdn6.aptoide.com/imgs/e/a/0/ea06b0aea58b936c6f54ba4206a51189_fgraphic.jpg?w=404&h=228', rating: 4.1, downloads: '4.0' , category: 'games'},
        { id: 2, bg: 'https://cdn6.aptoide.com/imgs/e/b/b/ebb8583bf3c86995977e987b2ed29e04_fgraphic.png?w=404&h=228', title: 'Moto Bike X3M Racing Game', icon: 'https://cdn6.aptoide.com/imgs/e/b/b/ebb8583bf3c86995977e987b2ed29e04_fgraphic.png?w=404&h=228', rating: 3.9, downloads: '4.0', category: 'games' },
        { id: 3, bg: 'https://cdn6.aptoide.com/imgs/b/a/2/ba2a872452df0308ddb1b3c52dd4a1a1_fgraphic.png?w=404&h=228', title: 'Infinity Kingdom', icon: 'https://cdn6.aptoide.com/imgs/b/a/2/ba2a872452df0308ddb1b3c52dd4a1a1_fgraphic.png?w=404&h=228', rating: 4, downloads: '3.6', category: 'games' },
        {
            id: 4,
            bg: 'https://cdn6.aptoide.com/imgs/5/3/3/5330fad1603638fa28781b08659f16b7_fgraphic.jpg?w=404&h=228',
            title: 'Age of Apes',
            icon: 'https://cdn6.aptoide.com/imgs/5/3/3/5330fad1603638fa28781b08659f16b7_fgraphic.jpg?w=404&h=228',
            rating: 2.6,
            downloads: '3.55', category: 'games'
        },
        {
            id: 5,
            bg: 'https://cdn6.aptoide.com/imgs/0/7/9/07978aab90e81a17e256f454d2b6f217_fgraphic.jpg?w=404&h=228',
            title: 'Mobile Legends: Adventure',
            icon: 'https://cdn6.aptoide.com/imgs/0/7/9/07978aab90e81a17e256f454d2b6f217_fgraphic.jpg?w=404&h=228',
            rating: 3.5,
            downloads: '4.21', category: 'games'
        },
        {
            id: 6,
            bg: 'https://cdn6.aptoide.com/imgs/2/8/e/28e5c069f1c3581f84e9bfac07205c61_fgraphic.png?w=404&h=228',
            title: 'Cut the Rope FULL FREE',
            icon: 'https://cdn6.aptoide.com/imgs/2/8/e/28e5c069f1c3581f84e9bfac07205c61_fgraphic.png?w=404&h=228',
            rating: 'star-icon.png',
            downloads: '4.3', category: 'games'
        },
    ];

    const toggleCategory = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNextClick = () => {
        if (categoryInnerRef.current) {
            const container = categoryInnerRef.current;
            const scrollAmount = 2 * (cardWidth + gap);
            const newPosition = scrollPosition + scrollAmount;
            
            // Calculate max scroll position
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Apply smooth scroll
            container.scrollTo({
                left: Math.min(newPosition, maxScroll),
                behavior: 'smooth'
            });
            
            // Update scroll position state
            setScrollPosition(Math.min(newPosition, maxScroll));
        }
    };

    return (
        <div className='category-container'>
            <div className='category-title'>
                <h2>{category}</h2>
                <button 
                    className='toggleCategoryBtn' 
                    onClick={toggleCategory}
                    style={{ transform: `rotate(${isCollapsed ? '180deg' : '0deg'})` }}
                >
                    <FaChevronUp />
                </button>
            </div>
            <div 
                className={`category-inner ${isCollapsed ? 'collapsed' : ''}`} 
                ref={categoryInnerRef}
            >
                {apps.map((app) => (
                    (category.toLowerCase() === app.category) && 
                    <CategoryAppCard app={app} key={app.id} />
                ))}
            </div>
            {!isCollapsed && (
                <button className='showNextAppsBtn' onClick={handleNextClick}>
                    <GrFormNextLink />
                </button>
            )}
        </div>
    )
}