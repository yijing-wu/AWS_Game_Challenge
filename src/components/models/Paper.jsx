import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Paper(props) {
  const { scene } = useGLTF("/models/paper.glb");

  return (
    <primitive
      object={scene}
      {...props}
      onClick={() => alert("Open text input!")} // Replace with actual logic
    />
  );
}
