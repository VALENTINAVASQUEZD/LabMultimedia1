// src/app/router.jsx
import React from "react";
import Inicio from "./pages/Inicio";
import Ejercicio2 from "./pages/Ejercicio2";
import Ejercicio3 from "./pages/Ejercicio3";
import Ejercicio4 from "./pages/Ejercicio4";
import Ejercicio5 from "./pages/Ejercicio5";
import Luces from "./pages/Luces";
import LabEjercicio1 from "./pages/LabEjercicio1";

const routes = [
  { path: "/", element: <Inicio />, index: true },
  // Practicas 1
  { path: "ejercicio2", element: <Ejercicio2 /> },
  { path: "ejercicio3", element: <Ejercicio3 /> },
  { path: "ejercicio4", element: <Ejercicio4 /> },
  { path: "ejercicio5", element: <Ejercicio5 /> },
  { path: "luces", element: <Luces />},
  // Laboratorio
  { path: "lab/ejercicio1", element: <LabEjercicio1 /> },

];

export default routes;