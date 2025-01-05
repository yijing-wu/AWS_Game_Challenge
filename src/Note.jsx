import React from "react";

import { useGLTF } from "@react-three/drei";

export default function Note(props) {
  const { scene } = useGLTF("/models/note.glb");
  return (
<group {...props} position={[0, 0, 0]} >
  <primitive object={scene} />
</group>

  );
}
