export default function Ground() {
    return (
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#2d2e30" />
      </mesh>
    );
  }
  