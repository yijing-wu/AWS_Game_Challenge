import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { playNote } from "./music"; // 假设函数在 music.js 中

export default function NoteGame({ hitCount, setHitCount }) {
  const [gameObjects, setGameObjects] = useState([]);

  // 定时生成音符
  useEffect(() => {
    const interval = setInterval(() => {
      const frequencies = {
        'E': 329.63,
        'F': 349.23,
        'G': 392.00,
        'A': 440.00,
        'B': 493.88,
        'C': 523.25,
        'D': 587.33
    };
    const notes = Object.keys(frequencies);
    const randomType = notes[Math.floor(Math.random() * notes.length)];
      setGameObjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: randomType,
          position: [Math.random() - 0.5, 1, 4.4],
          speed: Math.random() * 0.001 + 0.005,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // 使用 useFrame 精确更新位置
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
        .filter((obj) => obj.position[1] > -3) // 移除屏幕外的物体
    );
  });

  // 点击事件逻辑
  const handleClick = (id, type) => {
    console.log("Clicked note:", type);
    
    setGameObjects((prev) => prev.map((obj) =>
        obj.id === id
            ? { ...obj, scale: [0.3, 0.3, 0.3] } // 点击时缩放
            : obj
    ));

    setHitCount((count) => count + 1);
    playNote(type, false); // 调用 playNote 播放音符
    

    setTimeout(() => {
        setGameObjects((prev) => prev.filter((obj) => obj.id !== id));
    }, 200); // 延迟删除以展示缩放效果
};


  return (
    <>
      {gameObjects.map((obj) => (
        <group
          key={obj.id}
          position={obj.position}
          onClick={() => handleClick(obj.id, obj.type)}
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