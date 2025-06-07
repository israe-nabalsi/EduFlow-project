import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user info in localStorage (simulate registration)
    const user = { fullName, role, email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', role);
    localStorage.setItem('username', fullName);

    alert(`Welcome ${fullName}! You registered as a ${role}. Please login.`);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form className="register-card register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="register-button">Register</button>

        <div className="register-footer">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}
