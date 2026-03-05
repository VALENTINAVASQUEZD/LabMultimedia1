import { Suspense } from "react";
import LabTexturasSonido from "../components/LabTexturasSonido";

const LabEjercicio3 = () => {
  return (
    <div>
      <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
        <h3>Laboratorio – Ejercicio 3</h3>
        <p style={{ color: "#aaa" }}>
          Haz clic sobre la esfera para generar sonido.
        </p>
      </div>

      <div style={{ height: "80vh" }}>
        <Suspense fallback={<p style={{ color: "#aaa", padding: "1rem" }}>Cargando escena…</p>}>
          <LabTexturasSonido />
        </Suspense>
      </div>
    </div>
  );
};

export default LabEjercicio3;