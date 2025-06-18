import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaUser,
  FaMoon,
  FaSun,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
  FaGraduationCap,
  FaChartLine,
  FaClipboardList,
  FaThLarge,
  FaChartBar,
  FaTachometerAlt
} from "react-icons/fa";
import "./Layout.css";
import logo from '../assets/logo.png';

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState("Alex Johnson");
  const [role, setRole] = useState("student");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.parentElement.contains(e.target) &&
        document.activeElement !== searchInputRef.current
      ) {
        setIsSearchOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  useEffect(() => {
    
    const savedMode = localStorage.getItem("darkMode") === "true";
    const savedName = localStorage.getItem("username") || "Alex Johnson";
    const savedRole = localStorage.getItem("role") || "student";
    
    if (savedMode) {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    }
    setUsername(savedName);
    setRole(savedRole);
  }, []);


       {/* research */}
  const searchInputRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };


  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Dynamic menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      { to: "/dashboard", icon: FaHome, label: "Dashboard" },
      { to: "/courses", icon: FaBook, label: "Courses" },
      { to: "/tasks", icon: FaTasks, label: "Tasks" },
      { to: "/grades", icon: FaChartLine, label: "Grades" },
    ];

    if (role === "professor") {
      return [
        ...commonItems,
        { to: "/students", icon: FaUsers, label: "Students" },
        { to: "/exams", icon: FaGraduationCap, label: "Exams" },
        { to: "/profile", icon: FaUser, label: "Profile" },
      ];
    } else {
      return [
        ...commonItems,
        { to: "/exams", icon: FaGraduationCap, label: "Exams" },
        { to: "/profile", icon: FaUser, label: "Profile" },
      ];
    }
  };

  const roleDisplay = role === "professor" ? "Professor" : role === "student" ? "Student" : "User";

  return (
    <>
      <aside className="layout-sidebar">
        <div className="sidebar-content">
          <div className="logo-section">    
          <img src={logo} alt="Logo" />
          <h2 className="layout-logo">EduFlow</h2>
          </div>
          
          <nav className="navigation">
            <ul className="layout-menu">
              {getMenuItems().map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active-link" : ""}`
                    }
                  >
                    <item.icon className="menu-icon" />
                    <span className="menu-text">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
            <div className="layout-footer">&copy; 2025 EduFlow</div>
          </div>
        </div>
      </aside>

      <header className="layout-header">
        <div className="header-left">
        <h1 className="page-title"><FaThLarge color="#666"/>Dashboard</h1>
        </div>
        {/* research */}
        <div className="header-right">
          <div className={`search-box ${isSearchOpen ? "expanded" : ""}`}>
            <FaSearch className="search-icon" onClick={handleSearchClick} />
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search courses, tasks, students..."
                className="search-input"
              />
            )}
          </div>
          
          <button className="notification-btn">
            <FaBell />
            <div className="notification-badge">3</div>
          </button>
          
          <button onClick={toggleDarkMode} className="theme-toggle">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          
          <div className="user-profile">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="profile-avatar"
            />
            <div className="user-info">
              <span className="user-name">{username}</span>
              <span className="user-role">{roleDisplay}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>
    </>
  );
}