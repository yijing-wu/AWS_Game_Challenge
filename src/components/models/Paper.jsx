import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Paper({ gameState, position, onPointerDown }) {
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
  const isInteractive = gameState === "sendEmail" ||
                        gameState === "inputOverlay";

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

  const handleClick = () => {
    console.log("Paper clicked!");
    
    // Call onPointerDown to trigger the input overlay
    if (onPointerDown) {
      onPointerDown();
    }
  };

  return (
    <group>
      <primitive
        ref={paperRef}
        object={scene}
        position={position}
        scale={[0.05, 0.05, 0.05]}
        rotation={[0, -90, 20]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <pointLight
        position={[0.6, 0.11, 4.25]}
        intensity={isActive || (isHovered && isInteractive) ? 1 : 0}
        color="#ebbf9d"
        angle={0.5}
        penumbra={1}
        castShadow
      />
    </group>
  );
}