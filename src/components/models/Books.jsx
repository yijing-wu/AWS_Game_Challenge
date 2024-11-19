import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Books(props) {
  const { scene } = useGLTF("/models/books.glb");

  return (
    <primitive
      object={scene}
      scale={[0.1, 0.1, 0.1]}
      {...props}
      onClick={() => alert("Open text input!")} // Replace with actual logic
    />
  );
}
