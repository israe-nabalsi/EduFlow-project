import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGraduationCap } from 'react-icons/fa';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo authentication - in real app, this would be an API call
      const demoUsers = {
        'student@demo.com': { password: 'student123', role: 'student', name: 'Alex Johnson' },
        'professor@demo.com': { password: 'prof123', role: 'professor', name: 'Dr. Sarah Wilson' },
        'admin@demo.com': { password: 'admin123', role: 'admin', name: 'John Administrator' }
      };

      const user = demoUsers[formData.email];
      
      if (user && user.password === formData.password) {
        // Successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.name);
        localStorage.setItem('role', user.role);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoLogin = (userType) => {
    const demoCredentials = {
      student: { email: 'student@demo.com', password: 'student123', role: 'student' },
      professor: { email: 'professor@demo.com', password: 'prof123', role: 'professor' },
      admin: { email: 'admin@demo.com', password: 'admin123', role: 'admin' }
    };

    const credentials = demoCredentials[userType];
    setFormData(credentials);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <FaGraduationCap className="logo-icon" />
              <h1 className="logo-text">EduFlow</h1>
            </div>
            <h2 className="login-title">Welcome Back!</h2>
            <p className="login-subtitle">Sign in to continue your learning journey</p>
          </div>

          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="form-input"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select"
                disabled={isLoading}
              >
                <option value="student">Student</option>
                <option value="professor">Professor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="demo-section">
            <p className="demo-title">Try Demo Accounts:</p>
            <div className="demo-buttons">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="demo-button student"
                disabled={isLoading}
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('professor')}
                className="demo-button professor"
                disabled={isLoading}
              >
                Professor Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="demo-button admin"
                disabled={isLoading}
              >
                Admin Demo
              </button>
            </div>
          </div>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="register-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}