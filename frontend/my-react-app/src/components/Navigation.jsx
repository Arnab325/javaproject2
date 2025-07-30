import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav-tabs">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
        end
      >
        View All Students
      </NavLink>
      <NavLink 
        to="/add" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Add Student
      </NavLink>
      <NavLink 
        to="/update" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Update Student
      </NavLink>
      <NavLink 
        to="/delete" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Delete Student
      </NavLink>
    </nav>
  );
};

export default Navigation; 