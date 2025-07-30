import React from 'react';
import { Link } from 'react-router-dom';

const ViewStudents = ({ students, loading, onLoadStudents, onStartEdit, onDeleteStudent, connectionStatus }) => {
  return (
    <div className="tab-content">
      <h2>All Students</h2>
      
      {connectionStatus === 'disconnected' && (
        <div className="disconnected-message">
          <p>⚠️ Backend is not connected. Please ensure the Spring Boot server is running on port 8080.</p>
        </div>
      )}
      
      <button 
        onClick={onLoadStudents} 
        className="refresh-btn"
        disabled={connectionStatus === 'disconnected'}
      >
        Refresh List
      </button>
      
      <div className="students-grid">
        {connectionStatus === 'checking' ? (
          <p>Checking connection to backend...</p>
        ) : connectionStatus === 'disconnected' ? (
          <p>Cannot load students - backend is disconnected</p>
        ) : students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map(student => (
            <div key={student.id} className="student-card">
              <h3>{student.name}</h3>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>UID:</strong> {student.uid}</p>
              <div className="card-actions">
                <Link 
                  to="/update" 
                  className="edit-btn" 
                  onClick={() => onStartEdit(student)}
                  style={{ pointerEvents: connectionStatus === 'disconnected' ? 'none' : 'auto' }}
                >
                  Edit
                </Link>
                <button 
                  onClick={() => onDeleteStudent(student.id)} 
                  className="delete-btn"
                  disabled={connectionStatus === 'disconnected'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewStudents; 