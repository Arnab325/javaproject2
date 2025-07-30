import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await api.get('/students/getall');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      } else {
        throw new Error('Error: ' + error.message);
      }
    }
  },

  // Add a new student
  addStudent: async (student) => {
    try {
      // Validate required fields
      if (!student.name || !student.email || !student.course || !student.uid) {
        throw new Error('All fields are required');
      }

      // Backend expects @RequestParam, so we need to send as URL parameters
      const params = new URLSearchParams();
      params.append('name', student.name.trim());
      params.append('email', student.email.trim());
      params.append('course', student.course.trim());
      params.append('uid', student.uid);
      
      const response = await api.post('/students/add', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      } else {
        throw new Error('Error: ' + error.message);
      }
    }
  },

  // Update a student
  updateStudent: async (student) => {
    try {
      // Validate required fields
      if (!student.id || !student.name || !student.email || !student.course || !student.uid) {
        throw new Error('All fields including ID are required');
      }

      const response = await api.put(`/students/update/${student.id}`, student);
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      } else {
        throw new Error('Error: ' + error.message);
      }
    }
  },

  // Delete a student
  deleteStudent: async (id) => {
    try {
      if (!id) {
        throw new Error('Student ID is required');
      }

      await api.delete(`/students/delete/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      } else {
        throw new Error('Error: ' + error.message);
      }
    }
  },

  // Test connection to backend
  testConnection: async () => {
    try {
      const response = await api.get('/students/getall');
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  }
};

export default studentService; 