import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Computer(props) {
  const { scene } = useGLTF("/models/computer.glb");
  return (
    <group {...props}>
      <primitive object={scene} 
        scale={[0.25, 0.25, 0.25]}/>
    </group>
  );
}
