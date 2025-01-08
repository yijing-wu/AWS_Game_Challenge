import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Books({ position, onClick }) {
  const { scene } = useGLTF("/models/books.glb");

  return (
    <group position={position} onClick={onClick}>
      <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
    </group>
  );
}
