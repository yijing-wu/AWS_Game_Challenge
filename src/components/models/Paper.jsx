import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";

export default function Paper({ position, onPointerDown, ...props }) {
  const { scene } = useGLTF("/models/letter.glb");
  const paperRef = useRef();
  const [isViewing, setIsViewing] = useState(false);
  const { camera } = useThree();

  const handleClick = () => {
    console.log("Paper clicked!");
    
    // Call onPointerDown to trigger the input overlay
    if (onPointerDown) {
      onPointerDown();
    }

    // Store original camera state
    const originalPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    
    const originalRotation = {
      x: camera.rotation.x,
      y: camera.rotation.y,
      z: camera.rotation.z
    };

    // Get paper position
    const paperPosition = paperRef.current.position;

    // Animate camera to look down at paper
    gsap.to(camera.position, {
      x: originalPosition.x,
      y: originalPosition.y - 0.1,
      z: originalPosition.z - 0.2,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(-paperPosition); // Make camera look at paper
      },
      // onComplete: () => {
      //   if (onFloatingComplete) onFloatingComplete();
      // }
    });

    gsap.to(camera.rotation, {
      x: -180 * (Math.PI / 180), // Tilt camera down
      y: -180 * (Math.PI / 180),
      z: -180 * (Math.PI / 180),
      duration: 1,
    });

    // Handle escape to return to original view
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        gsap.to(camera.position, {
          x: originalPosition.x,
          y: originalPosition.y,
          z: originalPosition.z,
          duration: 2,
          ease: "power2.inOut"
        });

        gsap.to(camera.rotation, {
          x: originalRotation.x,
          y: originalRotation.y,
          z: originalRotation.z,
          duration: 2,
          ease: "power2.inOut"
        });

        window.removeEventListener("keydown", handleEscape);
      }
    };

    window.addEventListener("keydown", handleEscape);
    setIsViewing(true);
  };

  return (
    <group>
      <primitive
        ref={paperRef}
        object={scene}
        position={position} // Apply position here
        scale={[0.05, 0.05, 0.05]}
        rotation={[0, -90, 45]} // Convert degrees to radians
        onClick={handleClick}
      />
      <pointLight
        position={[0.6, 0.11, 4.25]} // Offset light position relative to paper
        intensity={0}
        color="#ebbf9d"
        angle={0.5}
        penumbra={1}
        castShadow
      />
    </group>
  );
}