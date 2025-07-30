import React from 'react';

const AddStudent = ({ formData, loading, onInputChange, onSubmit, connectionStatus }) => {
  return (
    <div className="tab-content">
      <h2>Add New Student</h2>
      
      {connectionStatus === 'disconnected' && (
        <div className="disconnected-message">
          <p>⚠️ Backend is not connected. Please ensure the Spring Boot server is running on port 8080.</p>
        </div>
      )}
      
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
          {connectionStatus === 'disconnected' ? 'Backend Disconnected' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default AddStudent; 