import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const PALETA = [
  "#e74c3c", "#e67e22", "#f1c40f",
  "#2ecc71", "#1abc9c", "#3498db",
  "#9b59b6", "#e91e63", "#00bcd4",
];

//rotacion eje y
const GrupoRotacion = ({ color, onClick }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 1.0;
  });

  return (
    <group
      ref={ref}
      position={[-3.5, 0, 0]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[1.6, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-1.6, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

//oscilacion de esferas
const GrupoFlotante = ({ color, onClick }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((hijo, i) => {
      hijo.position.y = Math.sin(t * 1.8 + i * 1.2) * 0.7;
    });
  });

  return (
    <group
      ref={ref}
      position={[3.5, 0, 0]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[1.6, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-1.6, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};


const LabGruposColor = () => {
  const [idxG1, setIdxG1] = useState(0);
  const [idxG2, setIdxG2] = useState(3);

  const siguienteColor = (idx, setIdx) => {
    setIdx((prev) => (prev + 1) % PALETA.length);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        shadows
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 3, 10], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />

        <GrupoRotacion
          color={PALETA[idxG1]}
          onClick={() => siguienteColor(idxG1, setIdxG1)}
        />

        <GrupoFlotante
          color={PALETA[idxG2]}
          onClick={() => siguienteColor(idxG2, setIdxG2)}
        />

        {/* Plano base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

export default LabGruposColor;