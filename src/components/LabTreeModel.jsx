import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

/**
 * TreeModel
 * - Carga tree.glb desde /public
 * - Recorre las mallas del modelo e identifica una específica para el clic
 * - Al hacer clic en esa malla, activa/desactiva una segunda luz
 */
function TreeModel({ onMeshClick }) {
  const { scene } = useGLTF("/models/Tree.glb");
  const meshNames = [];

  // Recorre todas las mallas y registra sus nombres en consola
  // para que puedas identificar cuál quieres usar
  scene.traverse((child) => {
    if (child.isMesh) {
      meshNames.push(child.name);
    }
  });
  console.log("🌳 Mallas del modelo:", meshNames);

  // Manejador de clic: propaga el nombre de la malla clicada
  const handleClick = (e) => {
    e.stopPropagation();
    console.log("🖱️ Clic en malla:", e.object.name);
    onMeshClick(e.object.name);
  };

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -1, 0]}
      onClick={handleClick}
    />
  );
}

/**
 * Scene
 * Maneja el estado de iluminación y renderiza el Canvas completo
 */
function Scene() {
  // false = solo luz tenue inicial | true = segunda luz activada
  const [extraLight, setExtraLight] = useState(false);
  const [clickedMesh, setClickedMesh] = useState(null);

  // Nombre de la malla que activa la luz (ajusta según lo que imprima la consola)
  // Si no sabes el nombre exacto, al dejar TARGET_MESH = null se activa con CUALQUIER clic
  const TARGET_MESH = null; // Ej: "Trunk_0" o "Leaves_1"

  const handleMeshClick = (meshName) => {
    // Si TARGET_MESH tiene un valor, solo reacciona a esa malla específica
    if (TARGET_MESH === null || meshName === TARGET_MESH) {
      setExtraLight((prev) => !prev);
      setClickedMesh(meshName);
    }
  };

  return (
    <>
      {/* ── ILUMINACIÓN BASE (siempre presente, tenue) ── */}
      <ambientLight intensity={0.3} color="#fffae0" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* ── LUZ EXTRA (se activa al hacer clic en la malla) ── */}
      {extraLight && (
        <>
          {/* Punto de luz cálido que "envuelve" el árbol */}
          <pointLight
            position={[0, 3, 2]}
            intensity={4}
            color="#ffaa44"
            distance={15}
            decay={2}
          />
          {/* Luz de relleno azulada desde atrás */}
          <pointLight
            position={[-3, 2, -3]}
            intensity={2}
            color="#4488ff"
            distance={10}
            decay={2}
          />
        </>
      )}

      {/* ── MODELO ── */}
      <Suspense fallback={null}>
        <TreeModel onMeshClick={handleMeshClick} />
      </Suspense>

      {/* ── SUELO ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2d4a1e" roughness={0.9} />
      </mesh>

      <OrbitControls enableDamping dampingFactor={0.05} />
    </>
  );
}

/**
 * LabTreeModel – componente principal exportado
 * Renderiza el Canvas con la escena completa
 */
const LabTreeModel = () => {
  const [extraLight, setExtraLight] = useState(false);
  const [info, setInfo] = useState("Haz clic sobre cualquier parte del árbol");

  const handleMeshClick = (meshName) => {
    setExtraLight((prev) => {
      const next = !prev;
      setInfo(
        next
          ? `✅ Luz activada – malla: "${meshName}"`
          : `🔅 Luz desactivada – malla: "${meshName}"`
      );
      return next;
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* HUD informativo */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.6)",
          color: extraLight ? "#ffaa44" : "#aaaaaa",
          padding: "8px 20px",
          borderRadius: 8,
          zIndex: 10,
          fontFamily: "monospace",
          fontSize: 14,
          pointerEvents: "none",
          transition: "color 0.4s",
        }}
      >
        {info}
      </div>

      <Canvas
        shadows
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [4, 3, 6], fov: 45 }}
      >
        {/* ── ILUMINACIÓN BASE ── */}
        <ambientLight intensity={0.3} color="#fffae0" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* ── LUZ EXTRA (toggle) ── */}
        {extraLight && (
          <>
            <pointLight position={[0, 3, 2]} intensity={4} color="#ffaa44" distance={15} decay={2} />
            <pointLight position={[-3, 2, -3]} intensity={2} color="#4488ff" distance={10} decay={2} />
          </>
        )}

        {/* ── MODELO ── */}
        <Suspense fallback={null}>
          <TreeModel onMeshClick={handleMeshClick} />
        </Suspense>

        {/* ── SUELO ── */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#2d4a1e" roughness={0.9} />
        </mesh>

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

export default LabTreeModel;