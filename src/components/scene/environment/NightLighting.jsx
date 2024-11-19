export default function NightLighting() {
    return (
      <>
        <ambientLight intensity={0.2} color="#87CEEB" />
        <directionalLight
          position={[10, 10, -10]}
          intensity={0.5}
          color="#B0C4DE"
          castShadow
        />
      </>
    );
  }
  