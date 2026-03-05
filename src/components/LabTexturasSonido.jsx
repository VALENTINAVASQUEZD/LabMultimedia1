import { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";

// --------------------------------------------------
// Sprite de nota musical: sube y se desvanece
// --------------------------------------------------
const NotaMusical = ({ id, position, texturaUrl, onFin }) => {
  const ref = useRef();
  const inicio = useRef(Date.now());
  const textura = useLoader(TextureLoader, texturaUrl);
  const DURACION = 1.8;

  useFrame(() => {
    if (!ref.current) return;
    const t = (Date.now() - inicio.current) / 1000;

    ref.current.position.y = position[1] + t * 1.6;
    ref.current.position.x = position[0] + Math.sin(t * 3) * 0.15;
    ref.current.material.opacity = Math.max(0, 1 - t / DURACION);

    if (t >= DURACION) onFin(id);
  });

  return (
    <sprite ref={ref} position={[...position]} scale={[0.45, 0.45, 0.45]}>
      <spriteMaterial
        map={textura}
        transparent
        opacity={1}
        depthWrite={false}
      />
    </sprite>
  );
};

// --------------------------------------------------
// ESFERA con texturas (antes era cubo)
// --------------------------------------------------
const SphereMusical = ({ onClick }) => {
  const mapTex = useLoader(TextureLoader, "/assets/texture1.jpg");
  const alphaTex = useLoader(TextureLoader, "/assets/alpha.png");
  const emissiveTex = useLoader(TextureLoader, "/assets/texture2.jpg");
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      castShadow
    >
      {/* 🔥 CAMBIO AQUÍ: esfera en vez de cubo */}
      <sphereGeometry args={[1.4, 64, 64]} />

      <meshStandardMaterial
        map={mapTex}
        alphaMap={alphaTex}
        transparent
        alphaTest={0.05}
        side={DoubleSide}
        emissiveMap={emissiveTex}
        emissive="#ffffff"
        emissiveIntensity={0.6}
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
};

// --------------------------------------------------
// Escena completa
// --------------------------------------------------
const NOTAS_URLS = [
  "/assets/note1.png",
  "/assets/note2.png",
  "/assets/note3.png",
];

let _id = 0;

const LabTexturasSonido = () => {
  const [notas, setNotas] = useState([]);

  const handleClic = () => {
    const audio = new Audio("/sounds/hit.mp3");
    audio.volume = 0.7;
    audio.play().catch(() => {});

    const nuevas = Array.from({ length: 5 }, () => ({
      id: ++_id,
      position: [
        (Math.random() - 0.5) * 2.4,
        0.8 + Math.random() * 0.6,
        (Math.random() - 0.5) * 2.4,
      ],
      texturaUrl:
        NOTAS_URLS[Math.floor(Math.random() * NOTAS_URLS.length)],
    }));

    setNotas((prev) => [...prev, ...nuevas]);
  };

  const eliminarNota = (id) => {
    setNotas((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#ffffff",
      }}
    >
      {/* HUD */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.05)",
          padding: "10px 20px",
          borderRadius: "20px",
          color: "#333",
          fontSize: "14px",
          fontFamily: "sans-serif",
          pointerEvents: "none",
        }}
      >
        🎵 Haz clic en la esfera para generar notas
      </div>

      <Canvas shadows camera={{ position: [0, 2, 6], fov: 50 }}>
        {/* Fondo blanco */}
        <color attach="background" args={["#ffffff"]} />

        {/* Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1}
          castShadow
        />
        <pointLight
          position={[-3, 3, -3]}
          intensity={0.6}
          color="#8888ff"
        />

        {/* Esfera */}
        <SphereMusical onClick={handleClic} />

        {/* Notas */}
        {notas.map((nota) => (
          <NotaMusical
            key={nota.id}
            id={nota.id}
            position={nota.position}
            texturaUrl={nota.texturaUrl}
            onFin={eliminarNota}
          />
        ))}

        {/* Plano base */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f2f2f2" />
        </mesh>

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

export default LabTexturasSonido;