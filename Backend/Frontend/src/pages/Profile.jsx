import React, { useState } from 'react';
import './Profile.css';
import { Pencil, UploadCloud, X } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    major: 'Software Engineering',
    level: '3rd Year',
    phone: '123-456-7890',
    bio: 'Curious student passionate about AI and full-stack development.',
    theme: 'Dark',
    notifications: true,
    avatar: 'https://i.pravatar.cc/150?img=33',
    stats: {
      courses: 8,
      exams: 5,
      average: '88%',
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setTempProfile((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setTempProfile((prev) => ({ ...prev, avatar: avatarURL }));
    }
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card-enhanced">
        <div className="profile-left">
          <img src={profile.avatar} className="profile-avatar-lg" alt="avatar" />
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            <Pencil size={18} /> Edit
          </button>
        </div>

        <div className="profile-right">
          <h2>{profile.name}</h2>
          <p>{profile.bio}</p>
          <div className="profile-info">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Major:</strong> {profile.major}</p>
            <p><strong>Level:</strong> {profile.level}</p>
            <p><strong>Theme:</strong> {profile.theme}</p>
            <p><strong>Notifications:</strong> {profile.notifications ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <h3>{profile.stats.courses}</h3>
              <p>Courses</p>
            </div>
            <div className="stat">
              <h3>{profile.stats.exams}</h3>
              <p>Exams</p>
            </div>
            <div className="stat">
              <h3>{profile.stats.average}</h3>
              <p>Average</p>
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <div className="modal-overlay">
          <div className="modal-content wide">
<button className="close-btn" onClick={() => setEditMode(false)}>
  <X />
</button>
            <h2>Edit Your Profile</h2>
            <div className="modal-avatar">
              <img src={tempProfile.avatar} alt="preview" />
              <label htmlFor="avatarUpload" className="upload-btn">
                <UploadCloud size={16} /> Change Avatar
              </label>
              <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} hidden />
            </div>
            <div className="modal-form">
              <input name="name" value={tempProfile.name} onChange={handleChange} placeholder="Full Name" />
              <input name="email" value={tempProfile.email} onChange={handleChange} placeholder="Email" />
              <input name="phone" value={tempProfile.phone} onChange={handleChange} placeholder="Phone" />
              <input name="major" value={tempProfile.major} onChange={handleChange} placeholder="Major" />
              <input name="level" value={tempProfile.level} onChange={handleChange} placeholder="Level" />
              <textarea name="bio" value={tempProfile.bio} onChange={handleChange} placeholder="Bio" />
              <div className="row">
                <select name="theme" value={tempProfile.theme} onChange={handleChange}>
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
                <label>
                  <input type="checkbox" name="notifications" checked={tempProfile.notifications} onChange={handleChange} />
                  Enable Notifications
                </label>
              </div>
            </div>
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
