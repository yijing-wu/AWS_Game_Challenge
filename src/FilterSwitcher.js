import React, { useState, useEffect } from 'react';
import './FilterSwitcher.css';
import { changeKey } from './music';

const FilterSwitcher = () => {
  const keys = ['eMinor', 'gMajor', 'dMajor', 'bMajor', 'aMinor'];
  const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#d4fc79'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleArrowClick = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'left') {
      newIndex = (currentIndex - 1 + keys.length) % keys.length;
    } else if (direction === 'right') {
      newIndex = (currentIndex + 1) % keys.length;
    }
    setCurrentIndex(newIndex);
    changeKey(keys[newIndex]);
  };

  useEffect(() => {
    document.body.style.background = colors[currentIndex]; 
  }, [currentIndex]);

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
    </div>
  );
};

export default FilterSwitcher;
