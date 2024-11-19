import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas shadows>
        <DeskScene />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
