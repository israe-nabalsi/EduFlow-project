import React, { useState } from 'react';
import './Grades.css';
import { BarChart2, X } from 'lucide-react';

const Grades = () => {
  const [grades, setGrades] = useState([
    { id: 1, course: "Math", score: 18.5, total: 20, feedback: "Excellent work!" },
    { id: 2, course: "History", score: 15, total: 20, feedback: "Good understanding." },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const [newGrade, setNewGrade] = useState({
    course: '',
    score: '',
    total: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGrade(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGrade = (e) => {
    e.preventDefault();
    const newId = grades.length > 0 ? grades[grades.length - 1].id + 1 : 1;
    setGrades(prev => [...prev, { ...newGrade, id: newId }]);
    setNewGrade({ course: '', score: '', total: '', feedback: '' });
    setShowForm(false);
  };

  return (
    <div className="grades-container">
      <h2 className="grades-header">
        <BarChart2 className="icon" />
        Your Grades
      </h2>

      <button className="add-grade-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Grade"}
      </button>

      {showForm && (
        <form className="new-grade-form" onSubmit={handleAddGrade}>
          <div>
            <label>Course:</label>
            <input type="text" name="course" value={newGrade.course} onChange={handleChange} required />
          </div>
          <div>
            <label>Score:</label>
            <input type="number" step="0.1" name="score" value={newGrade.score} onChange={handleChange} required />
          </div>
          <div>
            <label>Total:</label>
            <input type="number" step="0.1" name="total" value={newGrade.total} onChange={handleChange} required />
          </div>
          <div>
            <label>Feedback (optional):</label>
            <textarea name="feedback" value={newGrade.feedback} onChange={handleChange} />
          </div>
          <button type="submit">Save Grade</button>
        </form>
      )}

      <div className="grades-grid">
        {grades.map((g) => (
          <div className="grade-card" key={g.id} onClick={() => setSelectedGrade(g)}>
            <h3>{g.course}</h3>
            <p className="grade-score">{g.score} / {g.total}</p>
          </div>
        ))}
      </div>

      {selectedGrade && (
        <div className="modal-overlay" onClick={() => setSelectedGrade(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedGrade(null)}><X size={20} /></button>
            <h3>{selectedGrade.course}</h3>
            <p><strong>Score:</strong> {selectedGrade.score} / {selectedGrade.total}</p>
            <p><strong>Feedback:</strong> {selectedGrade.feedback || <em>No feedback provided.</em>}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grades;
