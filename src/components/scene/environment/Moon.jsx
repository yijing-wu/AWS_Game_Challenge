import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Moon() {
  return (
    <>
      <mesh position={[5, 6, -20]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial emissive="#FFFFE0" emissiveIntensity={1.5} color="#FFFFFF" />
      </mesh>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.1} height={300} />
      </EffectComposer>
    </>
  );
}
