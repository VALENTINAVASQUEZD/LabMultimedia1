import LabGruposColor from "../components/LabGruposColor";

const LabEjercicio4 = () => {
  return (
    <div>
      <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
        <h3>Laboratorio – Ejercicio 4</h3>
        <p style={{ color: "#aaa" }}>
          Dos grupos de objetos con movimientos distintos. Haz clic sobre cada
          grupo para cambiar el color de todos sus elementos.
        </p>
      </div>

      <LabGruposColor />
    </div>
  );
};

export default LabEjercicio4;