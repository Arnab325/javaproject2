import React from 'react';

const UpdateStudent = ({ formData, loading, editingId, onInputChange, onSubmit, onReset, connectionStatus }) => {
  return (
    <div className="tab-content">
      <h2>Update Student</h2>
      
      {connectionStatus === 'disconnected' && (
        <div className="disconnected-message">
          <p>⚠️ Backend is not connected. Please ensure the Spring Boot server is running on port 8080.</p>
        </div>
      )}
      
      {editingId ? (
        <form onSubmit={onSubmit} className="student-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              disabled={connectionStatus === 'disconnected'}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              disabled={connectionStatus === 'disconnected'}
            />
          </div>
          <div className="form-group">
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={onInputChange}
              required
              disabled={connectionStatus === 'disconnected'}
            />
          </div>
          <div className="form-group">
            <label>UID:</label>
            <input
              type="number"
              name="uid"
              value={formData.uid}
              onChange={onInputChange}
              required
              disabled={connectionStatus === 'disconnected'}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || connectionStatus === 'disconnected'}
          >
            {connectionStatus === 'disconnected' ? 'Backend Disconnected' : 'Update Student'}
          </button>
          <button type="button" onClick={onReset}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Select a student from the "View All Students" tab to edit</p>
          {connectionStatus === 'disconnected' && (
            <p className="disconnected-note">Note: You need to be connected to the backend to edit students.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateStudent; 