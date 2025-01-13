import React, { useEffect, useRef } from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import * as THREE from "three";

const Planet = ({ modelPath, scale = [1, 1, 1], rotation = [0, 0, 0], animate = false, exitAnimate = false  }) => {
  const isUSDZ = modelPath.endsWith('.usdz');
  const meshRef = useRef({
    isAnimating: animate,
    startTime: null,
    completed: false,
    isExitAnimation: false,
    exitStartTime: null,
    exitCompleted: false,
    startExitPosition: null
  });

  const { viewport, camera } = useThree();

  useEffect(() => {
    console.log("Props received:", { animate, exitAnimate });
  }, [animate, exitAnimate]);


  // Modified useEffect for exitAnimate
  useEffect(() => {
    console.log("Exit animate changed:", exitAnimate);
    console.log("Current meshRef state:", meshRef.current);

    meshRef.current.isExitAnimation = exitAnimate;
    meshRef.current.exitStartTime = null;
    meshRef.current.exitCompleted = false;
    meshRef.current.startExitPosition = null;

    console.log("Updated meshRef state:", meshRef.current);
  }, [exitAnimate]);


  useFrame((state, delta) => {
    if (meshRef.current.object) {
      // First animation (entrance)
      if (meshRef.current.isAnimating && !meshRef.current.completed) {
        if (meshRef.current.startTime === null) {
          meshRef.current.startTime = state.clock.getElapsedTime();
          meshRef.current.object.position.x = -viewport.width;
          meshRef.current.object.position.y = -viewport.height;
        }

        const elapsed = state.clock.getElapsedTime() - meshRef.current.startTime;
        const duration = 2;
        const progress = Math.min(elapsed / duration, 1);
        const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

        meshRef.current.object.position.x = -viewport.width * (1 - eased);
        meshRef.current.object.position.y = (-viewport.height * (1 - eased)) + (viewport.height * 0.25);

        if (progress >= 1 && !meshRef.current.completed) {
          meshRef.current.completed = true;
        }
      }

      // Exit animation - curves from center to bottom right
      if (exitAnimate && !meshRef.current.exitCompleted) {
        if (meshRef.current.exitStartTime === null) {
          meshRef.current.exitStartTime = state.clock.getElapsedTime();
          // meshRef.current.object.position.set(0, 0, 0);
          meshRef.current.startExitPosition = {
            x: 0,
            y: (-viewport.height * 0) + (viewport.height * 0.25) // Same Y position as entrance end
          };
          meshRef.current.startExitRotation = meshRef.current.object.rotation.y;
        }

        const elapsed = state.clock.getElapsedTime() - meshRef.current.exitStartTime;
        const duration = 2;
        const progress = Math.min(elapsed / duration, 1);
        const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

        // Curved path for exit
        const targetX = viewport.width;
        const targetY = -viewport.height;
        
        // Add curved motion by modifying the path
        const angle = progress * Math.PI / 2; // 90-degree rotation
        const radius = viewport.width / 2;
        
        const newX = meshRef.current.startExitPosition.x + (radius * Math.sin(angle));
        const newY = meshRef.current.startExitPosition.y - (radius * (1 - Math.cos(angle)));

        meshRef.current.object.position.x = newX;
        meshRef.current.object.position.y = newY;

        if (progress >= 1) {
          meshRef.current.exitCompleted = true;
        }
      }

      // Continue model rotation
      meshRef.current.object.rotation.y += delta * 1.5;
    }
  });

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

  // Add this useEffect to watch for exitAnimate prop changes
  useEffect(() => {
    console.log("Exit animate changed:", exitAnimate);
    if (exitAnimate) {
      meshRef.current = {
        ...meshRef.current,
        isExitAnimation: true,
        exitStartTime: null,
        exitCompleted: false,
        startExitPosition: {
          x: meshRef.current.object?.position.x || 0,
          y: meshRef.current.object?.position.y || 0
        }
      };
    }
  }, [exitAnimate]);

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

  // Set initial position values
  const initialPosition = [-viewport.width / 2, -viewport.height / 2, 0];

  return (
    <primitive
      ref={(obj) => {
        if (obj) {
          meshRef.current.object = obj;
          // Only set initial position if this is the very first setup
          if (!meshRef.current.startTime && !meshRef.current.exitStartTime) {
            obj.position.set(-viewport.width, -viewport.height, 0);
          }
          if (obj.geometry) {
            obj.geometry.center();
          }
        }
      }}
      object={modelScene.clone()}
      scale={scale}
      position={[-viewport.width, -viewport.height, 0]}
      rotation={rotation}
    />
  );
};

export default Planet;
