import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import NoteGame from "./NoteGame";
import { playSequence } from "./music"; 

function App() {
  const [hitCount, setHitCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastNote, setLastNote] = useState(""); // 用来保存最后点击的音符名字

  const startGame = () => {
    setHitCount(0);
    setGameOver(false);
    setGameStarted(true);
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
        {gameStarted && <NoteGame hitCount={hitCount} setHitCount={setHitCount} onNoteClick={handleNoteClick} />}
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