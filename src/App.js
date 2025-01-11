import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import NoteGame from "./NoteGame";
import FilterSwitcher from "./FilterSwitcher";
import { playSequence } from "./music";
import InputOverlay from "./components/Interface/InputOverlay";
import Paper from "./components/models/Paper";
import ResponseDisplay from "./components/Interface/ResponseDisplay";
import { generateContent } from "./components/services/api";

function App() {
  const [hitCount, setHitCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastNote, setLastNote] = useState(""); 
  const [showFilterSwitcher, setShowFilterSwitcher] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [htmlContents, setHtmlContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    receiver: '',
    relationship: '',
    holiday: '',
    additional_info: '',
    tone: '',
    sender: ''
  });

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

  const handlePaperClick = () => setIsFloating(true);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsFloating(false); // Hide the InputOverlay immediately when submitting
    try {
      const data = await generateContent(formData);
      setHtmlContents(data);
      setFormData({
        receiver: '',
        relationship: '',
        holiday: '',
        additional_info: '',
        tone: '',
        sender: ''
      });
    } catch (error) {
      console.error("Error:", error);
      setIsFloating(true); // Show the form again if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoiceSubmitted = () => {
    setHtmlContents([]); // Clear the responses
    setIsLoading(false); // Reset loading state
    setIsFloating(false); // Hide the input overlay
    // Optionally show a success message
    alert("Your card has been sent successfully!"); // You can replace this with a more elegant notification
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Canvas shadows>
        <DeskScene
          onComputerClick={startGame}
          onBooksClick={handleBooksClick}
        />
        <Paper onPointerDown={handlePaperClick} />
        {gameStarted && (
          <NoteGame
            hitCount={hitCount}
            setHitCount={setHitCount}
            setLastNote={setLastNote} // Pass setLastNote
          />
        )}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
        <InputOverlay
          isFloating={isFloating}
          text={formData}
          setText={setFormData}
          handleSubmit={handleSubmit}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "50px",
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

      <ResponseDisplay 
        htmlContents={htmlContents}
        isLoading={isLoading}
        onChoiceSubmitted={handleChoiceSubmitted}
      />
    </div>
  );
}

export default App;