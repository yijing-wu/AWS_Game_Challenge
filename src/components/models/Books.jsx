import React, { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Books({ position, onClick }) {
  const { scene } = useGLTF("/models/orrery.glb");
  const [isHovered, setIsHovered] = useState(false);
  const booksRef = useRef();

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
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
      onClick={onClick}
      rotation={[-Math.PI/2, 0, 0]}
      
    >
      <primitive object={scene}
      ref={booksRef}
      scale={[0.15, 0.15, 0.15]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}/>
      <spotLight
        position={[0.12, 0.2, 0.2]}
        intensity={0}
        color="#ebbf9d"
        angle={-5}
        penumbra={-0.9}
        castShadow
      />
    </group>
  );
}
