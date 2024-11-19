import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Office(props) {
  const { scene } = useGLTF("/models/office.glb");
  return (
    <group {...props}>
      {/* Lamp Model */}
      <primitive object={scene} />
    </group>
  );
}
