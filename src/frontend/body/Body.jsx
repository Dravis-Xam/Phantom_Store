import React, { useState, useEffect } from 'react';
import Dir from './dir/Dir';
import Slider from './slider/Slider';
import Category from './category/Category';
import GoToTop from './GoToTop';
import './body.css';

export default function Body() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredApps, setFeaturedApps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories and featured apps in parallel
        const [categoriesResponse, featuredResponse] = await Promise.all([
          fetch('http://localhost:3000/api/categories'),
          fetch('http://localhost:3000/api/apps?featured=true')
        ]);

        if (!categoriesResponse.ok || !featuredResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [categoriesData, featuredData] = await Promise.all([
          categoriesResponse.json(),
          featuredResponse.json()
        ]);

        setCategories(categoriesData);
        setFeaturedApps(featuredData);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="body">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading app store...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="body">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='body'>
      <Dir />
      <h3 className='catch-line'>Find any apps or games you want easy and free.</h3>
      
      {/* Featured Apps Slider */}
      {featuredApps.length > 0 && (
        <Slider apps={featuredApps} />
      )}

      {/* Categories List */}
      {categories.map((category) => (
        <Category 
          key={category.category_id} 
          category={category} 
        />
      ))}

      <GoToTop />
    </div>
  );
}