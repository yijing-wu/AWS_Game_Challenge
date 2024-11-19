import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Desk(props) {
  const { scene } = useGLTF("/models/antique_desk.glb");
  return (
    <group {...props}>
      {/* Lamp Model */}
      <primitive object={scene} />
      {/* Light Source */}
      <pointLight
        position={[0, 1.2, 0]}
        intensity={1}
        color="#ebbf9d"
        angle={0.1}
        penumbra={-0.1}
        castShadow
      />
    </group>
  );
}
