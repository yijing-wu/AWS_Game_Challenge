import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Note from "./Note"; 

export default function NoteGame({ hitCount, setHitCount }) {
  const [gameObjects, setGameObjects] = useState([]);

  // 定时生成音符或炸弹
  useEffect(() => {
    const interval = setInterval(() => {
      const objectTypes = ["noteE","noteF","noteG","noteA","noteB","noteC","noteD","bomb"];
      const randomType = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      setGameObjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: randomType,
         position: [Math.random()  - 0.5, 1, 4.4],  
         speed: Math.random() * 0.001 + 0.005, 
         color: `hsl(${Math.random() * 360}, 100%, 50%)`, 
        },
      ]);
    }, 500); // 每500ms生成一个物体

    return () => clearInterval(interval);
  }, []);

// 使用 useFrame 精确更新位置
useFrame(() => {
  setGameObjects((prev) =>
    prev
      .map((obj) => ({
        ...obj,
        position: [obj.position[0], obj.position[1] - obj.speed, obj.position[2]],
      }))
      .filter((obj) => obj.position[1] > -3) // 移除屏幕外的物体
  );
});


  // 点击事件逻辑
  const handleClick = (id, type) => {
    if (type === "bomb") {
      setHitCount(0); // 点击炸弹清零计数
    } else {
      setHitCount((count) => count + 1); // 点击音符增加计数
    }
    setGameObjects((prev) => prev.filter((obj) => obj.id !== id)); // 移除被点击的物体
  };

  return (
    <>
      {gameObjects.map((obj) => (
        <group
          key={obj.id}
          position={obj.position}
          onClick={() => handleClick(obj.id, obj.type)}
        >
          {obj.type === "bomb" ? (
              <mesh scale={[0.2, 0.2, 0.2]}> 
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ) : (
            <mesh scale={[0.2, 0.2, 0.2]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={obj.color} />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

