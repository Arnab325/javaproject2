import React from 'react';

const DeleteStudent = ({ students, onDeleteStudent, connectionStatus }) => {
  return (
    <div className="tab-content">
      <h2>Delete Students</h2>
      
      {connectionStatus === 'disconnected' && (
        <div className="disconnected-message">
          <p>⚠️ Backend is not connected. Please ensure the Spring Boot server is running on port 8080.</p>
        </div>
      )}
      
      {connectionStatus === 'checking' ? (
        <p>Checking connection to backend...</p>
      ) : connectionStatus === 'disconnected' ? (
        <p>Cannot delete students - backend is disconnected</p>
      ) : (
        <p>Select a student to delete from the list below:</p>
      )}
      
      <div className="students-grid">
        {students.map(student => (
          <div key={student.id} className="student-card delete-mode">
            <h3>{student.name}</h3>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>UID:</strong> {student.uid}</p>
            <button 
              onClick={() => onDeleteStudent(student.id)} 
              className="delete-btn"
              disabled={connectionStatus === 'disconnected'}
            >
              {connectionStatus === 'disconnected' ? 'Backend Disconnected' : 'Delete This Student'}
            </button>
          </div>
        ))}
      </div>
      
      {students.length === 0 && connectionStatus === 'connected' && (
        <p>No students available to delete.</p>
      )}
    </div>
  );
};

export default DeleteStudent; 