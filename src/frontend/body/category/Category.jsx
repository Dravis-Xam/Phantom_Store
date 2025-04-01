import React, { useState, useRef, useEffect } from 'react';
import CategoryAppCard from './CategoryAppCard';
import { GrFormNextLink } from 'react-icons/gr';
import { FaChevronUp } from "react-icons/fa";

export default function Category({ category }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categoryInnerRef = useRef(null);
    const cardWidth = 300; // Should match your CSS min-width
    const gap = 25; // Should match your CSS gap

    // Fetch apps for this category from your backend API
    useEffect(() => {
        const fetchApps = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/apps?category=${category.category_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch apps');
                }
                const data = await response.json();
                setApps(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApps();
    }, [category.category_id]);

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

    if (loading) return <div className="category-container">Loading {category.name} apps...</div>;
    if (error) return <div className="category-container">Error loading {category.name}: {error}</div>;

    return (
        <div className='category-container'>
            <div className='category-title'>
                <h2>{category.name}</h2>
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
                    <CategoryAppCard app={app} key={app.app_id} />
                ))}
            </div>
            {!isCollapsed && apps.length > 0 && (
                <button className='showNextAppsBtn' onClick={handleNextClick}>
                    <GrFormNextLink />
                </button>
            )}
        </div>
    );
}