import { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const CubeConTexturas = () => {
  const [texturaActiva, setTexturaActiva] = useState(0);

  const textura1 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const textura2 = useLoader(TextureLoader, "/assets/texture2.jpg");

  const texturas = [textura1, textura2];

  const alternarTextura = () => {
    setTexturaActiva((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <mesh onClick={alternarTextura} castShadow>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={texturas[texturaActiva]} />
    </mesh>
  );
};

const LabCubeTexturas = () => {
  return (
    <Canvas
      shadows
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      camera={{ position: [0, 2, 6], fov: 50 }}
    >
      {/* Iluminación ambiental */}
      <ambientLight intensity={0.5} />

      {/* Iluminación direccional */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cubo con textura intercambiable al hacer clic */}
      <CubeConTexturas />

      {/* Plano base con sombras */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Control de cámara orbital */}
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  );
};

export default LabCubeTexturas;