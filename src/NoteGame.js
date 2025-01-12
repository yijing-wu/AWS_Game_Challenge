import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { playNote, saveNote } from "./music";

export default function NoteGame({ hitCount, setHitCount, setLastNote }) {
  const [gameObjects, setGameObjects] = useState([]);

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

  useEffect(() => {
    const interval = setInterval(() => {
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
          order: notes.indexOf(randomType),
          position: [Math.random() - 0.5, 1, 4.4],
          speed: Math.random() * 0.001 + 0.005,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          color: noteColors[randomType],
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    setGameObjects((prev) =>
      prev
        .map((obj) => ({
          ...obj,
          position: [
            obj.position[0],
            obj.position[1] - obj.speed,
            obj.position[2],
          ],
        }))
        .filter((obj) => obj.position[1] > -3)
    );
  });

  const handleClick = (id, type, order) => {
    setHitCount((count) => count + 1);
    setLastNote(type); 
    playNote(order); 
    saveNote(order); 

    setGameObjects((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <>
      {gameObjects.map((obj) => (
        <group
          key={obj.id}
          position={obj.position}
          onClick={() => handleClick(obj.id, obj.type, obj.order)}
        >
          <mesh scale={[0.2, 0.2, 0.2]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={obj.color} />
          </mesh>
        </group>
      ))}
    </>
  );
}
