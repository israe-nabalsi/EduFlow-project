import React, { useState } from 'react';
import './Tasks.css';
import { CheckCircle, X } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish React project", progress: "60%", notes: "Focus on frontend UI", priority: "High", dueDate: "2025-06-15", pdf: null },
    { id: 2, title: "Prepare presentation", progress: "30%", notes: "Slides + demo", priority: "Medium", dueDate: "2025-06-20", pdf: null },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    priority: '',
    dueDate: '',
    pdf: null,
    progress: '0%',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewTask(prev => ({
        ...prev,
        pdf: { name: file.name, url }
      }));
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert("Task title is required");
      return;
    }
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks(prev => [...prev, { ...newTask, id: newId }]);
    setNewTask({ title: '', notes: '', priority: '', dueDate: '', pdf: null, progress: '0%' });
    setShowForm(false);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-header">
        <CheckCircle className="icon" />
        Your Tasks
      </h2>

      <button className="add-task-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Task"}
      </button>

      {showForm && (
        <form className="new-task-form" onSubmit={handleAddTask}>
          <div>
            <label>Task Title:</label><br />
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Notes:</label><br />
            <textarea
              name="notes"
              value={newTask.notes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          <div>
            <label>Priority:</label><br />
            <select name="priority" value={newTask.priority} onChange={handleInputChange} required>
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label>Due Date:</label><br />
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Upload PDF:</label><br />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {newTask.pdf && <p>Selected: {newTask.pdf.name}</p>}
          </div>
          <button type="submit">Add Task</button>
        </form>
      )}

      <div className="tasks-grid">
        {tasks.map(task => (
          <div
            key={task.id}
            className="task-card"
            onClick={() => handleSelectTask(task)}
            style={{ cursor: 'pointer' }}
            title="Click to view details"
          >
            <h3>{task.title}</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: task.progress }}></div>
            </div>
            <p className="progress-text">{task.progress} Complete</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={24} />
            </button>
            <h3>{selectedTask.title}</h3>
            {selectedTask.notes ? (
              <>
                <strong>Notes:</strong>
                <p>{selectedTask.notes}</p>
              </>
            ) : <p><em>No notes available.</em></p>}

            {selectedTask.priority ? (
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
            ) : <p><em>No priority set.</em></p>}

            {selectedTask.dueDate ? (
              <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            ) : <p><em>No due date set.</em></p>}

            {selectedTask.pdf ? (
              <p>
                <strong>PDF:</strong>{' '}
                <a href={selectedTask.pdf.url} target="_blank" rel="noopener noreferrer">
                  {selectedTask.pdf.name}
                </a>
              </p>
            ) : <p><em>No PDF uploaded.</em></p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
