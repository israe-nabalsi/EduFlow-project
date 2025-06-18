import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { 
  FaBookOpen, 
  FaTasks, 
  FaGraduationCap, 
  FaChartLine,
  FaStar,
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaComments,
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaPlus
} from "react-icons/fa";

export default function Home() {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("Alex Johnson");
  const navigate = useNavigate();

  // Enhanced sample data with more realistic content
  const modules = [
    { id: 1, name: "Advanced React Development", added_on: "2025-06-05", progress: 85 },
    { id: 2, name: "Database Management Systems", added_on: "2025-06-03", progress: 92 },
    { id: 3, name: "Machine Learning Fundamentals", added_on: "2025-06-01", progress: 67 }
  ];

  const tasks = [
    { id: 1, task: "Complete React Portfolio Project", due_date: "2025-06-10", priority: "high", status: "in-progress" },
    { id: 2, task: "Database Schema Design Assignment", due_date: "2025-06-12", priority: "medium", status: "pending" },
    { id: 3, task: "ML Model Training Report", due_date: "2025-06-15", priority: "low", status: "pending" }
  ];

  const exams = [
    { id: 1, subject: "React Advanced Concepts", exam_date: "2025-06-18", time: "10:00 AM" },
    { id: 2, subject: "Database Optimization", exam_date: "2025-06-22", time: "2:00 PM" }
  ];

  const grades = [
    { id: 1, subject: "Web Development", grade: "A+", percentage: 95 },
    { id: 2, subject: "Data Structures", grade: "A", percentage: 88 },
    { id: 3, subject: "Software Engineering", grade: "A-", percentage: 85 }
  ];

  const events = [
    { title: "Tech Workshop: AI in Education", date: "2025-06-10", type: "workshop" },
    { title: "Study Group Meeting", date: "2025-06-12", type: "meeting" },
    { title: "Guest Lecture: Industry Trends", date: "2025-06-14", type: "lecture" }
  ];

  const announcements = [
    { id: 1, message: "New course materials available for Machine Learning", date: "2025-06-07", type: "update" },
    { id: 2, message: "Final exam schedule published", date: "2025-06-06", type: "important" },
    { id: 3, message: "Library hours extended during exam period", date: "2025-06-05", type: "info" }
  ];

  const stats = {
    totalCourses: 12,
    completedTasks: 45,
    averageGrade: 89,
    attendanceRate: 94
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "student";
    const storedName = localStorage.getItem("username") || "Alex Johnson";
    
    setRole(storedRole);
    setUsername(storedName);
  }, []);

  const roleDisplay = role === "professor" ? "Prof" : role === "student" ? "Student" : "";

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return;
    const dateStr = date.toISOString().split("T")[0];
    if (exams.some((e) => e.exam_date === dateStr)) return "calendar-exam-day";
    if (tasks.some((t) => t.due_date === dateStr)) return "calendar-task-day";
    if (events.some((ev) => ev.date === dateStr)) return "calendar-event-day";
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 80) return '#3b82f6';
    if (percentage >= 70) return '#f59e0b';
    return '#ef4444';
  };

  // Navigation handlers for quick actions
  const handleQuickAction = (action) => {
    switch(action) {
      case 'courses':
        navigate('/courses');
        break;
      case 'tasks':
        navigate('/tasks');
        break;
      case 'grades':
        navigate('/grades');
        break;
      case 'exams':
        navigate('/exams');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome back 👋, <span className="highlight">{roleDisplay} {username}</span>! 
          </h1>
          <p className="welcome-subtitle">
            Ready to continue your learning journey? Here's what's happening today.
          </p>
        </div>
        <div className="quick-stats">
          <div className="stat-card" onClick={() => handleQuickAction('courses')}>
            <FaBookOpen className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{stats.totalCourses}</span>
              <span className="stat-label">Active Courses</span>
            </div>
          </div>
          <div className="stat-card" onClick={() => handleQuickAction('tasks')}>
            <FaTasks className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{stats.completedTasks}</span>
              <span className="stat-label">Tasks Completed</span>
            </div>
          </div>
          <div className="stat-card" onClick={() => handleQuickAction('grades')}>
            <FaChartLine className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{stats.averageGrade}%</span>
              <span className="stat-label">Average Grade</span>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{stats.attendanceRate}%</span>
              <span className="stat-label">Attendance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Active Modules */}
        <section className="dashboard-card modules-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaBookOpen className="card-icon" />
              Active Modules
            </h2>
            <button className="add-btn" onClick={() => handleQuickAction('courses')}>
              <FaPlus />
            </button>
          </div>
          <div className="card-content">
            {modules.length === 0 ? (
              <div className="empty-state">
                <p>No modules available.</p>
              </div>
            ) : (
              <div className="modules-list">
                {modules.map((module) => (
                  <div key={module.id} className="module-item">
                    <div className="module-info">
                      <h3 className="module-name">{module.name}</h3>
                      <p className="module-date">Added: {module.added_on}</p>
                    </div>
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{module.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Urgent Tasks */}
        <section className="dashboard-card tasks-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaTasks className="card-icon" />
              Urgent Tasks
            </h2>
            <span className="task-count">{tasks.length}</span>
          </div>
          <div className="card-content">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No urgent tasks.</p>
              </div>
            ) : (
              <div className="tasks-list">
                {tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div className="task-info">
                      <h3 className="task-name">{task.task}</h3>
                      <p className="task-due">Due: {task.due_date}</p>
                    </div>
                    <div className="task-meta">
                      <span 
                        className="priority-badge" 
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                      <div className={`status-indicator ${task.status}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Exams */}
        <section className="dashboard-card exams-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaGraduationCap className="card-icon" />
              Upcoming Exams
            </h2>
          </div>
          <div className="card-content">
            {exams.length === 0 ? (
              <div className="empty-state">
                <p>No exams scheduled.</p>
              </div>
            ) : (
              <div className="exams-list">
                {exams.map((exam) => (
                  <div key={exam.id} className="exam-item">
                    <div className="exam-info">
                      <h3 className="exam-subject">{exam.subject}</h3>
                      <div className="exam-details">
                        <span className="exam-date">📅 {exam.exam_date}</span>
                        <span className="exam-time">🕒 {exam.time}</span>
                      </div>
                    </div>
                    <div className="exam-countdown">
                      <FaClock className="countdown-icon" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Grades Summary */}
        <section className="dashboard-card grades-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaTrophy className="card-icon" />
              Recent Grades
            </h2>
            <div className="grade-average">
              <FaArrowUp className="trend-icon positive" />
              <span>89% avg</span>
            </div>
          </div>
          <div className="card-content">
            {grades.length === 0 ? (
              <div className="empty-state">
                <p>No grades yet.</p>
              </div>
            ) : (
              <div className="grades-list">
                {grades.map((grade) => (
                  <div key={grade.id} className="grade-item">
                    <div className="grade-info">
                      <h3 className="grade-subject">{grade.subject}</h3>
                      <div className="grade-score">
                        <span 
                          className="grade-letter"
                          style={{ color: getGradeColor(grade.percentage) }}
                        >
                          {grade.grade}
                        </span>
                        <span className="grade-percentage">({grade.percentage}%)</span>
                      </div>
                    </div>
                    <div className="grade-bar">
                      <div 
                        className="grade-fill"
                        style={{ 
                          width: `${grade.percentage}%`,
                          backgroundColor: getGradeColor(grade.percentage)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Announcements */}
        <section className="dashboard-card announcements-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaBell className="card-icon" />
              Latest Announcements
            </h2>
            <div className="notification-badge">{announcements.length}</div>
          </div>
          <div className="card-content">
            {announcements.length === 0 ? (
              <div className="empty-state">
                <p>No announcements.</p>
              </div>
            ) : (
              <div className="announcements-list">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-item">
                    <div className={`announcement-type ${announcement.type}`}></div>
                    <div className="announcement-content">
                      <p className="announcement-message">{announcement.message}</p>
                      <span className="announcement-date">{announcement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Events This Week */}
        <section className="dashboard-card events-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaCalendarAlt className="card-icon" />
              Events This Week
            </h2>
          </div>
          <div className="card-content">
            {events.length === 0 ? (
              <div className="empty-state">
                <p>No upcoming events.</p>
              </div>
            ) : (
              <div className="events-list">
                {events.map((event, index) => (
                  <div key={index} className="event-item">
                    <div className={`event-indicator ${event.type}`}></div>
                    <div className="event-info">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-date">{event.date}</p>
                    </div>
                    <div className="event-type-badge">
                      {event.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Calendar */}
        <section className="dashboard-card calendar-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaCalendarAlt className="card-icon" />
              Academic Calendar
            </h2>
          </div>
          <div className="card-content calendar-content">
            <Calendar 
              tileClassName={getTileClassName}
              className="modern-calendar"
            />
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-color exam"></div>
                <span>Exams</span>
              </div>
              <div className="legend-item">
                <div className="legend-color task"></div>
                <span>Tasks</span>
              </div>
              <div className="legend-item">
                <div className="legend-color event"></div>
                <span>Events</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}