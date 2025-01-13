import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';

const Planet = ({ modelPath, scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const isUSDZ = modelPath.endsWith('.usdz');
  
  // Use different loaders based on file extension
  const model = useLoader(
    isUSDZ ? USDZLoader : GLTFLoader,
    modelPath
  );

  const { scene } = useThree();

  useEffect(() => {
    return () => {
      if (model) {
        // Cleanup for GLB models
        if (!isUSDZ && model.scenes) {
          model.scenes.forEach(scene => {
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
        // Cleanup for USDZ models
        if (isUSDZ) {
          model.traverse(child => {
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
        }
      }
    };
  }, [model, isUSDZ]);

  if (!model) return null;

  // Handle different model types
  const modelScene = isUSDZ ? model : model.scene;

  return (
    <primitive
      object={modelScene.clone()}
      scale={scale}
      position={[0, 0, 0]}
      rotation={rotation}
    />
  );
};

export default Planet;
