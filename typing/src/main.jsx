import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Butt from "./Butt.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Butt />
  </StrictMode>
);
