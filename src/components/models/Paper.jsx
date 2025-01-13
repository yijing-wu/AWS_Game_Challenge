import React, { useRef, useState } from "react";
import { useGLTF, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Paper({ gameState, position, onClick }) {
  const { scene } = useGLTF("/models/letter.glb");
  const paperRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const { camera } = useThree();

  console.log("Paper component gameState:", gameState);

  // Define which states the books should be active in
  const isActive = gameState === "sendEmail" ||
                    gameState === "inputOverlay";

  // Define which states the books is interactive in
  const isInteractive = gameState === "sendEmail";

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (!isInteractive) return;
    
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    if (!isInteractive) return;
    
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  // Optional: Add smooth transition for hover effects
  useFrame((state) => {
    if (paperRef.current) {
      const targetScale = (isHovered && isInteractive) ? 0.06 : 0.05;
      paperRef.current.scale.x = THREE.MathUtils.lerp(
        paperRef.current.scale.x,
        targetScale,
        0.1
      );
      paperRef.current.scale.y = THREE.MathUtils.lerp(
        paperRef.current.scale.y,
        targetScale,
        0.1
      );
      paperRef.current.scale.z = THREE.MathUtils.lerp(
        paperRef.current.scale.z,
        targetScale,
        0.1
      );
    }
  });

  return (
    <group >
      <primitive
        ref={paperRef}
        object={scene}
        position={position}
        scale={[0.05, 0.05, 0.05]}
        rotation={[0, -90, 20]}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <spotLight
        position={[0.5, 0.1, 4.5]}
        intensity={isActive ? 3 : 0}  // Light is on during active states
        color="#ffcea1"
        angle={0.45}
        distance={4}
        penumbra={0.5}
        target={paperRef.current}
        castShadow
      />
      {isActive && (
      <mesh position={[0.44, 0.05, 4.4]} rotation={[0.16, 0, 0]}>
        <coneGeometry args={[0.3, 1, 3, 3, true]} />
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