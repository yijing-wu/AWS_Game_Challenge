import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { playNote, saveNote } from "./music";

export default function NoteGame({ hitCount, setHitCount, setLastNote, gameState }) {
  const [gameObjects, setGameObjects] = useState([]);
  const [particles, setParticles] = useState([]);
  const mainLightRef = useRef();

  // Define fixed colors for each note
  const noteColors = {
    E: '#FF0000', // Red
    F: '#FFA500', // Orange 
    G: '#FFFF00', // Yellow
    A: '#00FF00', // Green
    B: '#0000FF', // Blue
    C: '#4B0082', // Indigo
    D: '#8F00FF'  // Violet
  };

  // Control main light based on game state
  useEffect(() => {
    if (mainLightRef.current) {
      // Light on during notegame, off otherwise
      mainLightRef.current.intensity = gameState === "notegame" ? 3 : 0;
    }
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState !== "notegame") return; // Only spawn notes during game

      const frequencies = {
        E: 329.63,
        F: 349.23,
        G: 392.0,
        A: 440.0,
        B: 493.88,
        C: 523.25,
        D: 587.33,
      };
      const notes = Object.keys(frequencies);
      const randomType = notes[Math.floor(Math.random() * notes.length)];

      setGameObjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: randomType,
          order: notes.indexOf(randomType),
          position: [Math.random() - 0.5, 1, 4.4],
          speed: Math.random() * 0.05 + 0.25,
          color: noteColors[randomType],
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, [gameState]);

  // Update both game objects and particles
  useFrame((state, delta) => {
    // Update game objects
    setGameObjects((prev) =>
      prev
        .map((obj) => ({
          ...obj,
          position: [
            obj.position[0],
            obj.position[1] - obj.speed * delta,
            obj.position[2],
          ],
        }))
        .filter((obj) => obj.position[1] > -3)
    );

    // Update particles
    setParticles((prev) =>
    prev
      .map((particle) => ({
        ...particle,
        velocity: [
          particle.velocity[0] * particle.deceleration,
          particle.velocity[1] * particle.deceleration - 0.0005, // Add gravity
          particle.velocity[2] * particle.deceleration,
        ],
        rotation: [
          particle.rotation[0] + particle.rotationSpeed[0],
          particle.rotation[1] + particle.rotationSpeed[1],
          particle.rotation[2] + particle.rotationSpeed[2],
        ],
        position: [
          particle.position[0] + particle.velocity[0],
          particle.position[1] + particle.velocity[1],
          particle.position[2] + particle.velocity[2],
        ],
        life: particle.life - 0.01,
      }))
      .filter((particle) => particle.life > 0)
    );
  });

  const createParticles = (position, color) => {
    const colors = [color, '#ffffff']; // Base color plus festive colors
    const newParticles = Array(40).fill().map(() => {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.random() * Math.PI;
      const speed = 0.01 + Math.random() * 0.015;

      return {
        position: [...position],
        velocity: [
          speed * Math.sin(phi) * Math.cos(theta),
          speed * Math.sin(phi) * Math.sin(theta) + 0.01, // Add slight upward bias
          speed * Math.cos(phi),
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ],
        deceleration: 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0.6,
        size: 0.03 + Math.random() * 0.02,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleClick = (id, type, order, position) => {
    setHitCount((count) => count + 1);
    setLastNote(type);
    playNote(order);
    saveNote(order);

    // Create particles at the clicked object's position
    createParticles(position, noteColors[type]);

    setGameObjects((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <>
      {/* Main central light source */}
      <pointLight
        ref={mainLightRef}
        position={[0, 1, 4.4]} // Positioned above the game area
        angle={0.6}
        penumbra={0.5}
        intensity={0} // Initial intensity (will be updated based on gameState)
        color="#ffffff"
        castShadow
      />

      {/* Game objects */}
      {gameObjects.map((obj) => (
        <group
          key={obj.id}
          position={obj.position}
          onClick={() => handleClick(obj.id, obj.type, obj.order, obj.position)}
        >
          <mesh scale={[0.2, 0.2, 0.2]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
              color={obj.color}
              transparent
              opacity={0.8}
              side={2}
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
        </group>
      ))}

      {/* Particles */}
      {particles.map((particle, index) => (
        <mesh
          key={`particle-${index}`}
          position={particle.position}
          rotation={particle.rotation}
        >
          <planeGeometry args={[particle.size*0.25, particle.size * 0.2]} />
          <meshStandardMaterial 
            color={particle.color}
            transparent
            opacity={particle.life}
            side={2}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      ))}
    </>
  );
}
