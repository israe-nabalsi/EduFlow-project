import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const loginTime = localStorage.getItem('loginTime');
        
        // Check if login is still valid (optional: implement session timeout)
        if (isLoggedIn && loginTime) {
          const loginDate = new Date(loginTime);
          const now = new Date();
          const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
          
          // Session expires after 24 hours (optional)
          if (hoursDiff < 24) {
            setIsAuthenticated(true);
          } else {
            // Clear expired session
            localStorage.clear();
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Checking authentication...</p>
        </div>
        <style jsx>{`
          .auth-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8fafc;
          }
          
          .loading-spinner {
            text-align: center;
            padding: 2rem;
          }
          
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .loading-spinner p {
            color: #64748b;
            font-size: 14px;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
}