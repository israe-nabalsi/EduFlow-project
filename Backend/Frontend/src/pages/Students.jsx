import React from 'react';

const Courses = () => {
  const courses = [
    { id: 1, title: 'Mathematics', description: 'Algebra and Geometry basics' },
    { id: 2, title: 'Physics', description: 'Mechanics and Thermodynamics' },
    { id: 3, title: 'Biology', description: 'Cell structure and functions' }
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4 mb-3" key={course.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
