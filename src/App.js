import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import NoteGame from "./NoteGame";
import { playSequence } from "./music"; 
import InputOverlay from "./components/Interface/InputOverlay";
import Paper from "./components/models/Paper";

function App() {
  const [hitCount, setHitCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastNote, setLastNote] = useState(""); // 用来保存最后点击的音符名字

  const [isFloating, setIsFloating] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [text, setText] = useState("");

  const [formData, setFormData] = useState({
    receiver: '',
    relationship: '',
    holiday: '',
    additional_info: '',
    tone: '',
    sender: ''
  });

  const startGame = () => {
    setHitCount(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const handlePaperClick = () => setIsFloating(true);
  const handleSubmit = () => {
    console.log("Submitted Text:", text);
    console.log("Submitted Form Data:", formData);
    setIsFloating(false); // Hide overlay and reset
    setText(""); // Clear input
    setFormData({
      name: '',
      relationship: '',
      holiday: '',
      additional_info: '',
      tone: '',
      sender: ''
    });
  };

  useEffect(() => {
    if (hitCount >= 10) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [hitCount]);

  // 处理点击事件，记录音符名字
  const handleNoteClick = (note) => {
    setLastNote(note);
  };

  const handlePlaySequence = () => {
    playSequence(); // 调用 playSequence 函数播放音符序列
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Canvas shadows>
        <DeskScene onComputerClick={startGame} />
        <Paper onPointerDown={handlePaperClick} />
        {gameStarted && <NoteGame hitCount={hitCount} setHitCount={setHitCount} onNoteClick={handleNoteClick} />}
        <OrbitControls 
          enablePan={false}      // Disable panning
          enableZoom={false}     // Disable zooming
          enableRotate={false}   // Disable rotation
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
          top: "10px",
          left: "10px",
          color: "white",
          fontSize: "20px",
        }}
      >
        <div>Hit Count: {hitCount}</div>
        <div>Last Note: {lastNote}</div> {/* 显示最后点击的音符名字 */}
        {gameOver && (
          <div style={{ marginTop: "20px" }}>
            Game Over! 
            <button onClick={startGame}>Restart</button>
            <button onClick={handlePlaySequence} style={{ marginLeft: "10px" }}>
              Play Sequence
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;