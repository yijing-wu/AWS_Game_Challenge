import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Computer({ position, onClick }) {
  const { scene } = useGLTF("/models/computer.glb");

  return (
    <group position={position} onClick={onClick}>
      <primitive object={scene} scale={[0.25, 0.25, 0.25]} />
    </group>
  );
}
