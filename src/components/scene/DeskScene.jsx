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

export default function DeskScene({ onComputerClick,onBooksClick }) {
  return (
    <>
      <Stars />
      <Moon />
      <NightLighting />
      <Ground />
      <FogEffect />
      <Desk position={[0, -1.1, 4.3]} />
      <Computer position={[0, -0.55, 5.2]} onClick={onComputerClick} />
      <Lamp position={[0.5, -0.25, 4.2]} />
      <Books position={[-0.35, -0.25, 4.2]} onClick={onBooksClick} />
      <Paper position={[0, -0.26, 4.4]} />
      {/*
      <Office position={[0, -1, 5]} />
      <Desk position={[0, -0.7, 4.2]} />
      
      <Paper position={[0.1, -0.4, 4.3]} />
      <Pen position={[-0.2, -0.4, 4.2]} />
      */}
    </>
  );
}
