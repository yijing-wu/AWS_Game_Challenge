import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Planet = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const { scene } = useThree();

  useEffect(() => {
    // Cleanup function
    return () => {
      // Dispose of the previous model when component unmounts
      if (gltf) {
        gltf.scenes.forEach(scene => {
          scene.traverse(child => {
            if (child.isMesh) {
              if (child.geometry) child.geometry.dispose();
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(material => material.dispose());
                } else {
                  child.material.dispose();
                }
              }
            }
          });
        });
      }
    };
  }, [gltf]);

  return (
    <primitive
      object={gltf.scene.clone()} // Clone the scene to prevent sharing issues
      scale={[0.1, 0.1, 0.1]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

export default Planet;
