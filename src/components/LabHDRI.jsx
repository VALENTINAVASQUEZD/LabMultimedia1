import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";

const EsferaMetalica = ({ position, roughness = 0, metalness = 1, color = "white" }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.7, 64, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
};

const CuboCristal = ({ position }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.4;
      ref.current.rotation.y = clock.getElapsedTime() * 0.6;
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={1.5}
        roughness={0}
        ior={1.5}
        transparent
      />
    </mesh>
  );
};

const EscenaHDRI = () => (
  <>
    {/*
      Environment carga el archivo .hdr vía RGBELoader de Three.js.
      background  → usa el HDRI como fondo visible de la escena.
      Sin background → solo ilumina sin mostrarse.
    */}
    <Environment files="/assets/bryanston_park_sunrise_1k.hdr" background />

    {/* Esferas metálicas con distintos valores de rugosidad */}
    <EsferaMetalica position={[-3, 0.8, 0]} roughness={0}   metalness={1} color="#c0c0c0" />
    <EsferaMetalica position={[0,  0.8, 0]} roughness={0.3} metalness={0.8} color="#d4a054" />
    <EsferaMetalica position={[3,  0.8, 0]} roughness={0.6} metalness={0.5} color="#7ec8e3" />

    {/* Cubo con material de cristal/transmisión */}
    <CuboCristal position={[0, 2.5, 0]} />

    {/* Sombras de contacto sobre el suelo */}
    <ContactShadows
      position={[0, -0.1, 0]}
      blur={2.5}
      far={4}
      scale={12}
      opacity={0.6}
    />

    {/* Plano base */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
    </mesh>

    <OrbitControls enableDamping dampingFactor={0.05} />
  </>
);

// --------------------------------------------------
// Componente principal exportado
// --------------------------------------------------
const LabHDRI = () => (
  <div style={{ width: "100%", height: "100vh" }}>
    <Canvas
      shadows
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 2, 8], fov: 50 }}
      gl={{ toneMapping: 4 /* ACESFilmicToneMapping */ }}
    >
      <Suspense fallback={null}>
        <EscenaHDRI />
      </Suspense>
    </Canvas>
  </div>
);

export default LabHDRI;