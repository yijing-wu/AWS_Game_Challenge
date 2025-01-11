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
  const [gameState, setGameState] = useState("idle"); // "idle", "notegame", "selectFilter", "sendEmail"
  const [hitCount, setHitCount] = useState(0);
  const [lastNote, setLastNote] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [htmlContents, setHtmlContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    receiver: "",
    relationship: "",
    holiday: "",
    additional_info: "",
    tone: "",
    sender: ""
  });

  const startGame = () => {
    setGameState("startgame"); 
  };

  const handleComputerClick = () => {
    if (gameState === "startgame"){
      setGameState("notegame");
      setHitCount(0);
      setLastNote("");
    }
  }

  useEffect(() => {
    if (gameState === "notegame" && hitCount >= 10) {
      setGameState("playSequence");
    }
  }, [hitCount, gameState]);

  const handlePlaySequence = () => {
    if (gameState === "playSequence") {
    setIsPlaying((prev) => !prev);
    playSequence();
    }
  };
 
  const handleBooksClick = () => {
    if (gameState === "playSequence") {
      setGameState("selectFilter");
    }
  };

  const handleFilterConfirmed = () => {
    setGameState("sendEmail");
  };

  const handlePaperClick = () => {
    if (gameState === "sendEmail") {
      setGameState("inputOverlay");
      setIsFloating(true);
    }
  };

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
      {/* Start Game Screen */}
      {gameState === "idle" && (
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "50%",
          height: "50%",
          backgroundColor: "#000",
          backgroundImage: "url('https://darksky.org/app/uploads/2020/03/hero-Night-Sky-Family-Activities.jpg')",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "'Pacifico', cursive",
          fontSize: "50px",
          flexDirection: "column",
          textAlign: "center"
        }}>
          <div>Welcome to the Game!</div>
          <button 
            onClick={startGame} 
            style={{
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "5px",
              padding: "10px 20px",
              marginTop: "20px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer"
            }}>
            Start Game
          </button>
        </div>
      )}

      {/* Game Content */}
      {gameState !== "idle" && (
        <div>
          <Canvas shadows>
            <DeskScene onComputerClick={handleComputerClick} onBooksClick={handleBooksClick} />
            {gameState === "notegame" && (
              <NoteGame hitCount={hitCount} setHitCount={setHitCount} setLastNote={setLastNote} />
            )}
            <Paper onPointerDown={handlePaperClick} />
            <OrbitControls 
              enablePan={false} 
              enableZoom={false} 
              enableRotate={false} 
            />
            {gameState === "inputOverlay" && (
              <InputOverlay
                isFloating={isFloating}
                text={formData}
                setText={setFormData}
                handleSubmit={handleSubmit}
              />
            )}
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
            {gameState === "notegame" && (
              <>
                <div>Hit Count: {hitCount}</div>
                <div>Last Note: {lastNote}</div>
              </>
            )}
            {gameState === "playSequence" && (
              <div style={{ marginTop: "20px" }}>
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
            {gameState === "selectFilter" && (
              <FilterSwitcher onConfirm={handleFilterConfirmed} />
            )}
          </div>

          <ResponseDisplay 
            htmlContents={htmlContents}
            isLoading={isLoading}
            onChoiceSubmitted={handleChoiceSubmitted}
          />
        </div>
      )}
    </div>
  );
}

export default App;