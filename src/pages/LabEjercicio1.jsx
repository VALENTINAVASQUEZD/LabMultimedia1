import LabCubeTexturas from "../components/LabCubeTexturas";

const LabEjercicio1 = () => {
  return (
    <div>
      <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
        <h3>Laboratorio – Ejercicio 1</h3>
        <p style={{ color: "#aaa" }}>
           Haz clic sobre el cubo para cambbiar de texturas texturas.
        </p>
      </div>

      <LabCubeTexturas />
    </div>
  );
};

export default LabEjercicio1;