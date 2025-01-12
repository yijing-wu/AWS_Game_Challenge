import React, { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Computer({ gameState, position, onClick }) {
  const { scene } = useGLTF("/models/xylophone.glb");
  const [isHovered, setIsHovered] = useState(false);
  const computerRef = useRef();

  // Define which states the computer should be active in
  const isActive = gameState === "startgame" || 
                  gameState === "notegame" || 
                  gameState === "playSequence";

  // Define which states the computer is interactive in
  const isInteractive = gameState === "startgame" || 
                    gameState === "notegame";

  const handlePointerOver = (e) => {
    console.log(gameState);
    if (!isInteractive) return;
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    if (!isInteractive) return;
    e.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      <primitive
        ref={computerRef}
        object={scene}
        onClick={isInteractive ? onClick : null}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={isHovered && isInteractive ? [13, 13, 13] : [12, 12, 12]}
        rotation={[0, Math.PI / 5, 0]}
      />
      <pointLight
        position={[-0.1, 0.5, 0]}
        intensity={isActive ? 1 : 0}  // Light is on during active states
        color="#ebbf9d"
        angle={0.1}
        penumbra={0.1}
        castShadow
      />
    </group>
  );
}
