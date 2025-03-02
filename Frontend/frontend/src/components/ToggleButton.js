// src/components/ToggleButton.js
import React from 'react';
// import './ToggleButton.css'; // Optional: Add your styles here

const ToggleButton = ({ isActive, onToggle }) => {
  return (
    <button
      className={`toggle-button ${isActive ? 'active' : ''}`}
      onClick={onToggle}
      aria-pressed={isActive} // Accessibility: indicates the button's state
      style={{
        backgroundColor: isActive ? '#4CAF50' : '#f44336', // Conditional background color
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {isActive ? 'ON' : 'OFF'}
    </button>
  );
};

export default ToggleButton;
