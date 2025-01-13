import React from "react";
import Desk from "../models/Desk";
import Computer from "../models/Computer";
import Lamp from "../models/Lamp";
import Books from "../models/Books";
import Paper from "../models/Paper";
import Stars from "./environment/Stars";
import Moon from "./environment/Moon";
import NightLighting from "./environment/NightLighting";
import Ground from "./environment/Ground";
import FogEffect from "./environment/FogEffect";

export default function DeskScene({ gameState,onComputerClick,onBooksClick,onPaperClick}) {
  console.log("DeskScene gameState:", gameState);
  return (
    <>
      <Stars />
      <Moon />
      <NightLighting />
      <Ground />
      <FogEffect />
      <Desk position={[0, -1.1, 4.3]} />
      <Computer position={[-0.38, -0.28, 4.35]} 
        onClick={onComputerClick}
        gameState={gameState} />
      <Books position={[-0.05, -0.15, 4.35]} onClick={onBooksClick}
        gameState={gameState} />
      <Paper position={[0.4, -0.26, 4.4]}
        onClick={onPaperClick}
        gameState={gameState} 
        />
      {/*
      <Office position={[0, -1, 5]} />
      <Desk position={[0, -0.7, 4.2]} />
      <Lamp position={[0.5, -0.25, 4.2]} />
      <Paper position={[0.1, -0.4, 4.3]} />
      <Pen position={[-0.2, -0.4, 4.2]} />
      */}
    </>
  );
}
