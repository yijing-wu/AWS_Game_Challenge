import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './FilterSwitcher.css';
import { changeKey } from './music';
import Planet from './Planet';

const FilterSwitcher = ({ onConfirm }) => {
  const keys = ['eMinor', 'gMajor', 'dMajor', 'bMajor', 'aMinor'];
  const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#d4fc79'];
  const planets = [
    { 
      name: 'saturn', 
      extension: 'glb',
      scale: [0.007, 0.007, 0.007], // Adjust these values as needed
      rotation: [0.1, 0, 0]
    },
    { 
      name: 'mars', 
      extension: 'glb',
      scale: [0.1, 0.1, 0.1],
      rotation: [0, 0, 0]
    },
    { 
      name: 'moon', 
      extension: 'glb',
      scale: [0.1, 0.1, 0.1],
      rotation: [0, 0, 0]
    },
    { 
      name: 'mercury', 
      extension: 'glb',
      scale: [0.1, 0.1, 0.1],
      rotation: [0, 0, 0]
    },
    { 
      name: 'sun', 
      extension: 'glb',
      scale: [0.1, 0.1, 0.1],
      rotation: [0, 0, 0]
    }
  ];
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
    changeKey(keys[newIndex]);
  };

  // Update the background color and note color based on the current index
  useEffect(() => {
    document.body.style.background = colors[currentIndex];
  }, [currentIndex]);

  // Handle "Confirm" button click
  const handleConfirmClick = () => {
    onConfirm(keys[currentIndex]); 
    document.body.style.background = ''; 
  };
  

  return (
    <div className="filter-switcher">
      <div className="planet-viewer">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={3} />
          <pointLight position={[0, 0, 0]} />
          <Suspense fallback={
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color={colors[currentIndex]} wireframe />
            </mesh>
          }>
            <Planet
              key={`${planets[currentIndex].name}-${currentIndex}`}
              modelPath={`/models/planets/${planets[currentIndex].name}.${planets[currentIndex].extension}`}
              scale={planets[currentIndex].scale}
              rotation={planets[currentIndex].rotation}
            />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      <div className="controls">
        <button className="arrow left" onClick={() => handleArrowClick('left')}>
          ←
        </button>
        <div className="current-key">
          <div
            className="note-animation"
            style={{ color: colors[currentIndex] }}
          >
            ♪
          </div>
          <span id="currentKeyDisplay">
            {keys[currentIndex].replace(/([A-Z])/g, ' $1')}
          </span>
        </div>
        <button className="arrow right" onClick={() => handleArrowClick('right')}>
          →
        </button>
      </div>
      <button className="confirm-button" onClick={handleConfirmClick}>
        Confirm your key
      </button>
    </div>
  );
};

export default FilterSwitcher;
