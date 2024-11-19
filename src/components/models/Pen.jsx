import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Pen(props) {
  const { scene } = useGLTF("/models/pen.glb"); // Load the pen model
  const penRef = useRef();
  const spotlightRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <>
    <primitive
      ref={penRef}
      object={scene}
      {...props}
      onPointerOver={() => {
        if (penRef.current) {
          penRef.current.rotation.x += 0.2; // Rotate slightly on the X-axis
        }
        setHovered(true)
      }}
      onPointerOut={() => {
        if (penRef.current) {
          penRef.current.rotation.x -= 0.2; // Reset rotation
        }
        setHovered(false)
      }}
    />

    {/* Spotlight */}
    {hovered && (
      <spotLight
        ref={spotlightRef}
        position={[0, 0.5,4.2]} // Position the spotlight above and in front
        angle={0.2} // Narrow the beam angle for focus
        penumbra={0.5} // Soft edge for the light
        intensity={1.2} // Light intensity
        color="#FFD700" // Warm yellow color for the spotlight
        castShadow
        target={penRef.current} // Focus the spotlight on the pen
      />
    )}
    </>
  );
}
