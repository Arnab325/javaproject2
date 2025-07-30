import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import studentService from './services/studentService';
import Navigation from './components/Navigation';
import ViewStudents from './components/ViewStudents';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    uid: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Check backend connection on app start
  useEffect(() => {
    checkBackendConnection();
  }, []);

  // Check if backend is connected
  const checkBackendConnection = async () => {
    try {
      const isConnected = await studentService.testConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      if (isConnected) {
        loadStudents();
      }
    } catch (error) {
      setConnectionStatus('disconnected');
      setMessage('Backend connection failed. Please ensure the Spring Boot server is running on port 8080.');
    }
  };

  // Load all students
  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
      setMessage('Students loaded successfully!');
      setConnectionStatus('connected');
    } catch (error) {
      setMessage('Error loading students: ' + error.message);
      setConnectionStatus('disconnected');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      course: '',
      uid: ''
    });
    setEditingId(null);
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await studentService.addStudent(formData);
      setMessage('Student added successfully!');
      resetForm();
      loadStudents();
    } catch (error) {
      setMessage('Error adding student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    if (!editingId) {
      setMessage('Please select a student to edit first');
      return;
    }
    setLoading(true);
    try {
      await studentService.updateStudent({ ...formData, id: editingId });
      setMessage('Student updated successfully!');
      resetForm();
      loadStudents();
    } catch (error) {
      setMessage('Error updating student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);
      try {
        await studentService.deleteStudent(id);
        setMessage('Student deleted successfully!');
        loadStudents();
      } catch (error) {
        setMessage('Error deleting student: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Start editing a student
  const startEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      uid: student.uid
    });
    setEditingId(student.id);
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Student LMS Management System</h1>
          <p>Connect to Spring Boot Backend (localhost:8080)</p>
          
          {/* Connection Status */}
          <div className={`connection-status ${connectionStatus}`}>
            {connectionStatus === 'checking' && 'Checking connection...'}
            {connectionStatus === 'connected' && '✅ Connected to Backend'}
            {connectionStatus === 'disconnected' && '❌ Backend Disconnected'}
          </div>
          
          {connectionStatus === 'disconnected' && (
            <button onClick={checkBackendConnection} className="retry-btn">
              Retry Connection
            </button>
          )}
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && <div className="loading">Loading...</div>}

        {/* Routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <ViewStudents
                students={students}
                loading={loading}
                onLoadStudents={loadStudents}
                onStartEdit={startEdit}
                onDeleteStudent={handleDeleteStudent}
                connectionStatus={connectionStatus}
              />
            } 
          />
          <Route 
            path="/add" 
            element={
              <AddStudent
                formData={formData}
                loading={loading}
                onInputChange={handleInputChange}
                onSubmit={handleAddStudent}
                connectionStatus={connectionStatus}
              />
            } 
          />
          <Route 
            path="/update" 
            element={
              <UpdateStudent
                formData={formData}
                loading={loading}
                editingId={editingId}
                onInputChange={handleInputChange}
                onSubmit={handleUpdateStudent}
                onReset={resetForm}
                connectionStatus={connectionStatus}
              />
            } 
          />
          <Route 
            path="/delete" 
            element={
              <DeleteStudent
                students={students}
                onDeleteStudent={handleDeleteStudent}
                connectionStatus={connectionStatus}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
