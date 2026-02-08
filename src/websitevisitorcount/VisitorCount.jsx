import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const API_BASE = 'https://fileupload.friensys.com/api/Common';
  const WEBSITE_ID = 1001;

  useEffect(() => {
    // Check if current page is home page (root path)
    const isHomePage = location.pathname === '/';

    // Increment visitor count only on home page
    const incrementVisitor = async () => {
      try {
        await fetch(`${API_BASE}/increment?website=${WEBSITE_ID}`, {
          method: 'POST',
          headers: {
            'accept': '*/*'
          }
        });
        
        // After incrementing, fetch the updated count
        fetchVisitorCount();
      } catch (error) {
        console.error('Error incrementing visitor count:', error);
        // Still try to fetch count even if increment fails
        fetchVisitorCount();
      }
    };

    // Fetch current visitor count
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(`${API_BASE}/visiterscount?webSiteId=${WEBSITE_ID}`, {
          headers: {
            'accept': '*/*'
          }
        });
        const data = await response.json();
        setCount(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setLoading(false);
      }
    };

    // Only increment if on home page
    if (isHomePage) {
      incrementVisitor();
    } else {
      // Just fetch count on other pages
      fetchVisitorCount();
    }

    // Optional: Poll for updates every 30 seconds
    const interval = setInterval(fetchVisitorCount, 30000);

    return () => clearInterval(interval);
  }, [location.pathname]); // Re-run when route changes

  return (
    <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg text-white">
      {loading ? (
        <div className="flex items-center gap-2">
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-sm font-medium">Loading...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <svg 
            className="w-5 h-5 text-white/90" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span className="text-sm font-medium opacity-90">Visitors:</span>
          <span className="text-xl font-bold bg-white/20 px-3 py-1 rounded-md min-w-[50px] text-center">
            {count?.toLocaleString() || 0}
          </span>
        </div>
      )}
    </div>
  );
};

export default VisitorCounter;