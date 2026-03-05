import LabTreeModel from "../components/LabTreeModel";

const LabEjercicio2 = () => {
  return (
    <div>
      {/* Encabezado informativo */}
      <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
        <h3>Laboratorio – Ejercicio 2</h3>
        <p style={{ color: "#aaa" }}>
          Modelo 3D cusando <code>Tree.glb</code>.
          Haz clic sobre el arbol para activar una luz.
        </p>
      </div>

      {/* Canvas de Three.js – ocupa el resto de la pantalla */}
      <div style={{ height: "80vh" }}>
        <LabTreeModel />
      </div>
    </div>
  );
};

export default LabEjercicio2;