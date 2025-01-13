import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Desk(props) {
  const { scene } = useGLTF("/models/antique_desk.glb");
  return (
    <group {...props}>
      {/* Lamp Model */}
      <primitive object={scene} />
      {/* Light Source */}
    </group>
  );
}
