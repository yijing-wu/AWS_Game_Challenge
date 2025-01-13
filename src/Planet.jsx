import React, { useEffect, useRef } from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import * as THREE from "three";

const Planet = ({ modelPath, scale = [1, 1, 1], rotation = [0, 0, 0], animate = false }) => {
  const isUSDZ = modelPath.endsWith('.usdz');
  const meshRef = useRef({
    isAnimating: animate,
    startTime: null,
    completed: false
  });

  const { viewport, camera } = useThree();

  useEffect(() => {
    if (camera) {
      camera.position.z = 50;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  // Set up orthographic-like perspective camera
  useEffect(() => {
    if (camera) {
      camera.fov = 45; // Lower FOV reduces perspective distortion
      camera.position.z = 20; // Move camera further back
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  // Reset animation state when animate prop changes
  useEffect(() => {
    meshRef.current = {
      ...meshRef.current,
      isAnimating: animate,
      startTime: null,
      completed: false
    };
  }, [animate]);

  // Use different loaders based on file extension
  const model = useLoader(
    isUSDZ ? USDZLoader : GLTFLoader,
    modelPath
  );

  const { scene } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current.object && meshRef.current.isAnimating && !meshRef.current.completed) {
      if (meshRef.current.startTime === null) {
        meshRef.current.startTime = state.clock.getElapsedTime();
        // Adjust initial position based on camera distance
        meshRef.current.object.position.x = -viewport.width / 2;
        meshRef.current.object.position.y = -viewport.height / 2;
      }

      const elapsed = state.clock.getElapsedTime() - meshRef.current.startTime;
      const duration = 2;
      const progress = Math.min(elapsed / duration, 1);

      // Use smoother easing function
      const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

      meshRef.current.object.position.x = (-viewport.width / 2) * (1 - eased);
      meshRef.current.object.position.y = (-viewport.height / 2) * (1 - eased);

      // Smoother rotation
      meshRef.current.object.rotation.y += delta * 1.5;

      if (progress >= 1) {
        meshRef.current.completed = true;
      }
    }
  });

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
      ref={(obj) => {
        if (obj) {
          meshRef.current.object = obj;
          // Center the model's pivot point
          if (obj.geometry) {
            obj.geometry.center();
          }
        }
      }}
      object={modelScene.clone()}
      scale={scale}
      position={[0, 0, 0]}
      rotation={rotation}
    />
  );
};

export default Planet;
