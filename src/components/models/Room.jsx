import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Room(props) {
  const { scene } = useGLTF("/models/room.glb");
  return (
    <group {...props}>
      {/* Lamp Model */}
      <primitive object={scene} />
      {/* Light Source */}
      <pointLight
        position={[0, 1, 0]}
        intensity={3}
        color="#3370da"
        angle={0.1}
        penumbra={-0.1}
        castShadow
      />
    </group>
  );
}
