// category/Category.jsx
import React, { useRef, useEffect, useCallback, useState } from 'react';
import CategoryAppCard from './CategoryAppCard';
import { GrFormNextLink } from 'react-icons/gr';
import { FaChevronUp } from "react-icons/fa";
import { addError } from '../error-signals.js';

export default React.memo(function Category({ category }) {
  const [state, setState] = useState({
    apps: [],
    loading: true,
    isCollapsed: false,
  });
  
  const scrollPosition = useRef(0);
  const cardWidth = 300;
  const gap = 25;
  const categoryInnerRef = useRef(null);

  const fetchApps = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await fetch(`http://localhost:3000/api/apps?category=${category.category_id}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const uniqueApps = Array.from(new Map(data.map(app => [app.app_id, app])).values());
      
      setState({ apps: uniqueApps, loading: false });

    } catch (err) {
      addError({
        name: `Failed to load ${category.name} apps`,
        info: err.message,
        status: 'Error'
      });
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [category.category_id, category.name]);

  useEffect(() => {
    const controller = new AbortController();
    fetchApps();
    return () => controller.abort();
  }, [fetchApps]);

  const toggleCategory = useCallback(() => {
    setState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }));
  }, []);

  const handleNextClick = useCallback(() => {
    if (!categoryInnerRef.current) return;
    
    const container = categoryInnerRef.current;
    const scrollAmount = 2 * (cardWidth + gap);
    const newPosition = scrollPosition.current + scrollAmount;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    container.scrollTo({
      left: Math.min(newPosition, maxScroll),
      behavior: 'smooth'
    });
    
    scrollPosition.current = Math.min(newPosition, maxScroll);
  }, [cardWidth, gap]);

  if (state.loading) {
    return (
      <div className="category-container loading">
        <div className="category-title">
          <h2>{category.name}</h2>
          <div className="loading-spinner"></div>
        </div>
        <p>Loading apps...</p>
      </div>
    );
  }

  return (
    <div className='category-container'>
      <div className='category-title'>
        <h2>{category.name}</h2>
        <button 
          className='toggleCategoryBtn' 
          onClick={toggleCategory}
          aria-label={state.isCollapsed ? 'Collapse category' : 'Expand category'}
          style={{ transform: `rotate(${state.isCollapsed ? '0deg' :'180deg' })` }}
        >
          <FaChevronUp />
        </button>
      </div>
      
      <div 
        className={`category-inner ${state.isCollapsed ? '' : 'collapsed'}`} 
        ref={categoryInnerRef}
        aria-hidden={state.isCollapsed}
      >
        {state.apps.length > 0 ? (
          state.apps.map((app) => (
            <CategoryAppCard app={app} key={app.app_id} />
          ))
        ) : (
          <p className="no-apps-message">No apps available in this category</p>
        )}
      </div>
      
      {!state.isCollapsed && state.apps.length > 0 && (
        <button 
          className='showNextAppsBtn' 
          onClick={handleNextClick}
          aria-label="Show next apps"
        >
          <GrFormNextLink />
        </button>
      )}
    </div>
  );
});