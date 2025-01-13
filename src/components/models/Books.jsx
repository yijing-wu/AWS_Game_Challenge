import React, { useState, useRef } from "react";
import { useGLTF, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Books({ gameState, position, onClick }) {
  const { scene } = useGLTF("/models/orrery.glb");
  const [isHovered, setIsHovered] = useState(false);
  const booksRef = useRef();

  // Define which states the books should be active in
  const isActive = gameState === "selectFilter" ||
                    gameState === "playSequence";

  // Define which states the books is interactive in
  const isInteractive = gameState === "playSequence";

  const handlePointerOver = (e) => {
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

  // Optional: Add smooth transition for hover effects
  useFrame((state) => {
    if (booksRef.current) {
      booksRef.current.scale.x = THREE.MathUtils.lerp(
        booksRef.current.scale.x,
        isHovered ? 0.16 : 0.15,
        0.1
      );
      booksRef.current.scale.y = THREE.MathUtils.lerp(
        booksRef.current.scale.y,
        isHovered ? 0.16 : 0.15,
        0.1
      );
      booksRef.current.scale.z = THREE.MathUtils.lerp(
        booksRef.current.scale.z,
        isHovered ? 0.16 : 0.15,
        0.1
      );
    }
  });

  return (
    <group position={position}
      rotation={[-Math.PI/2, 0, 0]}
    >
      <primitive object={scene}
      onClick={onClick}
      ref={booksRef}
      scale={[0.15, 0.15, 0.15]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}/>
      <spotLight
        position={[-0.3, 0.22, 0.4]}
        intensity={isActive ? 3 : 0}  // Light is on during active states
        color="#ffcea1"
        angle={0.4}
        distance={4}
        penumbra={0.8}
        target={booksRef.current}
        castShadow
      />
      {isActive && (
      <mesh position={[0.1, 0, -0.1]} rotation={[1, 0, 0]}>
        <coneGeometry args={[0.5, 5, 40, 40, true]} />
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
