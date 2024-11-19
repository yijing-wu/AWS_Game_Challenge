import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Lamp(props) {
  const { scene } = useGLTF("/models/desk_lamp.glb");

  return (
    <group {...props}>
      {/* Lamp Model */}
      <primitive object={scene} 
        scale={[0.1, 0.11, 0.1]}
        rotation={[0, - Math.PI, 0]}
      />
      {/* Light Source */}
      <spotLight
        position={[-0.1, 0.2, 0]}
        intensity={1}
        color="#e28743"
        angle={0.01}
        penumbra={-0.9}
        castShadow
      />
    </group>
  );
}
