import React, { useState, useEffect, useRef } from 'react';
import { IoMdSearch } from "react-icons/io";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const searchRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
        setError('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      // Simulated search logic
      const mockResults = query.length > 2 ? 
        [`Result 1 for ${query}`, `Result 2 for ${query}`] : [];
      
      if (mockResults.length > 0) {
        setResults(mockResults);
        setError('');
      } else {
        setError('No results found');
        setResults([]);
      }
    }
  };

  return (
    <div className='search-container' ref={searchRef}>
      <button 
        className='search-button' 
        onMouseEnter={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
      >
        <IoMdSearch />
      </button>
      
      <div className={`search-input ${isOpen ? 'open' : ''}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='Search something...'
        />
      </div>

      {(results.length > 0 || error) && (
        <div className='search-results-container'>
          {error ? (
            <p className='error-message'>{error}</p>
          ) : (
            results.map((result, index) => (
              <p key={index} className='search-result-item'>{result}</p>
            ))
          )}
        </div>
      )}
    </div>
  );
}