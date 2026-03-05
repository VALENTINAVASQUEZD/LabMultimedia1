import LabCubeTexturas from "../components/LabCubeTexturas";

const LabEjercicio1 = () => {
  return (
    <div>
      <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
        <h3>Laboratorio – Ejercicio 1</h3>
        <p style={{ color: "#aaa" }}>
          Objeto 3D con textura, iluminación ambiental y direccional. Haz clic
          sobre el cubo para alternar entre dos texturas.
        </p>
      </div>

      <LabCubeTexturas />
    </div>
  );
};

export default LabEjercicio1;