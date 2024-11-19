import React from "react";
import { useLoader } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

export default function NightSky() {
  // Load the skybox textures
  const texture = useLoader(CubeTextureLoader, [
    "/textures/skybox/px.jpg", // Positive X
    "/textures/skybox/nx.jpg", // Negative X
    "/textures/skybox/py.jpg", // Positive Y
    "/textures/skybox/ny.jpg", // Negative Y
    "/textures/skybox/pz.jpg", // Positive Z
    "/textures/skybox/nz.jpg", // Negative Z
  ]);

  // Attach the texture as the background
  return <primitive attach="background" object={texture} />;
}
