// Body.jsx
import React, { useEffect, useCallback, useState } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { errors, addError, removeError } from './error-signals.js';
import Dir from './dir/Dir';
import Slider from './slider/Slider';
import Category from './category/Category';
import GoToTop from './GoToTop';
import './body.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ErrorToast = React.memo(function ErrorToast({ error }) {
  const [isVisible, setIsVisible] = useState(true);
  useSignals();

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => removeError(error.id), 300);
  }, [error.id]);

  useEffect(() => {
    const timer = setTimeout(handleClose, 5000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  if (!isVisible) return null;

  return (
    <div className={`error-container fade-in`}>
      <div className='error-toast card'>
        <button 
          className='closeBtn' 
          onClick={handleClose}
          aria-label="Close error message"
        >
          <IoIosCloseCircleOutline />
        </button>
        <div className='card-title error-toast-title'>
          {error.name || 'Error'}
        </div>
        <div className='card-body error-toast-body'>
          {error.status && <span className='error-status'>{error.status}</span>}
          <span className='error-info'>
            {typeof error.info === 'object' ? JSON.stringify(error.info) : error.info}
          </span>
        </div>
      </div>
    </div>
  );
});

export default function Body() {
  const [state, setState] = useState({
    categories: [],
    featuredApps: [],
    loading: true
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const [categoriesResponse, featuredResponse] = await Promise.all([
        fetch('http://localhost:3000/categories'),
        fetch('http://localhost:3000/apps?featured=true')
      ]);

      const [categoriesData, featuredData] = await Promise.all([
        categoriesResponse.ok ? categoriesResponse.json() : Promise.reject('Failed to fetch categories'),
        featuredResponse.ok ? featuredResponse.json() : Promise.reject('Failed to fetch featured apps')
      ]);

      const uniqueCategories = Array.from(new Map(categoriesData.map(c => [c.category_id, c])).values());
      const uniqueFeaturedApps = Array.from(new Map(featuredData.map(a => [a.app_id, a])).values());

      setState({
        categories: Array.from(uniqueCategories),
        featuredApps: Array.from(uniqueFeaturedApps),
        loading: false
      });

    } catch (err) {
      addError({
        name: 'Network Error',
        info: err.message,
        status: '500'
      });
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    return () => controller.abort();
  }, [fetchData]);

  if (state.loading) {
    return (
      <div className="body">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading app store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='body'>
      <div className="global-error-container">
        {errors.value.map(error => (
          <ErrorToast key={error.id} error={error} />
        ))}
      </div>

      <Dir />
      <h3 className='catch-line'>Find any apps or games you want easy and free.</h3>
      
      {state.featuredApps.length > 0 && (
        <Slider apps={state.featuredApps} />
      )}

      {state.categories.length > 0 ? (
        state.categories.map((category) => (
          <Category key={category.category_id} category={category} />
        ))
      ) : (
        <div className="no-categories-message">
          No categories available
        </div>
      )}

      <GoToTop />
    </div>
  );
}