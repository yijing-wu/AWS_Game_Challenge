import React from "react";

import { useGLTF } from "@react-three/drei";

export default function City(props) {
  const { scene } = useGLTF("/models/city.glb");
  return (
    <group {...props}>
      {/* Lamp Model */}
      <primitive object={scene} />
    </group>
  );
}
