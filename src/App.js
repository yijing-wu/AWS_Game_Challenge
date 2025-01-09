import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import NoteGame from "./NoteGame";
import FilterSwitcher from "./FilterSwitcher";
import { playSequence } from "./music";

function App() {
  const [hitCount, setHitCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastNote, setLastNote] = useState(""); // State for last played note
  const [showFilterSwitcher, setShowFilterSwitcher] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); 

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setHitCount(0);
    setLastNote("");
    setShowFilterSwitcher(false);
  };

  useEffect(() => {
    if (hitCount >= 10) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [hitCount]);

  const handleBooksClick = () => {
    if (gameOver) {
      setShowFilterSwitcher(true);
    }
  };

  const handlePlaySequence = () => {
    setIsPlaying((prev) => !prev);
    playSequence();
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Canvas shadows>
        <DeskScene
          onComputerClick={startGame}
          onBooksClick={handleBooksClick}
        />
        {gameStarted && (
          <NoteGame
            hitCount={hitCount}
            setHitCount={setHitCount}
            setLastNote={setLastNote} // Pass setLastNote
          />
        )}
        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "white",
          fontSize: "20px",
        }}
      >
        <div>Hit Count: {hitCount}</div>
        <div>Last Note: {lastNote}</div> {/* Display the last note */}
        {gameOver && (
          <div style={{ marginTop: "20px" }}>
            Game Over!
            <button onClick={startGame}>Restart</button>
            <button
        className="play-button"
        onClick={handlePlaySequence}
        style={{
          backgroundColor: isPlaying ? '#ff6b6b' : '#4CAF50',
        }}
      >
        {isPlaying ? 'Stop Sequence' : 'Play Sequence'}
      </button>
          </div>
        )}
        {showFilterSwitcher && <FilterSwitcher />}
      </div>
    </div>
  );
}

export default App;