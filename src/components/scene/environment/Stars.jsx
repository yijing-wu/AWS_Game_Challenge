import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Stars() {
  const starCount = 500;

  // Generate random positions for stars
  const positions = Array.from({ length: starCount }, () => [
    (Math.random() - 0.5) * 100, // X
    (Math.random() - 0.5) * 50,  // Y
    (Math.random() - 0.5) * 200, // Z
  ]);

  // Store references for stars to animate
  const starsRef = useRef([]);

  // Animate star blinking
  useFrame(() => {
    starsRef.current.forEach((star) => {
      if (star.material) {
        const intensity = Math.max(0.8, Math.sin(Date.now() * 0.0005 + Math.random()*10));
        star.material.opacity = intensity;
        star.material.color.setHSL(0.6, 0.7, intensity); // Change color based on intensity
      }
    });
  });

  return (
    <group>
      {positions.map(([x, y, z], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          ref={(ref) => (starsRef.current[index] = ref)} // Store reference for each star
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="white" transparent />
        </mesh>
      ))}
    </group>
  );
}
