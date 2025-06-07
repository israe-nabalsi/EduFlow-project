import React, { useState } from 'react';
import './Courses.css';
import { BookOpen, X } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to Psychology", progress: "75%", notes: "Important concepts of cognition.", grade: "A-", pdf: { name: "psychology.pdf", url: "#" } },
    { id: 2, title: "Modern Web Development", progress: "50%", notes: "React, Vue, and modern tools.", grade: "B+", pdf: null },
    { id: 3, title: "Data Science Basics", progress: "90%", notes: "Statistics and ML intro.", grade: "A", pdf: { name: "datascience.pdf", url: "#" } },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    title: '',
    notes: '',
    grade: '',
    pdf: null,
    progress: '0%',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewCourse(prev => ({
        ...prev,
        pdf: { name: file.name, url }
      }));
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) {
      alert("Course title is required");
      return;
    }
    const newId = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
    setCourses(prev => [...prev, { ...newCourse, id: newId }]);
    setNewCourse({ title: '', notes: '', grade: '', pdf: null, progress: '0%' });
    setShowForm(false);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="courses-container">
      <h2 className="courses-header">
        <BookOpen className="icon" />
        Your Courses
      </h2>

      <button className="add-course-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Course"}
      </button>

      {showForm && (
        <form className="new-course-form" onSubmit={handleAddCourse}>
          <div>
            <label>Course Title:</label><br />
            <input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Notes:</label><br />
            <textarea
              name="notes"
              value={newCourse.notes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          <div>
            <label>Grade:</label><br />
            <input
              type="text"
              name="grade"
              value={newCourse.grade}
              onChange={handleInputChange}
              placeholder="e.g. A, B+, 85%"
            />
          </div>
          <div>
            <label>Upload PDF:</label><br />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {newCourse.pdf && <p>Selected: {newCourse.pdf.name}</p>}
          </div>
          <button type="submit">Add Course</button>
        </form>
      )}

      <div className="courses-grid">
        {courses.map(course => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => handleSelectCourse(course)}
            style={{ cursor: 'pointer' }}
            title="Click to view details"
          >
            <h3>{course.title}</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: course.progress }}></div>
            </div>
            <p className="progress-text">{course.progress} Complete</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={24} />
            </button>
            <h3>{selectedCourse.title}</h3>
            {selectedCourse.notes ? (
              <>
                <strong>Notes:</strong>
                <p>{selectedCourse.notes}</p>
              </>
            ) : <p><em>No notes available.</em></p>}

            {selectedCourse.grade ? (
              <p><strong>Grade:</strong> {selectedCourse.grade}</p>
            ) : <p><em>No grade available.</em></p>}

            {selectedCourse.pdf ? (
              <p>
                <strong>PDF:</strong>{' '}
                <a href={selectedCourse.pdf.url} target="_blank" rel="noopener noreferrer">
                  {selectedCourse.pdf.name}
                </a>
              </p>
            ) : <p><em>No PDF uploaded.</em></p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
