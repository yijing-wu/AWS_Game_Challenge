import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import NoteGame from "./NoteGame";

function App() {
  const [hitCount, setHitCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setHitCount(0); // 重置计数
    setGameOver(false); // 确保重新开始
    setGameStarted(true);
  };

  useEffect(() => {
    if (hitCount >= 10) {
      setGameOver(true);
      setGameStarted(false); // 停止游戏
    }
  }, [hitCount]);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Canvas shadows>
        <DeskScene onComputerClick={startGame} />
        {gameStarted && <NoteGame hitCount={hitCount} setHitCount={setHitCount} />}
        <OrbitControls />
      </Canvas>

      {/* 显示计数和游戏状态 */}
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
        {gameOver && (
          <div style={{ marginTop: "20px" }}>
            Game Over! <button onClick={startGame}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
