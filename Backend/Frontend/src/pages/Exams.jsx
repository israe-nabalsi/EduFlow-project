import React, { useState } from 'react';
import './Exams.css';
import { CalendarCheck2, X } from 'lucide-react';

const Exams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      subject: 'Physics',
      date: '2025-06-15',
      time: '09:00',
      location: 'Room 101',
      description: 'Final exam on classical mechanics.',
    },
    {
      id: 2,
      subject: 'French',
      date: '2025-06-20',
      time: '13:00',
      location: 'Room 202',
      description: 'Oral and written parts included.',
    },
  ]);

  const [newExam, setNewExam] = useState({
    subject: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExam(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExam = (e) => {
    e.preventDefault();
    const id = exams.length > 0 ? exams[exams.length - 1].id + 1 : 1;
    setExams(prev => [...prev, { ...newExam, id }]);
    setNewExam({ subject: '', date: '', time: '', location: '', description: '' });
    setShowForm(false);
  };

  return (
    <div className="exams-container">
      <h2 className="exams-header">
        <CalendarCheck2 className="icon" />
        Upcoming Exams
      </h2>

      <button className="add-exam-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Exam'}
      </button>

      {showForm && (
        <form className="new-exam-form" onSubmit={handleAddExam}>
          <input type="text" name="subject" placeholder="Subject" value={newExam.subject} onChange={handleChange} required />
          <input type="date" name="date" value={newExam.date} onChange={handleChange} required />
          <input type="time" name="time" value={newExam.time} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={newExam.location} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={newExam.description} onChange={handleChange} />
          <button type="submit">Save Exam</button>
        </form>
      )}

      <div className="exams-grid">
        {exams.map((exam) => (
          <div className="exam-card" key={exam.id} onClick={() => setSelectedExam(exam)}>
            <h3>{exam.subject}</h3>
            <p>{exam.date} at {exam.time}</p>
            <p className="exam-location">{exam.location}</p>
          </div>
        ))}
      </div>

      {selectedExam && (
        <div className="modal-overlay" onClick={() => setSelectedExam(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedExam(null)}><X size={20} /></button>
            <h3>{selectedExam.subject}</h3>
            <p><strong>Date:</strong> {selectedExam.date}</p>
            <p><strong>Time:</strong> {selectedExam.time}</p>
            <p><strong>Location:</strong> {selectedExam.location}</p>
            <p><strong>Description:</strong> {selectedExam.description || 'No description.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;
