import React, { useState, useRef } from "react";
import { useGLTF, Sparkles } from "@react-three/drei";
import * as THREE from 'three';

export default function Computer({ gameState, position, onClick }) {
  const { scene } = useGLTF("/models/xylophone.glb");
  const [isHovered, setIsHovered] = useState(false);
  const computerRef = useRef();

  // Define which states the computer should be active in
  const isActive = gameState === "startgame" || 
                  gameState === "notegame";

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
      <spotLight
        position={[0, 0.7, 0.2]}
        intensity={isActive ? 5 : 0}  // Light is on during active states
        color="#ffcea1"
        angle={0.3}
        distance={1}
        penumbra={0.4}
        target={computerRef.current}
        castShadow
      />
      {isActive && (
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.4, 2, 40, 40, true]} />
        <meshBasicMaterial
          color="#ffcea1"
          transparent
          opacity={0.008}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    )}
    {/* Particles */}
    {isActive && (
        <Sparkles
          position={[0, 0, 0]}
          count={50}
          scale={[0.5, 2, 0.5]}
          size={0.2}
          speed={0.05}
          opacity={0.3}
          color="#ebbf9d"
        />
      )}
    </group>
  );
}
