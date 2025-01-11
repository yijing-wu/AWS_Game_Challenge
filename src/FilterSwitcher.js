import React, { useState, useEffect } from 'react';
import './FilterSwitcher.css';
import { changeKey } from './music';

const FilterSwitcher = ({ onConfirm }) => {
  const keys = ['eMinor', 'gMajor', 'dMajor', 'bMajor', 'aMinor'];
  const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#d4fc79'];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle arrow navigation
  const handleArrowClick = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'left') {
      newIndex = (currentIndex - 1 + keys.length) % keys.length;
    } else if (direction === 'right') {
      newIndex = (currentIndex + 1) % keys.length;
    }
    setCurrentIndex(newIndex);
    changeKey(keys[newIndex]); // Call changeKey to update the key
  };

  // Update the background color based on the current index
  useEffect(() => {
    document.body.style.background = colors[currentIndex];
  }, [currentIndex]);

  // Handle "Confirm" button click
  const handleConfirmClick = () => {
    onConfirm(keys[currentIndex]); // Pass the selected key back to App
  };

  return (
    <div className="filter-switcher">
      <button className="arrow left" onClick={() => handleArrowClick('left')}>
        ←
      </button>
      <div className="current-key">
        <div className="note-animation">♪</div>
        <span id="currentKeyDisplay">{keys[currentIndex].replace(/([A-Z])/g, ' $1')}</span>
      </div>
      <button className="arrow right" onClick={() => handleArrowClick('right')}>
        →
      </button>
      <button className="confirm-button" onClick={handleConfirmClick}
      style={{
        padding: '10px 20px', 
        fontSize: '16px', 
        fontFamily: "'Pacifico', cursive",
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        transition: 'background-color 0.3s'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        Confirm
      </button>
    </div>
  );
};

export default FilterSwitcher;
